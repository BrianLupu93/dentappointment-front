import type { AppointmentAction } from "./appointmentActions";
import { initialState } from "./appointmentContext";
import type { AppointmentState } from "./appointmentTypes";

export function appointmentReducer(
  state: AppointmentState,
  action: AppointmentAction,
): AppointmentState {
  switch (action.type) {
    case "SET_SELECTED_DAY":
      return { ...state, selectedDay: action.payload };

    case "SET_SERVICES":
      return { ...state, services: action.payload };

    case "SET_SELECTED_SERVICE":
      return { ...state, selectedService: action.payload };

    case "SET_SELECTED_START_TIME":
      return { ...state, selectedStartTime: action.payload };

    case "SET_CALENDAR_AVAILABILITY":
      return { ...state, calendarAvailability: action.payload };

    case "SET_SERVICE_AVAILABILITY":
      return { ...state, availableSlots: action.payload };

    case "RESET_APPOINTMENT_STATE":
      return {
        ...state,
        selectedDay: initialState.selectedDay,
        selectedService: initialState.selectedService,
        selectedStartTime: initialState.selectedStartTime,
        availableSlots: initialState.availableSlots,
      };

    default:
      return state;
  }
}
