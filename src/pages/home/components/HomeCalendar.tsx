import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";

const HomeCalendar = () => {
  const [date, setDate] = useState<Date>(new Date());

  console.log(date);
  return (
    <Calendar
      className='w-full rounded-md'
      mode='single'
      required
      defaultMonth={date}
      selected={date}
      onSelect={setDate}
      //   disabled={bookedDates}
      //   modifiers={{
      //     booked: bookedDates,
      //   }}
      modifiersClassNames={{
        booked: "[&>button]:line-through opacity-100",
      }}
    />
  );
};

export default HomeCalendar;
