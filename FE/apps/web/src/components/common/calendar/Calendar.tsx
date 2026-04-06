import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import "./calendar.styles.css";
import { useEffect, useState } from "react";
import Spacing from "../Spacing";

/**
 * 캘린더 컴포넌트의 속성 정의
 */
interface CalendarProps {
  /** 현재 선택된 날짜 객체 */
  date: Date | undefined;
  /** 시간 선택(시/분) 기능 활성화 여부 */
  withTime?: boolean;
  /** 날짜 또는 시간이 변경되었을 때 호출되는 콜백 함수 */
  handleDateChange: (date: Date | undefined) => void;
  /** 하단 '확인' 버튼 표시 여부 */
  submitButton?: boolean;
  /** '확인' 버튼 클릭 시 호출되는 콜백 함수 */
  handleSubmit?: () => void;
}

/**
 * 날짜 및 시간을 선택할 수 있는 공통 캘린더 컴포넌트입니다.
 *
 * - `react-day-picker`를 사용하여 날짜 선택 기능을 제공합니다.
 * - 오늘 이전의 날짜는 선택할 수 없도록 비활성화되어 있습니다.
 * - `withTime` 옵션을 통해 시간(HH:mm) 선택 기능을 추가할 수 있습니다.
 * - 절대 위치(absolute)로 배치되어 드롭다운이나 팝업 형태로 사용하기 적합합니다.
 *
 * @component
 */
const Calendar = ({
  date,
  withTime,
  handleDateChange,
  submitButton = false,
  handleSubmit,
}: CalendarProps) => {
  const disabledDays = { before: new Date() };
  const [dateValue, setDateValue] = useState<Date | undefined>(date);

  useEffect(() => handleDateChange(dateValue), [dateValue, handleDateChange]);

  // useEffect(() => {
  //   setDateValue(date);
  // }, [date]);

  return (
    <div className="absolute left-0 top-[4.5rem] z-10 rounded-md bg-background p-3 shadow-md">
      <DayPicker
        mode="single"
        selected={dateValue}
        onSelect={(e) => {
          if (e && dateValue) {
            const newDate = new Date(e);
            newDate.setHours(dateValue.getHours());
            newDate.setMinutes(dateValue.getMinutes());
            newDate.setSeconds(dateValue.getSeconds());
            setDateValue(newDate);
          } else {
            setDateValue(e);
          }
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
          className="mt-2 w-full rounded-md bg-[#222B45] px-4 py-2 text-sm font-semibold text-white"
        >
          확인
        </button>
      )}
    </div>
  );
};
export default Calendar;
