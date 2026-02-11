import { apiHandler } from "@/context/api/apiHandler";
import { routes } from "@/context/api/routes";
import type { AppointmentAction } from "@/context/appointment/appointmentActions";
import type { Appointment } from "@/context/appointment/appointmentTypes";
import { showToast } from "@/lib/utils";

type Dispatch = React.Dispatch<AppointmentAction>;

//  ------------------------- POST APPOINTMENT ---------------
export async function postAppointment(
  data: Appointment,
  formRef: React.RefObject<HTMLFormElement | null>,
  dispatch: Dispatch,
) {
  try {
    await apiHandler(
      `${routes.appointment}`,
      dispatch,
      () => ({ type: "RESET_APPOINTMENT_STATE" }),
      { method: "POST", body: data },
    );
    formRef.current?.reset();
    showToast("Appointment booked successfully!", "success");
  } catch (err) {
    showToast("Something went wrong! Please try again.", "error");
    console.error(err);
  }
}

//  ------------------------- GET CALENDAR AVAILABILITY ---------------
export async function fetchCalendarAvailability(
  startDate: string,
  dispatch: Dispatch,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
) {
  setLoading(true);
  try {
    await apiHandler(
      `${routes.availability}/month`,
      dispatch,
      (data) => ({ type: "SET_CALENDAR_AVAILABILITY", payload: data }),
      { method: "GET", params: { startDate: startDate } },
    );
  } catch (err) {
    console.error(err);
  }
  setLoading(false);
}
