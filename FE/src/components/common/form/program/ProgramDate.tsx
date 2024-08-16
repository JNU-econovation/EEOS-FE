"use client";

import { useState } from "react";
import { UseFormGetValues, UseFormSetValue } from "react-hook-form";
import Calendar from "../../Calendar/Calendar";
import LabeledInput from "../LabeledInput";
import { ProgramFormDataState } from "./CreateForm";
import FORM_INFO from "@/constants/FORM_INFO";
import useOutsideRef from "@/hooks/useOutsideRef";
import { formatTimestamp } from "@/utils/convert";

interface ProgramDateProps {
  getValues: UseFormGetValues<ProgramFormDataState>;
  setValue: UseFormSetValue<ProgramFormDataState>;
}

const ProgramDate = ({ getValues, setValue }: ProgramDateProps) => {
  const [openCalender, setOpenCalender] = useState<boolean>(false);
  const calenderRef = useOutsideRef(() => setOpenCalender(false));
  const [date, setDate] = useState<Date | undefined>(
    new Date(parseInt(getValues("deadLine"))) || new Date(),
  );

  const handleDateChange = (date: Date | undefined) => {
    setDate(date);
    setValue(
      "deadLine",
      date?.getTime().toString() || new Date().getTime().toString(),
    );
  };

  const handleCalenderOpen = () => {
    setOpenCalender(true);
  };

  return (
    <div
      onClick={handleCalenderOpen}
      className="relative w-full"
      ref={calenderRef}
    >
      <LabeledInput
        id={FORM_INFO.PROGRAM.DATE.id}
        type={FORM_INFO.PROGRAM.DATE.type}
        label={FORM_INFO.PROGRAM.DATE.label}
        placeholder={FORM_INFO.PROGRAM.DATE.placeholder}
        value={formatTimestamp(getValues("deadLine"))}
      />
      {openCalender && (
        <Calendar
          date={date}
          handleDateChange={(date: Date) => handleDateChange(date)}
        />
      )}
    </div>
  );
};
export default ProgramDate;
