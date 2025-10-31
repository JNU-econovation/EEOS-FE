import { SimpleCalendarDto } from "@/apis/dtos/calendar.dto";

export const getDatesInRange = (startDate: Date, endDate: Date): Date[] => {
  const dates = [];
  const current = new Date(startDate);

  while (current <= endDate) {
    dates.push(new Date(current));
    current.setDate(current.getDate() + 1);
  }

  return dates;
};

export const getCalendarDates = (currentDate: Date) => {
  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1,
  );
  const lastDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0,
  );

  const startDate = new Date(firstDayOfMonth);
  startDate.setDate(startDate.getDate() - firstDayOfMonth.getDay());

  const endDate = new Date(lastDayOfMonth);
  endDate.setDate(endDate.getDate() + (6 - lastDayOfMonth.getDay()));

  return getDatesInRange(startDate, endDate);
};

export const getEventsForDate = (date: Date, events: SimpleCalendarDto[]) => {
  return events.filter((event) => {
    const eventStart = new Date(event.startAt);
    const eventEnd = new Date(event.endAt);
    const checkDate = new Date(date);

    eventStart.setHours(0, 0, 0, 0);
    eventEnd.setHours(23, 59, 59, 999);
    checkDate.setHours(0, 0, 0, 0);

    return checkDate >= eventStart && checkDate <= eventEnd;
  });
};

export const isOtherMonth = (date: Date, currentDate: Date): boolean => {
  return date.getMonth() !== currentDate.getMonth();
};

export const isToday = (date: Date): boolean => {
  const today = new Date();
  return date.toDateString() === today.toDateString();
};

export const navigateMonth = (
  currentDate: Date,
  direction: "prev" | "next",
): Date => {
  const newDate = new Date(currentDate);
  newDate.setMonth(currentDate.getMonth() + (direction === "next" ? 1 : -1));
  return newDate;
};
