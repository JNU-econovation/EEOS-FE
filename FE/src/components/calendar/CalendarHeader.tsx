interface CalendarHeaderProps {
  currentDate: Date;
  onNavigateMonth: (direction: "prev" | "next") => void;
  onGoToToday: () => void;
}

export function CalendarHeader({
  currentDate,
  onNavigateMonth,
  onGoToToday,
}: CalendarHeaderProps) {
  return (
    <>
      <div className="p-4">
        <h1 className="text-center text-3xl font-bold text-gray-900">
          에코노 달력
        </h1>
      </div>
      <div className="flex items-center justify-between border-b border-gray-200 p-4">
        <div className="flex items-center space-x-4">
          <h2 className="text-2xl font-semibold text-gray-900">
            {currentDate.toLocaleDateString("ko-KR", {
              year: "numeric",
              month: "long",
            })}
          </h2>
          <div className="flex space-x-2">
            <button
              onClick={() => onNavigateMonth("prev")}
              className="rounded-md p-2 transition-colors hover:bg-gray-100"
            >
              ←
            </button>
            <button
              onClick={onGoToToday}
              className="rounded-md border border-gray-300 px-3 py-1 text-sm transition-colors hover:bg-gray-50"
            >
              오늘
            </button>
            <button
              onClick={() => onNavigateMonth("next")}
              className="rounded-md p-2 transition-colors hover:bg-gray-100"
            >
              →
            </button>
          </div>
        </div>
      </div>
    </>
  );
}