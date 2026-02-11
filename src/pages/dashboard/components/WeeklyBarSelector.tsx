import { useState, useEffect } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import {
  changeWeek,
  cn,
  formatDate,
  getMonday,
  isSameCalendarDay,
  isToday,
} from "@/lib/utils";

type WeeklyBarSelectorProps = {
  selectedDate: Date | null;
  onSelect: (dateObj: Date, formatted: string) => void;
};

export function WeeklyBarSelector({
  selectedDate,
  onSelect,
}: WeeklyBarSelectorProps) {
  const [weekStart, setWeekStart] = useState<Date>(() =>
    getMonday(selectedDate || new Date()),
  );
  const [weekDays, setWeekDays] = useState<Date[]>([]);

  // Generate weekdays depending of weekStart
  useEffect(() => {
    const days: Date[] = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date(weekStart);
      d.setDate(weekStart.getDate() + i);
      days.push(d);
    }
    setWeekDays(days);
  }, [weekStart]);

  const monthName = weekStart.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  return (
    <>
      <div className='text-center font-semibold text-lg'>{monthName}</div>
      <div className='w-full flex items-center gap-2 py-4 justify-center'>
        <button onClick={() => changeWeek(weekStart, setWeekStart, "prev")}>
          <IoIosArrowBack size={20} />
        </button>

        <div className='flex overflow-x-auto scrollbar-thin-nice '>
          <div className='flex gap-2 py-2 min-w-max'>
            {weekDays.map((day) => {
              const isSelected = isSameCalendarDay(day, selectedDate);

              return (
                <button
                  key={day.toISOString()}
                  onClick={() => onSelect(day, formatDate(day))}
                  className={cn(
                    "flex flex-col items-center justify-center px-4 py-2 rounded-md border transition",
                    "hover:bg-muted",
                    isSelected &&
                      "bg-primary text-primary-foreground border-primary",
                    !isSelected && isToday(day) && "bg-muted border-muted",
                    !isSelected &&
                      !isToday(day) &&
                      "bg-background border-muted",
                  )}
                >
                  <span className='text-sm font-medium'>
                    {day.toLocaleDateString("en-US", { weekday: "short" })}
                  </span>
                  <span className='text-lg font-semibold'>{day.getDate()}</span>
                </button>
              );
            })}
          </div>
        </div>

        <button onClick={() => changeWeek(weekStart, setWeekStart, "next")}>
          <IoIosArrowForward size={20} />
        </button>
      </div>
    </>
  );
}
