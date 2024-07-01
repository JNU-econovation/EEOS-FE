/**
 * 이 컴포넌트는 하위 호환성을 위하여 남겨둔 레거시 코드입니다. 추후 삭제될 예정입니다.
이 컴포넌트는 "LabeldInputFiled" 컴포넌트로 완전히 대체죌 수 있습니다. 해당 컴포넌트를 사용하고자 한다면, "LabeldInputFiled" 컴포넌트를 사용해주세요.
 */

import React, { Dispatch, PropsWithChildren, SetStateAction } from "react";
import LabeledInput from "../LabeledInput";
import FORM_INFO from "@/constants/FORM_INFO";
import { convertText } from "@/utils/convert";

interface ProgramTitleProps {
  title: string;
  setTitle: Dispatch<SetStateAction<string>>;
  prefix?: string;
}

const ProgramTitle = ({
  title,
  setTitle,
  prefix,
  children,
}: PropsWithChildren<ProgramTitleProps>) => {
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
export default ProgramTitle;
