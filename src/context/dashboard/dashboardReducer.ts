import type { DashboardAction } from "./dashboardAction";
import type { DashboardState } from "./dashboardTypes";

export function dashboardReducer(
  state: DashboardState,
  action: DashboardAction,
): DashboardState {
  switch (action.type) {
    case "SET_SELECTED_DAY":
      return { ...state, selectedDay: action.payload };

    default:
      return state;
  }
}
