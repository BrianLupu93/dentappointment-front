import { apiHandler } from "@/context/api/apiHandler";
import { routes } from "@/context/api/routes";
import type { AppointmentAction } from "@/context/appointment/appointmentActions";
import type { Appointment } from "@/context/appointment/types";
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
