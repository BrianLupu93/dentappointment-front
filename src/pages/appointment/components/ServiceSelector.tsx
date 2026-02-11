import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useEffect } from "react";
import { routes } from "@/context/api/routes";
import { apiHandler } from "@/context/api/apiHandler";
import { useAppointment } from "@/context/appointment/appointmentContext";
import type { Service } from "@/context/appointment/types";

const ServiceSelector = () => {
  const { state, dispatch } = useAppointment();

  // On mount call the fetchServices to get all the available services
  useEffect(() => {
    fetchServices();
  }, []);

  // Fetch service function, get all available service from de DB
  async function fetchServices() {
    try {
      await apiHandler<Service[]>(routes.services, dispatch, (data) => ({
        type: "SET_SERVICES",
        payload: data,
      }));
    } catch (err) {
      console.error(err);
    }
  }
  // Handler to manage the selected service
  const handleSelectService = (id: string) => {
    const selectedService = state.services.find((s) => s._id === id);
    if (selectedService) {
      dispatch({ type: "SET_SELECTED_SERVICE", payload: selectedService });
    }
  };

  return (
    <ToggleGroup
      type='single'
      size='sm'
      variant='outline'
      spacing={2}
      className='flex flex-wrap'
      value={state.selectedService?._id ?? ""}
      onValueChange={(value) => handleSelectService(value)}
    >
      {state.services
        ?.filter((service) => service.active)
        .map((service) => (
          <ToggleGroupItem
            key={`service-${service._id}`}
            value={service._id}
            aria-label={service.name}
          >
            {" "}
            {service.name}{" "}
          </ToggleGroupItem>
        ))}
    </ToggleGroup>
  );
};

export default ServiceSelector;
