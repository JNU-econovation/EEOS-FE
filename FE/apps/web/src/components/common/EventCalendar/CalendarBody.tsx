"use client";

import type { SimpleCalendarDto } from "@/apis/dtos/calendar.dto";
import Spacing from "@/components/common/Spacing";
import { calendarDateAtom, selectedDateAtom } from "@/store/calendarAtoms";
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

interface CalendarBodyProps {
  events: SimpleCalendarDto[];
}

const CalendarBody = ({ events }: CalendarBodyProps) => {
  const [selectedDate, setSelectedDate] = useAtom(selectedDateAtom);
  const [calendarDate, setCalendarDate] = useAtom(calendarDateAtom);

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
          return (
            <button
              key={`${date}-${month}-${year}`}
              className={`flex w-full flex-col items-center justify-center p-2.5`}
              onClick={() => {
                setSelectedDate(new Date(year, month, date + 1));
              }}
            >
              <div
                className={`flex h-full w-full items-center justify-center rounded-xl p-1.5 ${
                  date + 1 === selectedDate.getDate() &&
                  year === selectedDate.getFullYear() &&
                  month === selectedDate.getMonth()
                    ? "bg-black text-white"
                    : ""
                }`}
              >
                {date + 1}
              </div>
              <Spacing size={0.25} direction="vertical" />
              {/* event */}

              <div className="flex h-1 items-center justify-around gap-1">
                <div className="h-1 w-1 rounded-full border border-teal-500"></div>
                <div className="h-1 w-1 rounded-full border border-blue-500"></div>
                <div className="h-1 w-1 rounded-full border border-red-600"></div>
              </div>
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
