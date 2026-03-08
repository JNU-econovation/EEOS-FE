"use client";

import type { SimpleCalendarDto } from "@/apis/dtos/calendar.dto";
import Spacing from "@/components/common/Spacing";
import { calendarDateAtom, selectedDateAtom } from "@/store/calendarAtoms";
import { getEventsForDate } from "@/utils/dateUtils";
import { useAtom } from "jotai";

function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}
function getLastDateOfMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}
function getLastDayOfMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDay();
}
function getLastDateOfPrevMonth(year: number, month: number) {
  return new Date(year, month, 0).getDate();
}

const EVENT_TYPE_DOT_STYLES: Record<SimpleCalendarDto["type"], string> = {
  event: "bg-blue-500 opacity-70",
  presentation: "bg-red-500 opacity-70",
  etc: "bg-teal-500 opacity-70",
} as const;

interface CalendarBodyProps {
  events: SimpleCalendarDto[];
  onDateClick?: (date: Date) => void;
}

const CalendarBody = ({ events, onDateClick }: CalendarBodyProps) => {
  const [selectedDate, setSelectedDate] = useAtom(selectedDateAtom);
  const [calendarDate, setCalendarDate] = useAtom(calendarDateAtom);

  const today = new Date();

  const year = calendarDate.getFullYear();
  const month = calendarDate.getMonth();

  const firstDayOfMonth = getFirstDayOfMonth(year, month);
  const lastDateOfMonth = getLastDateOfMonth(year, month);
  const lastDayOfMonth = getLastDayOfMonth(year, month);
  const lastDateOfPrevMonth = getLastDateOfPrevMonth(year, month);

  return (
    <div>
      {/* day */}
      <div className="grid grid-cols-7 justify-between text-sm font-medium opacity-60">
        <div className="w-full text-center text-red-600">일</div>
        <div className="w-full text-center">월</div>
        <div className="w-full text-center">화</div>
        <div className="w-full text-center">수</div>
        <div className="w-full text-center">목</div>
        <div className="w-full text-center">금</div>
        <div className="w-full text-center text-blue-800">토</div>
      </div>

      {/* body */}
      {/* prev month */}
      <div className="grid grid-cols-7 justify-between text-sm font-medium">
        {Array.from({ length: firstDayOfMonth }).map((_, date) => {
          return (
            <button
              key={`${date}-${month}-${year}`}
              className="w-full text-center opacity-30"
              onClick={() => {
                const newDate = new Date(
                  year,
                  month - 1,
                  lastDateOfPrevMonth - firstDayOfMonth + date + 1,
                );
                setSelectedDate(newDate);
                setCalendarDate(newDate);
              }}
            >
              {lastDateOfPrevMonth - firstDayOfMonth + date + 1}
            </button>
          );
        })}

        {/* this month */}
        {Array.from({ length: lastDateOfMonth }).map((_, date) => {
          const currentDate = new Date(year, month, date + 1);
          const dayEvents = getEventsForDate(currentDate, events);
          const uniqueTypes = [
            ...new Set(dayEvents.map((e) => e.type)),
          ] as SimpleCalendarDto["type"][];

          return (
            <button
              key={`${date}-${month}-${year}`}
              className={`flex w-full flex-col items-center justify-center p-2.5`}
              onClick={() => {
                setSelectedDate(currentDate);
                onDateClick?.(currentDate);
              }}
            >
              <div
                className={`flex h-full w-full items-center justify-center rounded-xl p-1.5 ${
                  date + 1 === selectedDate.getDate() &&
                  year === selectedDate.getFullYear() &&
                  month === selectedDate.getMonth()
                    ? "bg-black text-white"
                    : ""
                } ${
                  date + 1 === today.getDate() &&
                  year === today.getFullYear() &&
                  month === today.getMonth()
                    ? "bg-[#DFE1E5]"
                    : ""
                }`}
              >
                {date + 1}
              </div>
              <Spacing size={0.25} direction="vertical" />
              {/* event */}
              {uniqueTypes.length > 0 && (
                <div className="flex h-1 items-center justify-around gap-1">
                  {uniqueTypes.map((type) => (
                    <div
                      key={type}
                      className={`h-1 w-1 rounded-full ${EVENT_TYPE_DOT_STYLES[type]}`}
                    />
                  ))}
                </div>
              )}
            </button>
          );
        })}

        {/* next month */}
        {Array.from({ length: 6 - lastDayOfMonth }).map((_, date) => {
          return (
            <button
              key={`${date}-${month + 1}-${year}`}
              className="w-full text-center opacity-30"
              onClick={() => {
                const newDate = new Date(year, month + 1, date + 1);
                setSelectedDate(newDate);
                setCalendarDate(newDate);
              }}
            >
              {date + 1}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CalendarBody;
