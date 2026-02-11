import { Calendar } from "@/components/ui/calendar";

import { useAppointment } from "../context/appointmentContext";
import { formatDay } from "@/lib/utils";
import { useEffect, useState } from "react";
import { apiHandler } from "@/context/api/apiHandler";
import { routes } from "@/context/api/routes";

const HomeCalendar = () => {
  const { state, dispatch } = useAppointment();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCalendarAvailability(state.selectedDay);
  }, []);

  async function fetchCalendarAvailability(startDate: string) {
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
      className={`w-full rounded-md ${loading ? "pointer-events-none opacity-50" : ""}`}
      mode='single'
      required
      defaultMonth={state.currentDate}
      selected={state.currentDate}
      onSelect={handleSelectDay}
      disabled={disabledDates}
      modifiersClassNames={{
        booked: "[&>button]:line-through opacity-100",
      }}
      onMonthChange={(value) => {
        return fetchCalendarAvailability(formatDay(value));
      }}
    />
  );
};

export default HomeCalendar;
