type Method = "GET" | "POST" | "PUT" | "DELETE";

export interface ApiOptions extends RequestInit {
  method?: Method;
  body?: any;
  params?: Record<string, string | number>;
}

export async function apiHandler<T>(
  url: string,
  dispatch: React.Dispatch<any>,
  onSuccessAction: (data: T) => any,
  options: ApiOptions = {},
): Promise<T> {
  dispatch({ type: "SET_LOADING", payload: true });
  dispatch({ type: "SET_ERROR", payload: undefined });

  try {
    if (options.params) {
      const queryString = new URLSearchParams(
        Object.entries(options.params).map(([k, v]) => [k, String(v)]),
      ).toString();
      url += `?${queryString}`;
    }
    const fetchHeaders = new Headers();
    fetchHeaders.set("Content-Type", "application/json");

    const fetchOptions: RequestInit = {
      method: options.method || "GET",
      headers: fetchHeaders,
      body: options.body ? JSON.stringify(options.body) : undefined,
    };

    const res = await fetch(url, fetchOptions);
    if (!res.ok) throw new Error("Server error");

    const data: T = await res.json();

    dispatch(onSuccessAction(data));
    return data;
  } catch (err: any) {
    dispatch({ type: "SET_ERROR", payload: err.message });
    throw err;
  } finally {
    dispatch({ type: "SET_LOADING", payload: false });
  }
}
