import type { ServiceAction } from "@/context/service/serviceAction";
import type {
  ServiceAdmin,
  ServiceClient,
  ServiceState,
} from "@/context/service/serviceTypes";
import { apiHandler } from "@/context/api/apiHandler";
import { routes } from "@/context/api/routes";
import { showToast } from "@/lib/utils";

type Dispatch = React.Dispatch<ServiceAction>;

// ---------------- DELETE SERVICE -----------------------
export async function deleteService(id: string, dispatch: Dispatch) {
  try {
    await apiHandler<ServiceClient[]>(
      `${routes.services}/${id}`,
      dispatch,
      () => ({}),
      {
        method: "DELETE",
      },
    );
    showToast("Service deleted!!", "success");
    fetchServices(dispatch);
  } catch (err) {
    showToast("Something went wrong! Please try again.", "error");
    console.error(err);
  }
}

// ---------------- UPDATE SERVICE -----------------------
export async function updateService(
  data: { id: string; name: string; duration: number; active: boolean },
  dispatch: Dispatch,
) {
  try {
    await apiHandler(`${routes.services}/${data.id}`, dispatch, () => ({}), {
      method: "PUT",
      body: {
        name: data.name,
        duration: data.duration,
        active: data.active,
      },
    });

    showToast("Service updated!", "success");
    fetchServices(dispatch);
  } catch (err) {
    showToast("Something went wrong! Please try again.", "error");
    console.error(err);
  }
}

// ---------------- POST SERVICE -----------------------

export async function postService(
  data: Omit<ServiceAdmin, "_id" | "active">,
  serviceNameRef: React.RefObject<HTMLInputElement | null>,
  serviceDurationRef: React.RefObject<HTMLInputElement | null>,
  dispatch: Dispatch,
) {
  try {
    await apiHandler<ServiceClient[]>(routes.services, dispatch, () => ({}), {
      method: "POST",
      body: data,
    });
    showToast("The new service was added!", "success");
    serviceNameRef.current!.value = "";
    serviceDurationRef.current!.value = "";
    fetchServices(dispatch);
  } catch (err) {
    showToast("Something went wrong! Please try again.", "error");
    console.error(err);
  }
}

// ---------------- GET ALL SERVICES  -----------------------
export async function fetchServices(dispatch: Dispatch) {
  try {
    await apiHandler<ServiceClient[]>(routes.services, dispatch, (data) => ({
      type: "SET_SERVICES",
      payload: data,
    }));
  } catch (err) {
    console.error(err);
  }
}

// ---------------- HANDLER TO CHECK IF A SERVICE WAS UPDATED  -----------------------
export function handleChangeService(
  id: string,
  state: ServiceState,
  nameRef: React.RefObject<HTMLInputElement | null>,
  durationRef: React.RefObject<HTMLInputElement | null>,
  activeRef: React.RefObject<HTMLInputElement | null>,
  setToUpdate: React.Dispatch<
    React.SetStateAction<{
      id: string;
      value: boolean;
    }>
  >,
  dispatch: Dispatch,
) {
  const service = state.services.find((s) => s._id === id);
  if (!service) return;

  const newName = nameRef.current?.value.trim() ?? "";
  const newDuration = Number(durationRef.current?.value);
  const newActive = activeRef.current?.checked ?? false;

  const isSame =
    newName === service.name &&
    newDuration === service.duration &&
    newActive === service.active;

  if (isSame) {
    setToUpdate({ id: "", value: false });
    dispatch({ type: "SET_SELECTED_SERVICE", payload: null });
    return;
  }

  dispatch({
    type: "SET_SELECTED_SERVICE",
    payload: service,
  });

  setToUpdate({ id, value: true });
}
