"use client";

import { useState } from "react";
import { CalendarGrid } from "@/components/calendar/CalendarGrid";
import { CalendarHeader } from "@/components/calendar/CalendarHeader";
import { CreateEventModal } from "@/components/calendar/CreateEventModal";
import { EventInfoModal } from "@/components/calendar/EventInfoModal";
import { WeekDayHeader } from "@/components/calendar/WeekDayHeader";
import { Calendar } from "@/types/calendar";
import { getCalendarDates, navigateMonth } from "@/utils/dateUtils";

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState<Calendar[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Calendar | null>(null);
  const [showEventModal, setShowEventModal] = useState(false);

  const dates = getCalendarDates(currentDate);

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

  const handleDeleteEvent = (eventId: number) => {
    setEvents(events.filter((e) => e.calendarId !== eventId));
    setShowEventModal(false);
    setSelectedEvent(null);
  };

  const handleEventClick = (event: Calendar, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedEvent(event);
    setShowEventModal(true);
  };

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
          createNewEvent={(newEvent) => {
            setEvents([...events, newEvent]);
          }}
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
