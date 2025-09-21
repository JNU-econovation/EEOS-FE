import { useState } from "react";
import { Calendar, CalendarEventType } from "@/types/calendar";

interface Props {
  closeModal: () => void;
  createNewEvent: (event: Calendar) => void;
  selectedDate: Date | null;
  setSelectedDate: (date: Date | null) => void;
}

export function CreateEventModal({
  closeModal,
  createNewEvent,
  selectedDate,
  setSelectedDate,
}: Props) {
  const defaultNewEvent = {
    title: "",
    type: "event" as CalendarEventType,
    startAt: "",
    endAt: "",
    url: "",
    writer: "",
  };

  const [newEvent, setNewEvent] = useState(defaultNewEvent);
  const categories: { label: string; value: CalendarEventType }[] = [
    { label: "행사", value: "event" },
    { label: "주간발표", value: "weekly_presentation" },
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
      return;

    const startAt = new Date(newEvent.startAt).getTime();
    const endAt = new Date(newEvent.endAt).getTime();

    if (startAt > endAt) {
      alert("시작일이 종료일보다 늦을 수 없습니다.");
      return;
    }

    const event: Calendar = {
      calendarId: Date.now(),
      writer: newEvent.writer || "사용자",
      title: newEvent.title,
      type: newEvent.type,
      startAt,
      endAt,
      url: newEvent.url,
    };

    createNewEvent(event);
    setSelectedDate(null);
    setNewEvent(defaultNewEvent);
    closeModal();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="mx-4 max-h-screen w-full max-w-lg overflow-y-auto rounded-lg bg-white p-6">
        <h2 className="mb-6 text-xl font-semibold">행사 등록</h2>

        <div className="space-y-6">
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
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              행사 일정 시작일 *
            </label>
            <input
              type="date"
              value={newEvent.startAt}
              onChange={(e) =>
                setNewEvent({ ...newEvent, startAt: e.target.value })
              }
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              행사 일정 종료일 *
            </label>
            <input
              type="date"
              value={newEvent.endAt}
              onChange={(e) =>
                setNewEvent({ ...newEvent, endAt: e.target.value })
              }
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              관련 링크 (선택사항)
            </label>
            <input
              type="url"
              value={newEvent.url}
              onChange={(e) =>
                setNewEvent({ ...newEvent, url: e.target.value })
              }
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="https://..."
            />
          </div>

          <div className="flex gap-3 pt-6">
            <button
              onClick={handleAddEvent}
              disabled={
                !newEvent.title.trim() || !newEvent.startAt || !newEvent.endAt
              }
              className="flex-1 rounded-md bg-blue-600 px-4 py-3 font-medium text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-400 disabled:opacity-50"
            >
              등록
            </button>
            <button
              onClick={() => {
                closeModal();
                setSelectedDate(null);
                setNewEvent(defaultNewEvent);
              }}
              className="flex-1 rounded-md bg-gray-200 px-4 py-3 font-medium text-gray-700 transition-colors hover:bg-gray-300"
            >
              취소
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
