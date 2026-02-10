import type { AppointmentAction } from "./appointmentActions";
import type { AppointmentState } from "./types";

export function appointmentReducer(
  state: AppointmentState,
  action: AppointmentAction,
): AppointmentState {
  switch (action.type) {
    case "SET_SELECTED_DAY":
      return {
        ...state,
        selectedDay: action.payload,
      };

    default:
      return state;
  }
}
