import type { Appointment } from "./dashboardTypes";

export type DashboardAction =
  | { type: "SET_SELECTED_DAY"; payload: string }
  | { type: "SET_APPOINTMENTS"; payload: Appointment[] };
