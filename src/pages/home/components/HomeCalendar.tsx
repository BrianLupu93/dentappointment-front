import { Calendar } from "@/components/ui/calendar";

import { useAppointment } from "../context/appointmentContext";
import { formatDay } from "@/lib/utils";
import { useEffect } from "react";
import { apiHandler } from "@/context/api/apiHandler";
import { routes } from "@/context/api/routes";

const HomeCalendar = () => {
  const { state, dispatch } = useAppointment();

  useEffect(() => {
    fetchCalendarAvailability(state.selectedDay);
  }, []);

  async function fetchCalendarAvailability(startDate: string) {
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
  }

  const handleSelectDay = (day: Date) => {
    const formatted = formatDay(day); //
    dispatch({ type: "SET_SELECTED_DAY", payload: formatted });
  };

  const disabledDates = state.calendarAvailability
    .filter((day) => day.full)
    .map((day) => {
      const [d, m, y] = day.date.split("-");
      return new Date(Number(y), Number(m) - 1, Number(d));
    });

  return (
    <Calendar
      className='w-full rounded-md'
      mode='single'
      required
      defaultMonth={state.currentDate}
      selected={state.currentDate}
      onSelect={handleSelectDay}
      disabled={disabledDates}
      modifiersClassNames={{
        booked: "[&>button]:line-through opacity-100",
      }}
      onMonthChange={(value) => fetchCalendarAvailability(formatDay(value))}
    />
  );
};

export default HomeCalendar;
