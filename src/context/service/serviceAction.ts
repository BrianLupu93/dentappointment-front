import type { ServiceAdmin } from "./serviceTypes";

export type ServiceAction =
  | { type: "SET_SELECTED_DAY"; payload: string }
  | { type: "SET_SELECTED_SERVICE"; payload: ServiceAdmin | null }
  | { type: "SET_SERVICES"; payload: any[] }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ERROR"; payload?: string };
