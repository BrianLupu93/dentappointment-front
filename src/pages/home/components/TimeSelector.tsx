import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useEffect } from "react";
import { useAppointment } from "../context/appointmentContext";
import type { StartTime } from "../context/types";
import { apiHandler } from "@/context/api/apiHandler";
import { routes } from "@/context/api/routes";

const TimeSelector = () => {
  const { state, dispatch } = useAppointment();

  // If we already have a selected day and a selected service, we can do the api call
  // and display all the available Slots for the selected preferences
  useEffect(() => {
    if (state.selectedService && state.selectedDay) {
      fetchDayAvailability(state.selectedDay, state.selectedService._id);
    }
  }, [state.selectedService, state.selectedDay]);

  // Fetch the day availability (Slots) for a certain day and service
  async function fetchDayAvailability(startDate: string, serviceId: string) {
    try {
      await apiHandler(
        `${routes.availability}/day`,
        dispatch,
        (data) => ({ type: "SET_SERVICE_AVAILABILITY", payload: data }),
        { method: "GET", params: { date: startDate, serviceId: serviceId } },
      );
    } catch (err) {
      console.error(err);
    }
  }
  // Handler to manage the selected service
  const handleSelectTime = (startTime: StartTime) => {
    dispatch({ type: "SET_SELECTED_START_TIME", payload: startTime });
  };

  if (state.availableSlots.length)
    return (
      <ToggleGroup
        type='single'
        size='sm'
        variant='outline'
        spacing={2}
        className='flex flex-wrap'
        value={state.selectedStartTime ?? ""}
        onValueChange={(value) => handleSelectTime(value)}
      >
        {state.availableSlots.map((slot) => {
          return (
            <ToggleGroupItem value={slot} aria-label='' key={slot}>
              {slot}
            </ToggleGroupItem>
          );
        })}
      </ToggleGroup>
    );

  if (state.selectedService)
    return (
      <div className='text-blue-600 text-left'>
        Sorry! The selected service is not available for the selected day.
        Please choose another day!
      </div>
    );
  return (
    <div className='text-blue-600 text-left'>
      Please select a service to get the available time
    </div>
  );
};

export default TimeSelector;
