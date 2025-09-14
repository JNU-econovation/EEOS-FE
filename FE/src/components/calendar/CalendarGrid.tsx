import { CalendarDay } from "./CalendarDay";
import { Calendar } from "@/types/calendar";
import { getEventsForDate, isOtherMonth, isToday } from "@/utils/dateUtils";

interface CalendarGridProps {
  dates: Date[];
  currentDate: Date;
  events: Calendar[];
  onDateClick: (date: Date) => void;
  onEventClick: (event: Calendar, e: React.MouseEvent) => void;
}

export function CalendarGrid({
  dates,
  currentDate,
  events,
  onDateClick,
  onEventClick,
}: CalendarGridProps) {
  return (
    <div
      className="grid flex-1 grid-cols-7"
      style={{
        gridTemplateRows: `repeat(${Math.ceil(dates.length / 7)}, 1fr)`,
      }}
    >
      {dates.map((date, index) => {
        const dayEvents = getEventsForDate(date, events);
        const isOtherMonthDate = isOtherMonth(date, currentDate);
        const isTodayDate = isToday(date);

        return (
          <CalendarDay
            key={date.toISOString()}
            date={date}
            events={dayEvents}
            isOtherMonth={isOtherMonthDate}
            isToday={isTodayDate}
            dayIndex={index}
            onDateClick={onDateClick}
            onEventClick={onEventClick}
          />
        );
      })}
    </div>
  );
}
