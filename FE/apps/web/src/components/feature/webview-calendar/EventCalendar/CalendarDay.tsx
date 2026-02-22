import classNames from "classnames";
import { SimpleCalendarDto } from "@/apis/dtos/calendar.dto";

interface CalendarDayProps {
  date: Date;
  events: SimpleCalendarDto[];
  isOtherMonth: boolean;
  isToday: boolean;
  dayIndex: number;
  onDateClick: (date: Date) => void;
}

export function CalendarDay({
  date,
  events,
  isOtherMonth,
  isToday,
  dayIndex,
  onDateClick,
}: CalendarDayProps) {
  return (
    <div
      className={classNames(
        "cursor-pointer border-b border-r border-gray-200 p-2 transition-colors",
        {
          "border-r-0": dayIndex % 7 === 6,
          "bg-gray-100 hover:bg-gray-200": isOtherMonth,
          "hover:bg-gray-50": !isOtherMonth,
        },
      )}
      onClick={() => onDateClick(date)}
    >
      <div
        className={classNames("mb-1 text-sm", {
          "text-gray-400": isOtherMonth,
          "flex h-6 w-6 items-center justify-center rounded-full bg-primary font-medium":
            isToday,
          "text-red-500  opacity-70":
            !isOtherMonth && !isToday && dayIndex % 7 === 0,
          "text-blue-500  opacity-70":
            !isOtherMonth && !isToday && dayIndex % 7 === 6,
          "text-gray-900  opacity-70":
            !isOtherMonth &&
            !isToday &&
            dayIndex % 7 !== 0 &&
            dayIndex % 7 !== 6,
        })}
      >
        {date.getDate()}
      </div>

      <div className="mt-1 flex max-h-12 flex-wrap gap-1 overflow-hidden">
        {events.map((event) => (
          <div
            key={event.calendarId}
            className={classNames(
              "h-1.5 w-1.5 rounded-full",
              event.type === "event"
                ? "bg-blue-500"
                : event.type === "presentation"
                ? "bg-red-500"
                : "bg-teal-500",
            )}
            title={`${event.title} (${
              event.type === "event"
                ? "행사"
                : event.type === "presentation"
                ? "주간발표"
                : "기타"
            })`}
          />
        ))}
      </div>
    </div>
  );
}
