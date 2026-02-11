import { apiHandler } from "@/context/api/apiHandler";
import { routes } from "@/context/api/routes";
import type { DashboardAction } from "@/context/dashboard/dashboardAction";
import type { Appointment } from "@/context/dashboard/dashboardTypes";
import { showToast } from "@/lib/utils";

type Dispatch = React.Dispatch<DashboardAction>;

//  ------------------------- GET APPOINTMENTS {date} ---------------
export async function getAppointmentsByDate(
  date: string,
  dispatch: Dispatch,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
) {
  setLoading(true);
  try {
    await apiHandler(
      `${routes.appointment}/${date}`,
      dispatch,
      (data) => ({ type: "SET_APPOINTMENTS", payload: data }),
      { method: "GET" },
    );
  } catch (err) {
    console.error(err);
  }
  setLoading(false);
}
//  ------------------------- DELETE APPOINTMENT {id} ---------------
export async function deleteAppointment(
  id: string,
  dispatch: Dispatch,
  appointments: Appointment[],
) {
  const filteredAppointments = appointments?.filter((app) => app._id !== id);
  try {
    await apiHandler(
      `${routes.appointment}/${id}`,
      dispatch,
      () => ({ type: "RELOAD_APPOINTMENTS", payload: filteredAppointments }),
      {
        method: "DELETE",
      },
    );
    showToast("Appointment deleted!!", "success");
  } catch (err) {
    showToast("Something went wrong! Please try again.", "error");
    console.error(err);
  }
}
