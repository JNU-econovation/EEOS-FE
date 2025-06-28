import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import "./calendar.styles.css";
import { useState } from "react";

interface CalendarProps {
  date: Date | undefined;
  withTime?: boolean;
  handleDateChange: (date: Date | undefined) => void;
}

const Calendar = ({ date, withTime, handleDateChange }: CalendarProps) => {
  const disabledDays = { before: new Date() };

  const [timeValue, setTimeValue] = useState<string>("00:00");

  return (
    <div className="absolute left-0 top-[4.5rem] z-10 rounded-md bg-background p-3 shadow-md">
      <DayPicker
        mode="single"
        selected={date}
        onSelect={(e) => {
          handleDateChange(e);
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
            value={timeValue}
            onChange={(e) => {
              const [hours, minutes] = e.target.value.split(":");
              const newDate = date ? new Date(date) : new Date();
              newDate.setHours(parseInt(hours, 10));
              newDate.setMinutes(parseInt(minutes, 10));
              handleDateChange(newDate);
              setTimeValue(e.target.value);
            }}
          />
        </div>
      )}
    </div>
  );
};
export default Calendar;
