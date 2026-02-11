type Method = "GET" | "POST" | "PUT" | "DELETE";

export interface ApiOptions extends RequestInit {
  method?: Method;
  body?: any;
  params?: Record<string, string | number>;
}

import { refreshAccessToken } from "../auth/authContext";

export async function apiHandler<T>(
  url: string,
  dispatch: React.Dispatch<any>,
  onSuccessAction: (data: T) => any,
  options: ApiOptions = {},
): Promise<T> {
  dispatch({ type: "SET_LOADING", payload: true });
  dispatch({ type: "SET_ERROR", payload: undefined });

  try {
    // Add query params optional
    if (options.params) {
      const queryString = new URLSearchParams(
        Object.entries(options.params).map(([k, v]) => [k, String(v)]),
      ).toString();
      url += `?${queryString}`;
    }

    const fetchHeaders = new Headers();
    fetchHeaders.set("Content-Type", "application/json");

    // Attach access token
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      fetchHeaders.set("Authorization", `Bearer ${accessToken}`);
    }

    const fetchOptions: RequestInit = {
      method: options.method || "GET",
      headers: fetchHeaders,
      body: options.body ? JSON.stringify(options.body) : undefined,
    };

    let res = await fetch(url, fetchOptions);

    // If token expired then try refresh
    if (res.status === 401) {
      const newToken = await refreshAccessToken();

      if (!newToken) {
        throw new Error("Session expired");
      }

      // Retry original request with new token
      fetchHeaders.set("Authorization", `Bearer ${newToken}`);
      res = await fetch(url, fetchOptions);
    }

    if (!res.ok) throw new Error("Server error");

    const data: T = await res.json();
    dispatch(onSuccessAction(data));
    return data;
  } catch (err: any) {
    console.error(err.message);
    throw err;
  }
}
