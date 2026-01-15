"use client";

import { Sheet } from "react-modal-sheet";
import { useAtom } from "jotai";
import {
  selectedDateAtom,
  selectedDateEventsAtom,
  isBottomSheetOpenAtom,
} from "@/store/calendarAtoms";
import classNames from "classnames";

const CalendarBottomSheet = () => {
  const [selectedDate] = useAtom(selectedDateAtom);
  const [events] = useAtom(selectedDateEventsAtom);
  const [isOpen, setIsOpen] = useAtom(isBottomSheetOpenAtom);

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, "0")}.${String(date.getDate()).padStart(2, "0")}`;
  };

  const getTypeLabel = (type: string) => {
    return type === "event"
      ? "행사"
      : type === "presentation"
        ? "주간발표"
        : "기타";
  };

  const getTypeBgColor = (type: string) => {
    return type === "event"
      ? "bg-blue-500"
      : type === "presentation"
        ? "bg-red-500"
        : "bg-teal-500";
  };
  return (
    <Sheet
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      detent="content"
      snapPoints={[40, 1]}
      disableDismiss={false}
      initialSnap={1}
    >
      <Sheet.Container>
        <Sheet.Header />
        <Sheet.Content>
          <div className="h-80 overflow-auto px-4">
            {selectedDate && (
              <div className="mb-4 sticky top-0 bg-white pb-2 border-b">
                <h3 className="text-lg font-bold">
                  {selectedDate.getFullYear()}년 {selectedDate.getMonth() + 1}월{" "}
                  {selectedDate.getDate()}일
                </h3>
              </div>
            )}

            {events.length === 0 ? (
              <div className="flex items-center justify-center h-40">
                <p className="text-gray-400">이 날짜에는 일정이 없습니다.</p>
              </div>
            ) : (
              <ul className="flex flex-col gap-4">
                {events.map((event) => (
                  <li key={event.calendarId} className="rounded-lg border p-4">
                    <span className="text-sm font-medium opacity-60">
                      {formatDate(event.startAt)}
                      {event.startAt !== event.endAt &&
                        ` - ${formatDate(event.endAt)}`}
                    </span>
                    <p className="text-lg font-bold">{event.title}</p>
                    <span
                      className={classNames(
                        "inline-block rounded-full px-3 py-1 text-xs font-light text-white",
                        getTypeBgColor(event.type),
                      )}
                    >
                      {getTypeLabel(event.type)}
                    </span>
                    {event.url && (
                      <a
                        href={event.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block mt-2 text-sm text-blue-500 underline"
                      >
                        링크 열기
                      </a>
                    )}
                  </li>
                ))}
                <div className="mt-4" />
              </ul>
            )}
          </div>
        </Sheet.Content>
      </Sheet.Container>
    </Sheet>
  );
};

export default CalendarBottomSheet;
