import type { AppointmentState } from "./appointmentTypes";
import type { AppointmentActions } from "./appointmentTypes";

export const initialState: AppointmentState = {
  personalInfo: { name: "", email: "", phone: "" },
  service: null,
  date: null,
  startTime: null,
};

export function appointmentReducer(
  state: AppointmentState,
  action: AppointmentActions,
): AppointmentState {
  switch (action.type) {
    case "SET_PERSONAL_INFO":
      return {
        ...state,
        personalInfo: { ...state.personalInfo, ...action.payload },
      };

    case "SET_SERVICE":
      return {
        ...state,
        service: action.payload,
      };

    case "SET_DATE":
      return { ...state, date: action.payload };

    case "SET_START_TIME":
      return { ...state, startTime: action.payload };

    case "RESET_APPOINTMENT":
      return initialState;

    default:
      return state;
  }
}
