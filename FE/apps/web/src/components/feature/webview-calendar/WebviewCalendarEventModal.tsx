"use client";

import { SimpleCalendarDto } from "@/apis/dtos/calendar.dto";
import Spacing from "@/components/common/Spacing";
import { useDeleteCalendarEventMutation } from "@/hooks/query/useCalendarQuery";
import { useState } from "react";

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

interface WebviewCalendarEventModalProps {
  children?: ({
    openEventModal,
    setSelectedEvent,
  }: {
    openEventModal: () => void;
    setSelectedEvent: (event: SimpleCalendarDto) => void;
  }) => React.ReactNode;
}

const WebviewCalendarEventModal = ({
  children,
}: WebviewCalendarEventModalProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<SimpleCalendarDto>(null);

  const { mutate: deleteEvent } = useDeleteCalendarEventMutation();

  const openEventModal = () => {
    setIsModalOpen(true);
  };

  const setSelectedEventHandler = (event: SimpleCalendarDto) => {
    setSelectedEvent(event);
  };

  return (
    <>
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
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
                  deleteEvent(selectedEvent.calendarId, {
                    onSuccess: () => {
                      setIsModalOpen(false);
                      setSelectedEvent(null);
                    },
                    onError: () => {
                      alert("행사 삭제에 실패했습니다.");
                    },
                  });
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

      {children?.({ openEventModal, setSelectedEvent })}
    </>
  );
};

export default WebviewCalendarEventModal;
