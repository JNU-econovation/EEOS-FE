"use client";

import {
  useCreateCalendarEventMutation,
  useFetchMonthlyCalendarQuery,
} from "@/hooks/query/useCalendarQuery";
import { NewCalendar } from "@/types/calendar";
import {
  getCalendarDates,
  getEventsForDate,
  navigateMonth,
} from "@/utils/dateUtils";
import { useState, useEffect } from "react";
import { useAtom } from "jotai";
import {
  selectedDateAtom,
  selectedDateEventsAtom,
  isBottomSheetOpenAtom,
} from "@/store/calendarAtoms";
import { CalendarHeader } from "./CalendarHeader";
import { WeekDayHeader } from "./WeekDayHeader";
import { CalendarGrid } from "./CalendarGrid";

const WebviewCalendarSection = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useAtom(selectedDateAtom);
  const [, setSelectedDateEvents] = useAtom(selectedDateEventsAtom);
  const [, setIsBottomSheetOpen] = useAtom(isBottomSheetOpenAtom);
  const [showAddModal, setShowAddModal] = useState(false);

  const dates = getCalendarDates(currentDate);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1;
  const date = 1;
  const duration = new Date(year, month, 0).getDate();

  const { data: events, refetch: refetchEvent } = useFetchMonthlyCalendarQuery({
    year,
    month,
    date,
    duration,
  });

  const { mutate: createEvent } = useCreateCalendarEventMutation();

  const handleNavigateMonth = (direction: "prev" | "next") => {
    setCurrentDate(navigateMonth(currentDate, direction));
  };

  const handleGoToToday = () => {
    setCurrentDate(new Date());
  };

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    const eventsForDate = getEventsForDate(date, events || []);
    setSelectedDateEvents(eventsForDate);
    setIsBottomSheetOpen(true);
  };

  const handleCreateEvent = (newEvent: NewCalendar) => {
    createEvent(newEvent, {
      onSuccess: () => {
        setShowAddModal(false);
        setSelectedDate(null);
        refetchEvent();
      },
      onError: (error) => {
        console.error("이벤트 생성 실패:", error);
        alert("이벤트 생성에 실패했습니다.");
      },
    });
  };

  // 컴포넌트 마운트 및 이벤트 로드 시 오늘 날짜 자동 선택
  useEffect(() => {
    if (events && events.length >= 0) {
      const today = new Date();
      setSelectedDate(today);
      const todayEvents = getEventsForDate(today, events);
      setSelectedDateEvents(todayEvents);
      setIsBottomSheetOpen(true);
    }
  }, [events, setSelectedDate, setSelectedDateEvents, setIsBottomSheetOpen]);

  if (!events) return null;
  return (
    <div className="flex grow flex-col bg-white">
      <CalendarHeader
        currentDate={currentDate}
        onNavigateMonth={handleNavigateMonth}
        onGoToToday={handleGoToToday}
      />

      <WeekDayHeader />

      <CalendarGrid
        dates={dates}
        currentDate={currentDate}
        events={events}
        onDateClick={handleDateClick}
      />
    </div>
  );
};

export default WebviewCalendarSection;
