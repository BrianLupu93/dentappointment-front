import { Calendar } from "@/components/ui/calendar";

import { useAppointment } from "../context/appointmentContext";
import { formatDay } from "@/lib/utils";

const HomeCalendar = () => {
  const { state, dispatch } = useAppointment();

  const handleSelectDay = (day: Date) => {
    const formatted = formatDay(day); //
    dispatch({ type: "SET_SELECTED_DAY", payload: formatted });
  };

  console.log(state.selectedDay);

  return (
    <Calendar
      className='w-full rounded-md'
      mode='single'
      required
      defaultMonth={state.currentDate}
      selected={state.currentDate}
      onSelect={handleSelectDay}
      disabled={{ before: state.currentDate }}
      modifiersClassNames={{
        booked: "[&>button]:line-through opacity-100",
      }}
    />
  );
};

export default HomeCalendar;
