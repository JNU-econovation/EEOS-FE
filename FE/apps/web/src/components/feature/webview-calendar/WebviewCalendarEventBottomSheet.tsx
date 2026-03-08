"use client";

import { SimpleCalendarDto } from "@/apis/dtos/calendar.dto";
import BottomSheet from "@/components/common/BottomSheet";
import Spacing from "@/components/common/Spacing";
import useOpenEventCreateFormModalBridge from "@/hooks/bridge/useOpenEventCreateFormModalBridge";
import { useDeleteCalendarEventMutation } from "@/hooks/query/useCalendarQuery";
import {
  isBottomSheetOpenAtom,
  selectedDateAtom,
  selectedDateEventsAtom,
} from "@/store/calendarAtoms";
import { getDayString } from "@/utils/convert";
import classNames from "classnames";
import { useAtom } from "jotai";
import { useState } from "react";
import { createPortal } from "react-dom";

const formatDateForDisplay = (timestamp: number) => {
  if (!timestamp) return "";
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${year}년 ${month}월 ${day}일 ${hours}:${minutes}`;
};

const WebviewCalendarEventBottomSheet = () => {
  const [isOpen, setIsOpen] = useAtom(isBottomSheetOpenAtom);
  const [selectedDate] = useAtom(selectedDateAtom);
  const [events] = useAtom(selectedDateEventsAtom);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<SimpleCalendarDto>(null);

  const { mutate: deleteEvent } = useDeleteCalendarEventMutation();

  const openEventCreateModal = useOpenEventCreateFormModalBridge();

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);

    // 24시간 표기로 바꾸기
    return `${String(date.getHours()).padStart(2, "0")}:${String(
      date.getMinutes(),
    ).padStart(2, "0")}`;
  };

  const getTypeLabel = (type: string) => {
    return type === "event"
      ? "행사"
      : type === "presentation"
      ? "주간발표"
      : "기타";
  };

  const getTypeColor = (type: string) => {
    return type === "event"
      ? "blue-500"
      : type === "presentation"
      ? "red-500"
      : "teal-500";
  };

  return (
    <>
      <BottomSheet
        isOpen={isOpen}
        maxHeight={250}
        threshold={50}
        onClose={() => {
          setIsOpen(false);
        }}
        onOpen={() => {
          setIsOpen(true);
        }}
      >
        <div className="px-4">
          {selectedDate && (
            <div className="sticky top-0 bg-white">
              <h3 className="text-lg font-bold">
                {selectedDate.getMonth() + 1}월 {selectedDate.getDate()}일 (
                {getDayString(selectedDate.getDay())})
              </h3>
            </div>
          )}

          <Spacing size={1} unit="rem" direction="vertical" />

          {events.length === 0 ? (
            <button
              className="flex w-full items-center justify-center rounded-lg border px-4 py-10"
              onClick={() => {
                openEventCreateModal({
                  year: selectedDate.getFullYear(),
                  month: selectedDate.getMonth() + 1,
                  date: selectedDate.getDate(),
                });
              }}
            >
              <div className="text-base font-medium text-gray-500">
                + 새로운 행사 만들기
              </div>
            </button>
          ) : (
            <ul className="flex max-h-48 flex-col gap-4 overflow-auto">
              {events.map((event) => (
                <li
                  key={event.calendarId}
                  className="rounded-lg border px-6 py-4"
                  onClick={() => {
                    setIsModalOpen(true);
                    setSelectedEvent(event);
                  }}
                >
                  <div className="relative">
                    <div
                      className={classNames(
                        "absolute left-0 top-0 h-3 w-3 -translate-x-3 -translate-y-1 rounded-full border-4 bg-white",
                        `border-${getTypeColor(event.type)}`,
                      )}
                    />
                    <span className="text-sm font-medium opacity-60">
                      {`${
                        // 시작 날이 선택된 날짜보다 이전이라면 00:00으로 표시. 아니라면 startAt 시간으로 표시
                        event.startAt <
                        new Date(
                          selectedDate.getFullYear(),
                          selectedDate.getMonth(),
                          selectedDate.getDate(),
                        ).getTime()
                          ? `00:00`
                          : formatDate(event.startAt)
                      } - ${
                        // 다음날까지 이어진다면 24:00으로 표시. 아니라면 endAt 시간으로 표시
                        event.endAt >
                        new Date(
                          selectedDate.getFullYear(),
                          selectedDate.getMonth(),
                          selectedDate.getDate() + 1,
                        ).getTime() -
                          1
                          ? `24:00`
                          : formatDate(event.endAt)
                      }`}
                    </span>
                  </div>
                  <p className="text-base font-bold">{event.title}</p>
                  <span
                    className={classNames(
                      "inline-block rounded-full px-3 py-1 text-xs font-light text-white",
                      `bg-${getTypeColor(event.type)}`,
                    )}
                  >
                    {getTypeLabel(event.type)}
                  </span>
                  {event.url && (
                    <a
                      href={event.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 block text-sm text-blue-500 underline"
                    >
                      링크 열기
                    </a>
                  )}
                </li>
              ))}
              <li
                className="flex items-center justify-center rounded-lg border px-4 py-10"
                onClick={() => {
                  openEventCreateModal({
                    year: selectedDate.getFullYear(),
                    month: selectedDate.getMonth() + 1,
                    date: selectedDate.getDate(),
                  });
                }}
              >
                <div className="text-base font-medium text-gray-500">
                  + 새로운 행사 만들기
                </div>
              </li>
              <div className="mt-4" />
            </ul>
          )}
        </div>
      </BottomSheet>
      {window &&
        createPortal(
          <>
            {isModalOpen && (
              <div
                className={classNames(
                  "fixed inset-0 z-50 flex items-center justify-center bg-black/50",
                )}
                onClick={(e) => {
                  e.stopPropagation();
                  if (e.target === e.currentTarget) setIsModalOpen(false);
                }}
              >
                <div
                  className="w-11/12 rounded-lg border bg-white text-[#222b45]"
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  <div className="p-4">
                    <h3 className="text-lg font-semibold leading-[21.60px]">
                      {selectedEvent ? selectedEvent.title : ""}
                    </h3>
                  </div>
                  <div className="h-1 bg-[#E9E9E9]" />
                  <div className="p-4">
                    <ul className="">
                      <li className="flex gap-4">
                        <p>생성자</p>
                        <p>{/* {selectedEvent ? selectedEvent.url : ""} */}</p>
                      </li>
                      <li className="flex gap-4">
                        <p>시작일</p>
                        <p>
                          {selectedEvent
                            ? formatDateForDisplay(selectedEvent.startAt)
                            : ""}
                        </p>
                      </li>
                      <li className="flex gap-4">
                        <p>종료일</p>
                        <p>
                          {selectedEvent
                            ? formatDateForDisplay(selectedEvent.endAt)
                            : ""}
                        </p>
                      </li>
                    </ul>
                  </div>
                  <div className="flex gap-4 px-4">
                    <button
                      className="w-full rounded-xl bg-primary p-2"
                      onClick={() => {
                        deleteEvent(selectedEvent.calendarId, {});
                      }}
                    >
                      삭제하기
                    </button>
                    <button
                      className="w-full rounded-xl bg-gray-300 p-2"
                      onClick={() => setIsModalOpen(false)}
                    >
                      닫기
                    </button>
                  </div>
                  <Spacing size={1} unit="rem" direction="vertical" />
                </div>
              </div>
            )}
          </>,
          document.body,
        )}
    </>
  );
};

export default WebviewCalendarEventBottomSheet;
