import LabeldInputFiled from "@/components/common/form/LabeldInputFiled";
import FORM_INFO from "@/constants/FORM_INFO";
import { FormType } from "@/types/form";
import { convertText } from "@/utils/convert";

interface ProgramTitleProps {
  title: string;
  formType: FormType;
  handleTitleChange: (title: string) => void;
  prefix?: string;
  isDemand: boolean;
  handleChangeDemandType: () => void;
}

const ProgramTitle = ({
  title,
  handleTitleChange,
  prefix,
  isDemand,
  formType,
  handleChangeDemandType,
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
            type="checkbox"
            className="accent-primary"
            checked={isDemand}
            onClick={handleChangeDemandType}
            id="demand"
          />
        </div>
      )}
      <LabeldInputFiled
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
