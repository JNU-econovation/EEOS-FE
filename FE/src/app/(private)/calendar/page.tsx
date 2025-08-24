"use client";

import classNames from "classnames";
import { useState } from "react";
import { CreateEventModal } from "@/components/calendar/CreateEventModal";
import { CalendarEvent } from "@/types/calendarEvent";

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(
    null,
  );
  const [showEventModal, setShowEventModal] = useState(false);

  const getCategoryColor = (category: "eventTeam" | "etc") => {
    return category === "eventTeam" ? "#3b82f6" : "#22c55e";
  };

  // 현재 월의 첫 번째 날과 마지막 날
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

  // 달력 그리드를 위한 시작일과 종료일 (주 단위로 맞춤)
  const startDate = new Date(firstDayOfMonth);
  startDate.setDate(startDate.getDate() - firstDayOfMonth.getDay());

  const endDate = new Date(lastDayOfMonth);
  endDate.setDate(endDate.getDate() + (6 - lastDayOfMonth.getDay()));

  // 달력에 표시할 모든 날짜들
  const getDatesInRange = () => {
    const dates = [];
    const current = new Date(startDate);

    while (current <= endDate) {
      dates.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }

    return dates;
  };

  const dates = getDatesInRange();

  // 특정 날짜의 이벤트들 가져오기
  const getEventsForDate = (date: Date) => {
    return events.filter((event) => {
      const eventStart = new Date(event.startDate);
      const eventEnd = new Date(event.endDate);
      const checkDate = new Date(date);

      // 시간 부분을 제거하여 날짜만 비교
      eventStart.setHours(0, 0, 0, 0);
      eventEnd.setHours(23, 59, 59, 999);
      checkDate.setHours(0, 0, 0, 0);

      return checkDate >= eventStart && checkDate <= eventEnd;
    });
  };

  // 이전/다음 달로 이동
  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + (direction === "next" ? 1 : -1));
      return newDate;
    });
  };

  // 오늘로 이동
  const goToToday = () => {
    setCurrentDate(new Date());
  };

  // 날짜 클릭 처리
  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    setShowAddModal(true);
  };

  // 이벤트 삭제
  const handleDeleteEvent = (eventId: string) => {
    if (confirm("이 행사를 삭제하시겠습니까?")) {
      setEvents(events.filter((e) => e.id !== eventId));
      setShowEventModal(false);
      setSelectedEvent(null);
    }
  };

  // 이벤트 클릭 처리
  const handleEventClick = (event: CalendarEvent, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedEvent(event);
    setShowEventModal(true);
  };

  // 현재 월이 아닌 날짜인지 확인
  const isOtherMonth = (date: Date) => {
    return date.getMonth() !== currentDate.getMonth();
  };

  // 오늘인지 확인
  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  return (
    <div className="flex h-screen flex-col bg-white">
      {/* 타이틀 */}
      <div className="p-4">
        <h1 className="text-center text-3xl font-bold text-gray-900">
          에코노 달력
        </h1>
      </div>

      {/* 헤더 */}
      <div className="flex items-center justify-between border-b border-gray-200 p-4">
        <div className="flex items-center space-x-4">
          <h2 className="text-2xl font-semibold text-gray-900">
            {currentDate.toLocaleDateString("ko-KR", {
              year: "numeric",
              month: "long",
            })}
          </h2>

          <div className="flex space-x-2">
            <button
              onClick={() => navigateMonth("prev")}
              className="rounded-md p-2 transition-colors hover:bg-gray-100"
            >
              ←
            </button>
            <button
              onClick={goToToday}
              className="rounded-md border border-gray-300 px-3 py-1 text-sm transition-colors hover:bg-gray-50"
            >
              오늘
            </button>
            <button
              onClick={() => navigateMonth("next")}
              className="rounded-md p-2 transition-colors hover:bg-gray-100"
            >
              →
            </button>
          </div>
        </div>
      </div>

      {/* 요일 헤더 */}
      <div className="grid grid-cols-7 border-b border-gray-200">
        {["일", "월", "화", "수", "목", "금", "토"].map((day, index) => (
          <div
            key={day}
            className={`p-3 text-center text-sm font-medium ${
              index === 0
                ? "text-red-500"
                : index === 6
                ? "text-blue-500"
                : "text-gray-700"
            }`}
          >
            {day}
          </div>
        ))}
      </div>

      {/* 달력 그리드 */}
      <div
        className="grid flex-1 grid-cols-7"
        style={{
          gridTemplateRows: `repeat(${Math.ceil(dates.length / 7)}, 1fr)`,
        }}
      >
        {dates.map((date, index) => {
          const dayEvents = getEventsForDate(date);
          const isOtherMonthDate = isOtherMonth(date);
          const isTodayDate = isToday(date);

          return (
            <div
              key={date.toISOString()}
              className={`cursor-pointer border-b border-r border-gray-200 p-2 transition-colors ${
                index % 7 === 6 ? "border-r-0" : ""
              } ${
                isOtherMonthDate
                  ? "bg-gray-100 hover:bg-gray-200"
                  : "hover:bg-gray-50"
              }`}
              onClick={() => handleDateClick(date)}
            >
              <div
                className={`mb-1 text-sm ${
                  isOtherMonthDate
                    ? "text-gray-400"
                    : isTodayDate
                    ? "flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 font-medium text-white"
                    : index % 7 === 0
                    ? "text-red-500"
                    : index % 7 === 6
                    ? "text-blue-500"
                    : "text-gray-900"
                }`}
              >
                {date.getDate()}
              </div>

              {/* 이벤트 목록 */}
              <div className="space-y-1">
                {dayEvents.slice(0, 3).map((event) => (
                  <div
                    key={event.id}
                    className={classNames(
                      "cursor-pointer truncate rounded p-1 text-xs text-white hover:opacity-80",
                      event.category === "eventTeam"
                        ? "bg-blue-600"
                        : "bg-green-600",
                    )}
                    onClick={(e) => handleEventClick(event, e)}
                    title={`${event.title} (${
                      event.category === "eventTeam" ? "행사부" : "기타"
                    })`}
                  >
                    {event.title}
                  </div>
                ))}
                {dayEvents.length > 3 && (
                  <div className="text-xs text-gray-500">
                    +{dayEvents.length - 3}개 더
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* 행사 추가 모달 */}
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

      {/* 행사 정보 모달 */}
      {showEventModal && selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-[450px] max-w-[90vw] rounded-lg bg-white p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold">행사 정보</h2>
              <button
                onClick={() => {
                  setShowEventModal(false);
                  setSelectedEvent(null);
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>

            <div className="space-y-4">
              {/* 행사 이름 */}
              <div>
                <h3 className="mb-1 text-sm font-medium text-gray-700">
                  행사 이름
                </h3>
                <p className="text-lg font-semibold text-gray-900">
                  {selectedEvent.title}
                </p>
              </div>

              {/* 카테고리 */}
              <div>
                <h3 className="mb-1 text-sm font-medium text-gray-700">
                  카테고리
                </h3>
                <span
                  className="inline-block rounded-full px-3 py-1 text-sm font-medium text-white"
                  style={{
                    backgroundColor: getCategoryColor(selectedEvent.category),
                  }}
                >
                  {selectedEvent.category === "eventTeam" ? "행사부" : "기타"}
                </span>
              </div>

              {/* 행사 기간 */}
              <div>
                <h3 className="mb-1 text-sm font-medium text-gray-700">
                  행사 기간
                </h3>
                <p className="text-gray-900">
                  {selectedEvent.startDate.toLocaleDateString("ko-KR")} ~{" "}
                  {selectedEvent.endDate.toLocaleDateString("ko-KR")}
                </p>
              </div>

              {/* Slack 링크 */}
              {selectedEvent.slackLink && (
                <div>
                  <h3 className="mb-1 text-sm font-medium text-gray-700">
                    관련 Slack 링크
                  </h3>
                  <a
                    href={selectedEvent.slackLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="break-all text-blue-600 underline hover:text-blue-800"
                  >
                    {selectedEvent.slackLink}
                  </a>
                </div>
              )}

              <div className="flex space-x-3 border-t border-gray-200 pt-4">
                <button
                  onClick={() => handleDeleteEvent(selectedEvent.id)}
                  className="rounded-md bg-red-600 px-4 py-2 text-white transition-colors hover:bg-red-700"
                >
                  삭제
                </button>
                <button
                  onClick={() => {
                    setShowEventModal(false);
                    setSelectedEvent(null);
                  }}
                  className="flex-1 rounded-md bg-gray-300 px-4 py-2 text-gray-700 transition-colors hover:bg-gray-400"
                >
                  닫기
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
