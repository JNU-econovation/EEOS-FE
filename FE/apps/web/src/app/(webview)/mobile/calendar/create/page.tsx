"use client";

import AppSafeArea from "@/components/common/AppSafeArea/AppSafeArea";
import Calendar from "@/components/common/calendar/Calendar";
import { useCreateCalendarEventMutation } from "@/hooks/query/useCalendarQuery";
import {
  CalendarEventType,
  Calendar as CalendarType,
  NewCalendar,
} from "@/types/calendar";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import Spacing from "@/components/common/Spacing";

const CreateEventPage = () => {
  const searchParams = useSearchParams();
  const dateParam = searchParams.get("date");
  const selectedDate = dateParam ? new Date(Number(dateParam)) : null;
  const [isLoading, setIsLoading] = useState(false);
  const [showStartCalendar, setShowStartCalendar] = useState(false);
  const [showEndCalendar, setShowEndCalendar] = useState(false);

  const { mutate: createEvent } = useCreateCalendarEventMutation();

  const handleCreateEvent = (newEvent: NewCalendar) => {
    setIsLoading(true);
    createEvent(newEvent, {
      onError: (error) => {
        console.error("이벤트 생성 실패:", error);
        alert("이벤트 생성에 실패했습니다.");
      },
    });
  };

  const formatDateForInput = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  const formatDateForDisplay = (dateStr: string) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${year}년 ${month}월 ${day}일 ${hours}:${minutes}`;
  };

  const parseStringToDate = (dateStr: string): Date | undefined => {
    if (!dateStr) return undefined;
    return new Date(dateStr);
  };

  const defaultNewEvent = {
    title: "",
    type: "event" as CalendarEventType,
    startAt: selectedDate ? formatDateForInput(selectedDate) : "",
    endAt: selectedDate ? formatDateForInput(selectedDate) : "",
    url: "",
    writer: "",
  };

  const [newEvent, setNewEvent] = useState(defaultNewEvent);
  const categories: { label: string; value: CalendarEventType }[] = [
    { label: "행사", value: "event" },
    { label: "주간발표", value: "presentation" },
    { label: "기타", value: "etc" },
  ];

  // 이벤트 추가
  const handleAddEvent = () => {
    if (
      !selectedDate ||
      !newEvent.title.trim() ||
      !newEvent.startAt ||
      !newEvent.endAt
    )
      return alert("필수 항목을 모두 입력해주세요.");

    const startAt = new Date(newEvent.startAt).getTime();
    const endAt = new Date(newEvent.endAt).getTime();

    if (startAt > endAt) {
      alert("시작일이 종료일보다 늦을 수 없습니다.");
      return;
    }

    const event: CalendarType = {
      calendarId: Date.now(),
      writer: newEvent.writer || "사용자",
      title: newEvent.title,
      type: newEvent.type,
      startAt,
      endAt,
      url: newEvent.url,
    };

    handleCreateEvent(event);
  };

  // if (!selectedDate) {
  //   throw new Error(
  //     "선택된 날짜가 없습니다. 날짜를 선택하고 다시 시도해주세요.",
  //   );
  // }

  return (
    <div className="min-h-screen bg-white">
      <div className="space-y-6 p-6">
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            행사 이름 *
          </label>
          <input
            type="text"
            value={newEvent.title}
            onChange={(e) =>
              setNewEvent({ ...newEvent, title: e.target.value })
            }
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="행사 이름을 입력하세요"
            autoFocus
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            행사 종류 *
          </label>
          <div className="flex gap-3">
            {categories.map((category) => (
              <button
                key={category.value}
                onClick={() =>
                  setNewEvent({ ...newEvent, type: category.value })
                }
                className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                  newEvent.type === category.value
                    ? "bg-primary"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>

        <div className="relative">
          <label className="mb-2 block text-sm font-medium text-gray-700">
            행사 일정 시작일 *
          </label>
          <div
            onClick={() => {
              setShowStartCalendar(!showStartCalendar);
              setShowEndCalendar(false);
            }}
            className="w-full cursor-pointer rounded-md border border-gray-300 px-3 py-2 focus-within:border-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-500"
          >
            {newEvent.startAt
              ? formatDateForDisplay(newEvent.startAt)
              : "날짜를 선택하세요"}
          </div>
          {showStartCalendar && (
            <Calendar
              date={parseStringToDate(newEvent.startAt)}
              withTime
              submitButton
              handleSubmit={() => setShowStartCalendar(false)}
              handleDateChange={(date) => {
                if (date) {
                  setNewEvent({
                    ...newEvent,
                    startAt: formatDateForInput(date),
                  });
                  // setShowStartCalendar(false);
                }
              }}
            />
          )}
        </div>

        <div className="relative">
          <label className="mb-2 block text-sm font-medium text-gray-700">
            행사 일정 종료일 *
          </label>
          <div
            onClick={() => {
              setShowEndCalendar(!showEndCalendar);
              setShowStartCalendar(false);
            }}
            className="w-full cursor-pointer rounded-md border border-gray-300 px-3 py-2 focus-within:border-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-500"
          >
            {newEvent.endAt
              ? formatDateForDisplay(newEvent.endAt)
              : "날짜를 선택하세요"}
          </div>
          {showEndCalendar && (
            <Calendar
              date={parseStringToDate(newEvent.endAt)}
              withTime
              submitButton
              handleSubmit={() => setShowEndCalendar(false)}
              handleDateChange={(date) => {
                if (date) {
                  setNewEvent({
                    ...newEvent,
                    endAt: formatDateForInput(date),
                  });
                }
              }}
            />
          )}
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            관련 링크 (선택사항)
          </label>
          <input
            type="url"
            value={newEvent.url}
            onChange={(e) => setNewEvent({ ...newEvent, url: e.target.value })}
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="https://..."
          />
        </div>

        <button
          onClick={handleAddEvent}
          disabled={
            !newEvent.title.trim() || !newEvent.startAt || !newEvent.endAt
          }
          className="w-full flex-1 rounded-full bg-black px-4 py-3 font-medium text-white transition-colors disabled:cursor-not-allowed disabled:bg-gray-400 disabled:opacity-50"
        >
          {isLoading ? "등록 중..." : "등록"}
        </button>
      </div>
      {(showStartCalendar || showEndCalendar) && (
        <Spacing size={20} direction="vertical" />
      )}
    </div>
  );
};

export default CreateEventPage;
