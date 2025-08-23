"use client";

import Link from "next/link";

const calendars = [
  {
    calendarId: 1,
    writer: "00기 EEOS",
    title: "해커톤",
    startAt: "1756507200000", // 2025-08-23
    endAt: "1756766400000", // 2025-08-26 (4일간)
    type: "event",
    url: "https://slack.com...",
  },
  {
    calendarId: 2,
    writer: "00기 EEOS",
    title: "주간발표",
    startAt: "1756852800000", // 2025-08-27
    endAt: "1756852800000", // 2025-08-27 (1일)
    type: "weekly_presentation",
    url: "https://slack.com...",
  },
  {
    calendarId: 3,
    writer: "00기 EEOS",
    title: "스터디",
    startAt: "1756939200000", // 2025-08-28
    endAt: "1757198400000", // 2025-08-31 (3일간)
    type: "ect",
    url: "https://slack.com...",
  },
];

const numberToDay = (nbr: number) => {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] as const;
  const day = nbr % days.length;
  return days[day];
};

const color = {
  event: "bg-blue-500",
  weekly_presentation: "bg-red-500",
  ect: "bg-green-500",
};

const EventCalender = () => {
  const today = new Date();
  const date = today.getDate();

  const calendarDates = new Array(12)
    .fill(0)
    .map((_, i) => new Date(today.getFullYear(), today.getMonth(), date + i));

  const uniqueEvents = calendars.reduce(
    (acc, calendar) => {
      const exists = acc.find(
        (item) => item.calendarId === calendar.calendarId,
      );
      if (!exists) {
        acc.push(calendar);
      }
      return acc;
    },
    [] as typeof calendars,
  );

  return (
    <section className="absolute bottom-32 right-20 rounded-xl bg-white p-4 shadow-2xl">
      <div className="relative">
        <div className="mb-2 grid grid-cols-12 divide-x divide-gray-200 border-b">
          {calendarDates.map((date, index) => (
            <div key={index} className="flex flex-col items-center px-2 pb-2">
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
          style={{ height: `${uniqueEvents.length * 28 + 10}px` }}
        >
          {uniqueEvents.map((calendar, index) => {
            const startDate = new Date(parseInt(calendar.startAt));
            const endDate = new Date(parseInt(calendar.endAt));

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

            if (startCol === -1 || endCol === -1) return null;

            const width = endCol - startCol + 1;
            const leftOffset = startCol;

            return (
              <div
                key={`${calendar.calendarId}-${index}`}
                className={`absolute flex h-6 items-center justify-center truncate rounded-sm ${
                  color[calendar.type]
                } px-4 text-xs font-medium text-white opacity-70`}
                style={{
                  left: `${(leftOffset * 100) / 12}%`,
                  width: `${(width * 100) / 12}%`,
                  top: `${index * 28}px`,
                }}
                title={calendar.title}
              >
                <p className="max-w-full select-none overflow-hidden text-ellipsis">
                  {calendar.title}
                </p>
              </div>
            );
          })}
        </div>
        <div className="flex flex-col gap-2">
          {calendars.map(({ endAt, title }, index) => {
            if (index >= 3) return;
            const eventDate = new Date(parseInt(endAt));
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
            const daysUntil = Math.ceil(
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
          <p className="mt-2 text-end text-sky-600">달력 자세히 보기 &rarr;</p>
        </Link>
      </div>
    </section>
  );
};

export default EventCalender;
