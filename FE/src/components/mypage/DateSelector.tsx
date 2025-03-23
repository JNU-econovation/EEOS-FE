import { DateRange, DayPicker } from "react-day-picker";
import { useState } from "react";
import "react-day-picker/dist/style.css";
import "../../components/common/calendar/calendar.styles.css";
import useOutsideRef from "@/hooks/useOutsideRef";

interface Props {
  startDate: number;
  endDate: number;
  setStartDate: React.Dispatch<React.SetStateAction<number>>;
  setEndDate: React.Dispatch<React.SetStateAction<number>>;
}

const formatDate = (timestamp: number): string => {
  if (isNaN(timestamp)) return "";

  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // 월은 0부터 시작하므로 +1
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}.${month}.${day}`;
};

const DateSelector = ({
  startDate,
  endDate,
  setStartDate,
  setEndDate,
}: Props) => {
  const [isCalendarOpened, setIsCalendarOpened] = useState<boolean>(false);
  const [selected, setSelected] = useState<DateRange>({
    from: new Date(startDate),
    to: new Date(endDate),
  });
  const calendarRef = useOutsideRef(() => setIsCalendarOpened(false));

  const handleSelectDate = (newSelected) => {
    setStartDate(newSelected?.from?.getTime() || undefined);
    setEndDate(newSelected?.to?.getTime() || undefined);
    setSelected(newSelected);
  };

  return (
    <div
      className="relative flex w-fit min-w-72 cursor-pointer items-center justify-center gap-3 rounded-lg border border-gray-20 px-6 py-4"
      onClick={() => setIsCalendarOpened((prev) => !prev)}
    >
      <CalendarSVG />
      <div className="grid-[1fr_1rem_1fr] flex-1 font-semibold text-gray-30">
        <span>{`${formatDate(startDate)}`}</span>
        <span>~</span>
        <span>{`${formatDate(endDate)}`}</span>
      </div>
      {isCalendarOpened && (
        <div onClick={(e) => e.stopPropagation()} ref={calendarRef}>
          <DayPicker
            mode="range"
            selected={selected}
            onSelect={handleSelectDate}
            className="absolute left-0 top-full z-10 rounded-md bg-background p-3 shadow-md"
          />
        </div>
      )}
    </div>
  );
};

const CalendarSVG = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6 fill-none stroke-gray-30"
      viewBox="0 0 24 24"
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 4.14111H5C3.89543 4.14111 3 5.03654 3 6.14111V20.1411C3 21.2457 3.89543 22.1411 5 22.1411H19C20.1046 22.1411 21 21.2457 21 20.1411V6.14111C21 5.03654 20.1046 4.14111 19 4.14111Z" />
      <path d="M16 2.14111V6.14111" />
      <path d="M8 2.14111V6.14111" />
      <path d="M3 10.1411H21" />
      <path d="M8 14.1411H8.01" />
      <path d="M12 14.1411H12.01" />
      <path d="M16 14.1411H16.01" />
      <path d="M8 18.1411H8.01" />
      <path d="M12 18.1411H12.01" />
      <path d="M16 18.1411H16.01" />
    </svg>
  );
};

export default DateSelector;
