"use client";

import LeftClampButton from "@/components/icons/items/LeftClampButton";
import RightClampButton from "@/components/icons/items/RightClampButton";
import { calendarDateAtom, selectedDateAtom } from "@/store/calendarAtoms";
import { useAtom } from "jotai";

function getMonthString(date: Date) {
  const month = date.getMonth();
  if (month === 0) return "January";
  if (month === 1) return "February";
  if (month === 2) return "March";
  if (month === 3) return "April";
  if (month === 4) return "May";
  if (month === 5) return "June";
  if (month === 6) return "July";
  if (month === 7) return "August";
  if (month === 8) return "September";
  if (month === 9) return "October";
  if (month === 10) return "November";
  if (month === 11) return "December";
  return "";
}

function getYearString(date: Date) {
  return date.getFullYear().toString();
}

const CalendarHeader = () => {
  const [selectedDate, setSelectedDate] = useAtom(calendarDateAtom);

  const month = getMonthString(selectedDate);
  const year = getYearString(selectedDate);

  const handleClickPrevMonth = () => {
    const prevMonthDate = new Date(selectedDate);
    prevMonthDate.setMonth(prevMonthDate.getMonth() - 1);
    setSelectedDate(prevMonthDate);
  };

  const handleClickNextMonth = () => {
    const nextMonthDate = new Date(selectedDate);
    nextMonthDate.setMonth(nextMonthDate.getMonth() + 1);
    setSelectedDate(nextMonthDate);
  };

  return (
    <div className="flex">
      <button onClick={handleClickPrevMonth}>
        <LeftClampButton />
      </button>
      <div className="flex w-full flex-col items-center">
        <h2 className="text-lg font-medium">{month}</h2>
        <span className="text-sm opacity-60">{year}</span>
      </div>
      <button onClick={handleClickNextMonth}>
        <RightClampButton />
      </button>
    </div>
  );
};

export default CalendarHeader;
