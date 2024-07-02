"use client";

import Participant from "../../../programCreate/Participant";
import CreateCategory from "./CreateCategory";
import ProgramTitle from "./ProgramTitle";
import FormBtn from "@/components/common/form/FormBtn";
import ProgramDate from "@/components/common/form/program/ProgramDate";
import MarkdownEditor from "@/components/common/markdown/MarkdownEditor";
import ProgramGithubLinkInput from "@/components/programCreate/ProgramGithubLinkInput";
import ProgramTeamList from "@/components/programCreate/ProgramTeamList";
import FORM_INFO from "@/constants/FORM_INFO";
import useCreateProgramFormData from "@/hooks/useCreateProgramFormData";
import { ProgramCategory } from "@/types/program";

const CreateForm = () => {
  const {
    title,
    content,
    members,
    teams,
    isDemand,
    deadLine,
    category,
    programGithubUrl,
    setTitle,
    setContent,
    handleReset,
    setCategory,
    setDeadLine,
    handleSubmit,
    updateMembers,
    updateAllMembers,
    handleChangeType,
    handleTeamListChange,
    handleGithubUrlChange,
  } = useCreateProgramFormData();

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
          selectedTeamList={teams}
          handleTeamListChange={handleTeamListChange}
        />
      </div>
      <Participant
        members={members}
        setMembers={updateMembers}
        onClickHeaderCheckBox={updateAllMembers}
      />
      <FormBtn
        submitText={FORM_INFO.SUBMIT_TEXT["create"]}
        formReset={handleReset}
      />
    </form>
  );
};

export default CreateForm;
