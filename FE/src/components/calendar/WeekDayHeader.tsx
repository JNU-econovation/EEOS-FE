import classNames from "classnames";

export function WeekDayHeader() {
  const weekdays = ["일", "월", "화", "수", "목", "금", "토"];

  return (
    <div className="grid grid-cols-7 border-b border-gray-200">
      {weekdays.map((day, index) => (
        <div
          key={day}
          className={classNames("p-3 text-center text-sm font-medium", {
            "text-red-500": index === 0,
            "text-blue-500": index === 6,
            "text-gray-700": index !== 0 && index !== 6,
          })}
        >
          {day}
        </div>
      ))}
    </div>
  );
}