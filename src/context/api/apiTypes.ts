export interface ApiCallState<T = any> {
  loading: boolean;
  error?: string;
  data?: T;
}

export interface ApiState {
  [key: string]: ApiCallState<any>;
}

export type ApiAction =
  | { type: "API_START"; key: string }
  | { type: "API_SUCCESS"; key: string; payload: any }
  | { type: "API_ERROR"; key: string; payload: string };
