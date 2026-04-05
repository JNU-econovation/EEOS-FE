import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import "./calendar.styles.css";
import { useEffect, useState } from "react";
import Spacing from "../Spacing";

interface CalendarProps {
  date: Date | undefined;
  withTime?: boolean;
  handleDateChange: (date: Date | undefined) => void;
  submitButton?: boolean;
  handleSubmit?: () => void;
}

const Calendar = ({
  date,
  withTime,
  handleDateChange,
  submitButton = false,
  handleSubmit,
}: CalendarProps) => {
  const disabledDays = { before: new Date() };
  const [dateValue, setDateValue] = useState<Date | undefined>(date);

  useEffect(() => handleDateChange(dateValue), [dateValue]);

  // useEffect(() => {
  //   setDateValue(date);
  // }, [date]);

  return (
    <div className="absolute left-0 top-[4.5rem] z-10 rounded-md bg-background p-3 shadow-md">
      <DayPicker
        mode="single"
        selected={dateValue}
        onSelect={(e) => {
          setDateValue(e);
        }}
        disabled={disabledDays}
      />
      {withTime && (
        <div className="flex items-center justify-center gap-2 border-t pt-2">
          <label htmlFor="time-input" className="font-semibold">
            행사 시작 시간 :{" "}
          </label>
          <input
            id="time-input"
            type="time"
            value={
              dateValue &&
              dateValue.getHours().toString().padStart(2, "0") +
                ":" +
                dateValue.getMinutes().toString().padStart(2, "0")
            }
            onChange={(e) => {
              const [hours, minutes] = e.target.value.split(":");
              const newDate = dateValue ? new Date(dateValue) : new Date();
              newDate.setHours(parseInt(hours, 10));
              newDate.setMinutes(parseInt(minutes, 10));
              setDateValue(newDate);
            }}
          />
        </div>
      )}
      <Spacing size={1} unit="rem" direction="vertical" />
      {submitButton && (
        <button
          onClick={() => {
            handleSubmit && handleSubmit();
          }}
          className="mt-2 w-full rounded-md bg-primary px-4 py-2 text-sm font-semibold text-black"
        >
          확인
        </button>
      )}
    </div>
  );
};
export default Calendar;
