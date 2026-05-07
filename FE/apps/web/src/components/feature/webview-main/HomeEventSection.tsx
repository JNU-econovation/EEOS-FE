"use client";

import CharacterImage from "@/components/common/CharacterImage/Charactor-Image";
import useRouteToWebviewScreenBridge from "@/hooks/bridge/useRouteToWebviewScreenBridge";
import { useGetTwoMonthCalenderEventsQuery } from "@/hooks/query/useCalendarQuery";
import { useCallback } from "react";

const FIXED_HEIGHT = "min-h-[6rem]";

const formatTime = (timestamp: number) => {
  const date = new Date(timestamp);
  return `${String(date.getHours()).padStart(2, "0")}:${String(
    date.getMinutes(),
  ).padStart(2, "0")}`;
};

const getDdayLabel = (startAt: number): string => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const startDate = new Date(startAt);
  startDate.setHours(0, 0, 0, 0);
  const diffMs = startDate.getTime() - today.getTime();
  const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));
  if (diffDays <= 0) return "오늘";
  return `D-${diffDays}`;
};

const HomeEventSection = () => {
  const {
    data: events,
    isLoading,
    isError,
  } = useGetTwoMonthCalenderEventsQuery();

  const routeToWebviewScreen = useRouteToWebviewScreenBridge();

  const handleViewAllPrograms = useCallback(() => {
    routeToWebviewScreen({ uri: `${window.location.origin}/mobile/programs` });
  }, [routeToWebviewScreen]);

  const baseClass = `rounded-t-xl bg-[#00c3d0] px-4 py-3.5 flex flex-col relative ${FIXED_HEIGHT} relative`;

  if (isLoading) {
    return <div className={baseClass} />;
  }

  if (isError || !events) {
    return (
      <div className={baseClass}>
        <p className="text-white">오늘의 이벤트를 불러오지 못했습니다.</p>
      </div>
    );
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const filteredEvents = events.filter(
    (e) => new Date(e.startAt).setHours(0, 0, 0, 0) >= today.getTime(),
  );

  const upcomingEvents = filteredEvents
    .sort((a, b) => a.startAt - b.startAt)
    .slice(0, 2);

  if (upcomingEvents.length === 0) {
    return (
      <div className={baseClass}>
        <div className="grow">
          <p className="text-lg font-semibold text-white">
            아직 다가오는 일정이 없어요.
          </p>
        </div>
        <button
          type="button"
          aria-label="일정 전체보기"
          onClick={handleViewAllPrograms}
          className="text-end text-[0.75rem] text-white"
        >
          일정 전체보기 {">"}
        </button>
      </div>
    );
  }

  return (
    <section className={baseClass}>
      <div className="flex min-w-0 gap-2 overflow-hidden">
        <div className="shrink-0">
          {upcomingEvents.map(({ calendarId, startAt }) => {
            const label = getDdayLabel(startAt);

            return (
              <div
                key={calendarId}
                className="text-lg font-semibold text-white"
              >
                <p>{label}</p>
              </div>
            );
          })}
        </div>
        <div className="shrink-0 border border-white" />
        <div className="min-w-0 grow overflow-hidden">
          {upcomingEvents.map((event) => {
            const thisYear = today.getFullYear();
            const thisMonth = today.getMonth();
            const thisDate = today.getDate();
            const dayStart = new Date(thisYear, thisMonth, thisDate).getTime();
            const dayEnd =
              new Date(thisYear, thisMonth, thisDate + 1).getTime() - 1;

            const startDisplay =
              event.startAt < dayStart ? "00:00" : formatTime(event.startAt);
            const endDisplay =
              event.endAt > dayEnd ? "24:00" : formatTime(event.endAt);

            return (
              <div
                key={event.calendarId}
                className="flex w-full justify-between gap-1 overflow-hidden"
              >
                <p className="min-w-0 flex-1 overflow-hidden text-ellipsis whitespace-nowrap text-lg font-semibold text-white">
                  {event.title}
                </p>
                <div className="shrink-0 text-lg font-medium text-white">
                  {startDisplay} - {endDisplay}
                </div>
              </div>
            );
          })}
          {filteredEvents.length > 2 && (
            <p className="text-lg font-semibold text-white">
              +{filteredEvents.length - 2}
            </p>
          )}
        </div>
      </div>

      <button
        type="button"
        aria-label="일정 전체보기"
        onClick={handleViewAllPrograms}
        className="absolute bottom-2 right-5 text-[0.75rem] text-white"
      >
        전체보기 {">"}
      </button>

      <div className="absolute right-0 top-0 -z-10 -translate-y-32">
        <CharacterImage />
      </div>
    </section>
  );
};

export default HomeEventSection;
