import { UseFormRegister } from "react-hook-form";
import LabeldInputFiled from "../input/LabeldInputFiled";
import { ProgramFormDataState } from "./CreateForm";
import FORM_INFO from "@/constants/FORM_INFO";
import { FormType } from "@/types/form";

interface ProgramTitleProps {
  formType: FormType;
  prefix?: string;
  isDemand: boolean;
  register: UseFormRegister<ProgramFormDataState>;
}

const ProgramTitle = ({
  register,
  prefix,
  isDemand,
  formType,
}: ProgramTitleProps) => {
  const demandCheckBoxDisabled = formType === "edit";

  // 현재 정책상 수요조사는 수정이 불가능하므로 체크박스 클릭시 경고창을 띄워준다.
  const handleNonAllowDemand = () => {
    alert("현재는 사용할 수 없는 기능입니다.");
  };

  return (
    <div className="relative">
      {!demandCheckBoxDisabled && (
        <div className="absolute right-0 top-0 flex gap-2">
          <label className="select-none text-sm font-bold" htmlFor="demand">
            수요조사 등록하기
          </label>
          <input
            // {...register("isDemand")} // 현재 정책상 수요조사는 수정이 불가능하므로 체크박스 클릭시 경고창을 띄워준다.
            type="checkbox"
            className="accent-primary"
            checked={isDemand}
            onChange={handleNonAllowDemand}
            id="demand"
          />
        </div>
      )}
      <LabeldInputFiled<ProgramFormDataState>
        id={FORM_INFO.PROGRAM.TITLE.id}
        type={FORM_INFO.PROGRAM.TITLE.type}
        label={FORM_INFO.PROGRAM.TITLE.label}
        placeholder={FORM_INFO.PROGRAM.TITLE.placeholder}
        prefix={prefix}
        register={register}
      />
    </div>
  );
};

export default ProgramTitle;
