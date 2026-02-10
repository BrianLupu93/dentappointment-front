import type { Service, StartTime, AvailableCalendarDay } from "./types";

export type AppointmentAction =
  | { type: "SET_SELECTED_DAY"; payload: string }
  | { type: "SET_SELECTED_SERVICE"; payload: Service }
  | { type: "SET_SERVICES"; payload: any[] }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ERROR"; payload?: string }
  | { type: "SET_SELECTED_START_TIME"; payload: StartTime }
  | { type: "SET_CALENDAR_AVAILABILITY"; payload: AvailableCalendarDay[] }
  | { type: "SET_SERVICE_AVAILABILITY"; payload: StartTime[] }
  | { type: "RESET_APPOINTMENT_STATE" };
