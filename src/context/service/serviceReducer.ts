import type { ServiceAction } from "./serviceAction";
import type { ServiceState } from "./serviceTypes";

export function serviceReducer(
  state: ServiceState,
  action: ServiceAction,
): ServiceState {
  switch (action.type) {
    case "SET_SELECTED_DAY":
      return { ...state, selectedDay: action.payload };

    case "SET_SERVICES":
      return { ...state, services: action.payload };

    case "SET_SELECTED_SERVICE":
      return { ...state, selectedService: action.payload };

    case "SET_LOADING":
      return { ...state, loading: action.payload };

    case "SET_ERROR":
      return { ...state, error: action.payload };

    default:
      return state;
  }
}
