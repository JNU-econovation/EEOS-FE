"use client";

import { useState } from "react";
import { CalendarGrid } from "@/components/calendar/CalendarGrid";
import { CalendarHeader } from "@/components/calendar/CalendarHeader";
import { CreateEventModal } from "@/components/calendar/CreateEventModal";
import { EventInfoModal } from "@/components/calendar/EventInfoModal";
import { WeekDayHeader } from "@/components/calendar/WeekDayHeader";
import {
  useFetchMonthlyCalendarQuery,
  useCreateCalendarEventMutation,
  useDeleteCalendarEventMutation,
} from "@/hooks/query/useCalendarQuery";
import { Calendar, NewCalendar } from "@/types/calendar";
import { getCalendarDates, navigateMonth } from "@/utils/dateUtils";

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Calendar | null>(null);
  const [showEventModal, setShowEventModal] = useState(false);

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
  const { mutate: deleteEvent } = useDeleteCalendarEventMutation();

  const handleNavigateMonth = (direction: "prev" | "next") => {
    setCurrentDate(navigateMonth(currentDate, direction));
  };

  const handleGoToToday = () => {
    setCurrentDate(new Date());
  };

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    setShowAddModal(true);
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

  const handleDeleteEvent = (eventId: number) => {
    deleteEvent(eventId, {
      onSuccess: () => {
        setShowEventModal(false);
        setSelectedEvent(null);
        refetchEvent();
      },
      onError: (error) => {
        console.error("이벤트 삭제 실패:", error);
        alert("이벤트 삭제에 실패했습니다.");
      },
    });
  };

  const handleEventClick = (event: Calendar, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedEvent(event);
    setShowEventModal(true);
  };

  if (!events) return null;

  return (
    <div className="flex h-screen flex-col bg-white">
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
        onEventClick={handleEventClick}
      />

      {showAddModal && selectedDate && (
        <CreateEventModal
          closeModal={() => setShowAddModal(false)}
          createNewEvent={handleCreateEvent}
          selectedDate={selectedDate}
          setSelectedDate={(selectedDate) => setSelectedDate(selectedDate)}
        />
      )}
      {showEventModal && selectedEvent && (
        <EventInfoModal
          event={selectedEvent}
          closeModal={() => {
            setShowEventModal(false);
            setSelectedEvent(null);
          }}
          onDeleteEvent={handleDeleteEvent}
        />
      )}
    </div>
  );
}
