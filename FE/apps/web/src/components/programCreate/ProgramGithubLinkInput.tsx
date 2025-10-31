import { UseFormRegister } from "react-hook-form";
import LabeldInputFiled from "../common/form/input/LabeldInputFiled";
import { ProgramFormDataState } from "../common/form/program/CreateForm";

interface ProgramGithubLinkInputProps {
  register: UseFormRegister<ProgramFormDataState>;
}
const ProgramGithubLinkInput = ({ register }: ProgramGithubLinkInputProps) => {
  return (
    <div>
      <LabeldInputFiled<ProgramFormDataState>
        register={register}
        id="programGithubUrl"
        label="Github Link"
        placeholder="주간 발표 링크 입력하기 (학기/팀/순서 까지의 폴더의 링크를 추가해주세요!)"
        type="text"
        prefix=""
      />
    </div>
  );
};

export default ProgramGithubLinkInput;
