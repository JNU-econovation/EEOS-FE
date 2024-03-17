import React, { Dispatch, PropsWithChildren, SetStateAction } from "react";
import LabeledInput from "@/components/common/form/LabeledInput";
import FORM_INFO from "@/constants/FORM_INFO";
import { convertText } from "@/utils/convert";

interface ProgramTitleInputProps {
  title: string;
  setTitle: Dispatch<SetStateAction<string>>;
  prefix?: string;
}

export const ProgramTitleInput = ({
  title,
  setTitle,
  prefix,
  children,
}: PropsWithChildren<ProgramTitleInputProps>) => {
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (title.includes(FORM_INFO.DEMAND_PREFIX)) {
      const newTitle = convertText(title, FORM_INFO.DEMAND_PREFIX);
      setTitle(newTitle);
      return;
    }
    setTitle(e.target.value);
  };
  return (
    <div className="relative">
      {children}
      <LabeledInput
        id={FORM_INFO.PROGRAM.TITLE.id}
        type={FORM_INFO.PROGRAM.TITLE.type}
        label={FORM_INFO.PROGRAM.TITLE.label}
        placeholder={FORM_INFO.PROGRAM.TITLE.placeholder}
        value={convertText(title, FORM_INFO.DEMAND_PREFIX)}
        onChange={handleTitleChange}
        prefix={prefix}
      />
    </div>
  );
};
