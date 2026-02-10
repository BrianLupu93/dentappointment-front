import { useApiContext } from "../apiContext";

export function useApi() {
  const { state, dispatch } = useApiContext();

  const fetchApi = async <T = any>(url: string, key: string) => {
    dispatch({ type: "API_START", key });
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error("Network error");
      const data: T = await res.json();
      dispatch({ type: "API_SUCCESS", key, payload: data });
      return data;
    } catch (err: any) {
      dispatch({
        type: "API_ERROR",
        key,
        payload: err.message || "Unknown error",
      });
      throw err;
    }
  };

  return { state, fetchApi };
}
