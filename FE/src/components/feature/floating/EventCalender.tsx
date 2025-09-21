"use client";

import Link from "next/link";
import { useMemo } from "react";
import FadeSlideIn from "@/components/common/FadeSlideIn/FadeSlideIn";
import { useGetSimpleCalendarEvents } from "@/hooks/query/useCalendar";

const numberToDay = (nbr: number) => {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] as const;
  const day = nbr % days.length;
  return days[day];
};

const color = {
  event: "bg-blue-500",
  presentation: "bg-red-500",
  etc: "bg-teal-500",
};
//TODO: ui 따로 추상화 하기
const EventCalender = ({ onClose }: { onClose: () => void }) => {
  const { data: events, isLoading, isError } = useGetSimpleCalendarEvents();

  const today = useMemo(() => new Date(), []);
  const date = useMemo(() => today.getDate(), [today]);

  const calendarDates = useMemo(
    () =>
      new Array(12)
        .fill(0)
        .map(
          (_, i) => new Date(today.getFullYear(), today.getMonth(), date + i),
        ),
    [today, date],
  );

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading events</div>;

  if (!events) return null;

  return (
    <>
      <button className="fixed z-30 h-screen w-screen" onClick={onClose} />
      <section className="right:0 fixed bottom-32 z-30 rounded-xl bg-white p-4 shadow-2xl md:right-20">
        <FadeSlideIn>
          <div className="relative">
            <div className="mb-2 grid grid-cols-12 divide-x divide-gray-200 border-b">
              {calendarDates.map((date, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center px-2 pb-2"
                >
                  <span className="text-md font-semibold">
                    {numberToDay(date.getDay())}
                  </span>
                  <span className="text-sm font-medium opacity-60">
                    {date.getDate()}
                  </span>
                </div>
              ))}
            </div>
            <div
              className="relative"
              style={{ height: `${events.length * 28 + 10}px` }}
            >
              {events.map(
                ({ startAt, endAt, calendarId, title, type }, index) => {
                  const startDate = new Date(+startAt);
                  const endDate = new Date(+endAt);

                  let startCol = -1;
                  let endCol = -1;

                  calendarDates.forEach((date, dateIndex) => {
                    const dateOnly = new Date(
                      date.getFullYear(),
                      date.getMonth(),
                      date.getDate(),
                    );
                    const startDateOnly = new Date(
                      startDate.getFullYear(),
                      startDate.getMonth(),
                      startDate.getDate(),
                    );
                    const endDateOnly = new Date(
                      endDate.getFullYear(),
                      endDate.getMonth(),
                      endDate.getDate(),
                    );

                    if (
                      dateOnly.getTime() === startDateOnly.getTime() &&
                      startCol === -1
                    ) {
                      startCol = dateIndex;
                    }
                    if (dateOnly.getTime() === endDateOnly.getTime()) {
                      endCol = dateIndex;
                    }
                  });

                  if (startCol === -1 && endCol === -1) return null;

                  // 범위를 벗어난 경우 조정
                  if (startCol === -1) startCol = 0; // 시작일이 범위 전이면 첫 번째 칸부터
                  if (endCol === -1) endCol = 11; // 종료일이 범위 후면 마지막 칸까지

                  const width = endCol - startCol + 1;
                  const leftOffset = startCol;

                  return (
                    <div
                      key={`${calendarId}-${index}`}
                      className={`absolute flex h-6 items-center justify-center truncate rounded-sm ${color[type]} px-4 text-xs font-medium text-white opacity-70`}
                      style={{
                        left: `${(leftOffset * 100) / 12}%`,
                        width: `${(width * 100) / 12}%`,
                        top: `${index * 28}px`,
                      }}
                      title={title}
                    >
                      <p className="max-w-full select-none overflow-hidden text-ellipsis">
                        {title}
                      </p>
                    </div>
                  );
                },
              )}
            </div>
            <div className="flex flex-col gap-2">
              {events.map(({ endAt, title }, index) => {
                if (index >= 3) return;
                const eventDate = new Date(+endAt);
                const todayOnly = new Date(
                  today.getFullYear(),
                  today.getMonth(),
                  today.getDate(),
                );
                const eventDateOnly = new Date(
                  eventDate.getFullYear(),
                  eventDate.getMonth(),
                  eventDate.getDate(),
                );
                const daysUntil = Math.floor(
                  (eventDateOnly.getTime() - todayOnly.getTime()) /
                    (1000 * 60 * 60 * 24),
                );

                return (
                  <div
                    key={`${eventDate.getDate()}-${title}-${index}`}
                    className="flex gap-4 rounded-xl bg-gray-10 px-4 py-2"
                  >
                    <span className="font-semibold">
                      {daysUntil === 0
                        ? "[D-day]"
                        : daysUntil > 0
                        ? `[D-${daysUntil}]`
                        : `[D+${Math.abs(daysUntil)}]`}
                    </span>
                    <span>{title}</span>
                  </div>
                );
              })}
            </div>
            <Link href="/calendar">
              <p className="mt-2 text-end text-sky-600">
                달력 자세히 보기 &rarr;
              </p>
            </Link>
          </div>
        </FadeSlideIn>
      </section>
    </>
  );
};

export default EventCalender;
