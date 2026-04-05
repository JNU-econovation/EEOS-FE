import classNames from "classnames";
import { SimpleCalendarDto } from "@/apis/dtos/calendar.dto";

interface CalendarDayProps {
  date: Date;
  events: SimpleCalendarDto[];
  isOtherMonth: boolean;
  isToday: boolean;
  dayIndex: number;
  onDateClick: (date: Date) => void;
  onEventClick: (event: SimpleCalendarDto, e: React.MouseEvent) => void;
}

export function CalendarDay({
  date,
  events,
  isOtherMonth,
  isToday,
  dayIndex,
  onDateClick,
  onEventClick,
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

      <div className="space-y-1">
        {events.slice(0, 3).map((event) => (
          <div
            key={event.calendarId}
            className={classNames(
              "cursor-pointer truncate rounded p-1 text-xs text-white hover:opacity-80",
              event.type === "event"
                ? "bg-blue-500  opacity-70"
                : event.type === "presentation"
                ? "bg-red-500  opacity-70"
                : "bg-teal-500  opacity-70",
            )}
            onClick={(e) => onEventClick(event, e)}
            title={`${event.title} (${
              event.type === "event"
                ? "행사"
                : event.type === "presentation"
                ? "주간발표"
                : "기타"
            })`}
          >
            {event.title}
          </div>
        ))}
        {events.length > 3 && (
          <div className="text-xs text-gray-500">+{events.length - 3}개 더</div>
        )}
      </div>
    </div>
  );
}
