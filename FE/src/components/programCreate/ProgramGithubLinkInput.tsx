import LabeldInputFiled from "../common/form/input/LabeldInputFiled";

interface ProgramGithubLinkInputProps {
  programGithubUrl: string;
  handleGithubUrlChange: (url: string) => void;
}
const ProgramGithubLinkInput = ({
  programGithubUrl,
  handleGithubUrlChange,
}: ProgramGithubLinkInputProps) => {
  return (
    <div>
      <LabeldInputFiled
        id="githubLink"
        label="Github Link"
        placeholder="주간 발표 링크 입력하기 (학기/팀/순서 까지의 폴더의 링크를 추가해주세요!)"
        type="text"
        value={programGithubUrl}
        onChange={handleGithubUrlChange}
        prefix=""
      />
    </div>
  );
};

export default ProgramGithubLinkInput;
