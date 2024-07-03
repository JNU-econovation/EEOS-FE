"use client";
import FormBtn from "../common/form/FormBtn";
import CreateCategory from "../common/form/program/CreateCategory";
import ProgramDate from "../common/form/program/ProgramDate";
import ProgramTitle from "../common/form/program/ProgramTitle";
import LoadingSpinner from "../common/LoadingSpinner";
import MarkdownEditor from "../common/markdown/MarkdownEditor";
import ProgramGithubLinkInput from "../programCreate/ProgramGithubLinkInput";
import ProgramTeamList from "../programCreate/ProgramTeamList";
import FORM_INFO from "@/constants/FORM_INFO";
import useEditProgramFormData from "@/hooks/useEditProgramFormData";
import { ProgramCategory } from "@/types/program";

interface EditFormProps {
  programId: string;
}
const EditForm = ({ programId }: EditFormProps) => {
  const {
    isLoading,
    category,
    content,
    deadLine,
    isDemand,
    title,
    teams,
    programGithubUrl,
    setContent,
    handleReset,
    handleSubmit,
    handleChangeType,
    handleGithubUrlChange,
    setTitle,
    setCategory,
    setDeadLine,
    handleTeamListChange,
  } = useEditProgramFormData(+programId);

  if (isLoading) return <LoadingSpinner />;

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <ProgramTitle
        title={title}
        handleTitleChange={(title) => setTitle(title)}
        prefix={isDemand && FORM_INFO.DEMAND_PREFIX}
        formType="create"
        isDemand={isDemand}
        handleChangeDemandType={handleChangeType}
      />
      <div className="flex flex-col items-end gap-8 sm:flex-row">
        <ProgramDate
          programDate={deadLine}
          setProgramDate={(date: string) => setDeadLine(date)}
        />
        <CreateCategory
          selectedCategory={category}
          setCategory={(category: ProgramCategory) => setCategory(category)}
        />
      </div>
      <MarkdownEditor
        id={FORM_INFO.PROGRAM.CONTENT.id}
        label={FORM_INFO.PROGRAM.CONTENT.label}
        placeholder={FORM_INFO.PROGRAM.CONTENT.placeholder}
        value={content}
        onChange={(v) => setContent(v)}
      />
      <div className="my-4 flex flex-col gap-4">
        <ProgramGithubLinkInput
          programGithubUrl={programGithubUrl}
          handleGithubUrlChange={handleGithubUrlChange}
        />
        <ProgramTeamList
          programId={+programId}
          selectedTeamList={teams}
          handleTeamListChange={handleTeamListChange}
        />
      </div>
      {/* 멤버 수정 관련 컴포넌트 들어가야 함 */}
      <FormBtn
        submitText={FORM_INFO.SUBMIT_TEXT["create"]}
        formReset={handleReset}
      />
    </form>
  );
};

export default EditForm;
