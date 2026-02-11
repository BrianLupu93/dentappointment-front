import type { Appointment } from "./dashboardTypes";

export type DashboardAction =
  | { type: "SET_SELECTED_DAY"; payload: string }
  | { type: "SET_APPOINTMENTS"; payload: Appointment[] }
  | { type: "SET_CURRENT_DATE"; payload: Date }
  | { type: "RELOAD_APPOINTMENTS"; payload: Appointment[] };
