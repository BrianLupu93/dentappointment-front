import type { DashboardAction } from "./dashboardAction";
import type { DashboardState } from "./dashboardTypes";

export function dashboardReducer(
  state: DashboardState,
  action: DashboardAction,
): DashboardState {
  switch (action.type) {
    case "SET_SELECTED_DAY":
      return { ...state, selectedDay: action.payload };
    case "SET_CURRENT_DATE":
      return { ...state, currentDate: action.payload };
    case "SET_APPOINTMENTS":
      return { ...state, appointments: action.payload };
    case "RELOAD_APPOINTMENTS":
      return { ...state, appointments: action.payload };

    default:
      return state;
  }
}
