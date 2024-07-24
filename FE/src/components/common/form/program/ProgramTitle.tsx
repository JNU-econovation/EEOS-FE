import LabeldInputFiled from "../input/LabeldInputFiled";
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

  // 현재 정책상 수요조사는 수정이 불가능하므로 체크박스 클릭시 경고창을 띄워준다.
  // 추후 수정이 가능하게 되면 체크박스를 클릭했을 때 handleChangeDemandType을 호출하도록 수정해야 한다.
  const handleNonAllowDemand = () => {
    handleChangeDemandType;
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
            type="checkbox"
            className="accent-primary"
            checked={isDemand}
            onClick={handleNonAllowDemand}
            onChange={() => {}}
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
