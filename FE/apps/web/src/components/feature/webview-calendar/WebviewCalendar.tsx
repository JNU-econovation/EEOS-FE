"use client";

import { useAtom } from "jotai";
import { useEffect, useRef } from "react";
import Calendar from "@/components/common/EventCalendar/Calendar";
import { useFetchMonthlyCalendarQuery } from "@/hooks/query/useCalendarQuery";
import {
  calendarDateAtom,
  selectedDateAtom,
  selectedDateEventsAtom,
  isBottomSheetOpenAtom,
} from "@/store/calendarAtoms";
import { getEventsForDate } from "@/utils/dateUtils";

const WebviewCalendar = () => {
  const [calendarDate] = useAtom(calendarDateAtom);
  const [, setSelectedDate] = useAtom(selectedDateAtom);
  const [, setSelectedDateEvents] = useAtom(selectedDateEventsAtom);
  const [, setIsBottomSheetOpen] = useAtom(isBottomSheetOpenAtom);
  const isInitialLoad = useRef(true);

  const year = calendarDate.getFullYear();
  const month = calendarDate.getMonth() + 1;
  const date = 1;
  const duration = new Date(year, month, 0).getDate();

  const { data: events } = useFetchMonthlyCalendarQuery({
    year,
    month,
    date,
    duration,
  });

  useEffect(() => {
    if (events && isInitialLoad.current) {
      isInitialLoad.current = false;
      const today = new Date();
      setSelectedDate(today);
      const todayEvents = getEventsForDate(today, events);
      setSelectedDateEvents(todayEvents);
      setIsBottomSheetOpen(true);
    }
  }, [events, setSelectedDate, setSelectedDateEvents, setIsBottomSheetOpen]);

  const handleDateClick = (clickedDate: Date) => {
    setSelectedDate(clickedDate);
    const eventsForDate = getEventsForDate(clickedDate, events ?? []);
    setSelectedDateEvents(eventsForDate);
    setIsBottomSheetOpen(true);
  };

  if (!events) return <Calendar event={[]} onDateClick={handleDateClick} />;

  return <Calendar event={events} onDateClick={handleDateClick} />;
};

export default WebviewCalendar;
