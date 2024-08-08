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
  return (
    <div className="relative">
      {!demandCheckBoxDisabled && (
        <div className="absolute right-0 top-0 flex gap-2">
          <label className="select-none text-sm font-bold" htmlFor="demand">
            수요조사 등록하기
          </label>
          <input
            {...register("isDemand")}
            type="checkbox"
            className="accent-primary"
            checked={isDemand}
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
