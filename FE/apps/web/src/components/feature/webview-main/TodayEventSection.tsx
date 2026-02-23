"use client";

import Spacing from "@/components/common/Spacing";
import { useGetTodayCalenderEventsQuery } from "@/hooks/query/useCalendarQuery";

const formatDate = (timestamp: number) => {
  const date = new Date(timestamp);

  // 24시간 표기로 바꾸기
  return `${String(date.getHours()).padStart(2, "0")}:${String(
    date.getMinutes(),
  ).padStart(2, "0")}`;
};

const TodayEventSection = () => {
  const {
    data: todayEvent,
    isLoading,
    isError,
  } = useGetTodayCalenderEventsQuery();

  if (isLoading) {
    return (
      <div className="rounded-xl bg-[#00c3d0] px-5 py-3.5">로딩 중...</div>
    );
  }

  if (isError || !todayEvent) {
    return (
      <div className="rounded-xl bg-[#00c3d0] px-5 py-3.5">
        오늘의 이벤트를 불러오지 못했습니다.
      </div>
    );
  }

  const targetEvent = todayEvent[0];

  if (!targetEvent) {
    return (
      <div className="rounded-xl bg-[#00c3d0] px-5 py-3.5">
        오늘의 이벤트가 없습니다.
      </div>
    );
  }

  const today = new Date();
  const thisYear = today.getFullYear();
  const thisMonth = today.getMonth() + 1; // 월은 0부터 시작하므로 +1
  const thisDate = today.getDate();

  const eventTitle = targetEvent.title;

  const eventTime = `${
    Number(targetEvent.startAt) <
    new Date(thisYear, thisMonth - 1, thisDate).getTime()
      ? "00:00"
      : formatDate(targetEvent.startAt)
  } - ${
    Number(targetEvent.endAt) >
    new Date(thisYear, thisMonth - 1, thisDate + 1).getTime() - 1
      ? "24:00"
      : formatDate(+targetEvent.endAt)
  }
  `;

  const eventType =
    targetEvent.type === "event"
      ? "이벤트"
      : targetEvent.type === "presentation"
      ? "주간발표"
      : targetEvent.type === "etc"
      ? "기타"
      : "알 수 없음";

  console.log(new Date(+targetEvent.startAt));

  return (
    <section className="rounded-xl bg-[#00c3d0] px-5 py-3.5">
      <div>
        <div className="flex w-full justify-between">
          <div>
            <span className="text-lg font-semibold text-white">오늘 ㅣ </span>
            <span className="text-lg font-semibold text-white">
              {eventTitle}
            </span>
          </div>
          <div className="text-lg font-medium text-white ">{eventTime}</div>
        </div>
        <Spacing size={4} direction="vertical" unit="px" />
        <p className="text-end text-base font-semibold text-white">
          #{eventType}
        </p>
      </div>
    </section>
  );
};

export default TodayEventSection;
