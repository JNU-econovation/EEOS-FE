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
      <span>처음 보이는 링크는 가장 최근에 입력한 깃허브 링크에요!</span>
    </div>
  );
};

export default ProgramGithubLinkInput;
