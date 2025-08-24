import classNames from "classnames";
import { CalendarEvent } from "@/types/calendarEvent";

interface Props {
  event: CalendarEvent;
  closeModal: () => void;
  onDeleteEvent: (eventId: string) => void;
}

export function EventInfoModal({ event, closeModal, onDeleteEvent }: Props) {
  const handleDelete = () => {
    if (confirm("이 행사를 삭제하시겠습니까?")) {
      onDeleteEvent(event.id);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="mx-4 w-full max-w-md rounded-lg bg-white p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">행사 정보</h2>
          <button
            onClick={closeModal}
            className="text-xl text-gray-500 hover:text-gray-700"
          >
            ×
          </button>
        </div>
        <div className="space-y-4">
          <div>
            <h3 className="mb-1 text-sm font-medium text-gray-700">
              행사 이름
            </h3>
            <p className="text-lg font-semibold text-gray-900">{event.title}</p>
          </div>
          <div>
            <h3 className="mb-1 text-sm font-medium text-gray-700">카테고리</h3>
            <span
              className={classNames(
                "inline-block rounded-full px-3 py-1 text-sm font-medium text-white",
                event.category === "eventTeam" ? "bg-blue-600" : "bg-green-600",
              )}
            >
              {event.category === "eventTeam" ? "행사부" : "기타"}
            </span>
          </div>
          <div>
            <h3 className="mb-1 text-sm font-medium text-gray-700">
              행사 기간
            </h3>
            <p className="text-gray-900">
              {event.startDate.toLocaleDateString("ko-KR")} ~{" "}
              {event.endDate.toLocaleDateString("ko-KR")}
            </p>
          </div>
          {event.slackLink && (
            <div>
              <h3 className="mb-1 text-sm font-medium text-gray-700">
                관련 Slack 링크
              </h3>
              <a
                href={event.slackLink}
                target="_blank"
                rel="noopener noreferrer"
                className="break-all text-blue-600 underline hover:text-blue-800"
              >
                {event.slackLink}
              </a>
            </div>
          )}

          <div className="flex gap-3 border-t border-gray-200 pt-4">
            <button
              onClick={handleDelete}
              className="rounded-md bg-red-600 px-4 py-2 font-medium text-white transition-colors hover:bg-red-700"
            >
              삭제
            </button>
            <button
              onClick={closeModal}
              className="flex-1 rounded-md bg-gray-200 px-4 py-2 font-medium text-gray-700 transition-colors hover:bg-gray-300"
            >
              닫기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
