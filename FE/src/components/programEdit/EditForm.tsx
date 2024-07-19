"use client";

import { useEffect } from "react";
import { toast } from "react-toastify";
import FormBtn from "../common/form/FormBtn";
import CreateCategory from "../common/form/program/CreateCategory";
import ProgramDate from "../common/form/program/ProgramDate";
import ProgramTitle from "../common/form/program/ProgramTitle";
import LoadingSpinner from "../common/LoadingSpinner";
import MarkdownEditor from "../common/markdown/MarkdownEditor";
import ProgramGithubLinkInput from "../programCreate/ProgramGithubLinkInput";
import ProgramTeamList from "../programCreate/ProgramTeamList";
import EditMemberAttendStateTable from "./EditMemberAttendStateTable";
import FORM_INFO from "@/constants/FORM_INFO";
import {
  useGetProgramByProgramId,
  useUpdateProgram,
} from "@/hooks/query/useProgramQuery";
import { useMemberMap } from "@/hooks/useMemberForm";
import useProgramFormData, {
  ProgramFormDataState,
} from "@/hooks/useProgramFormData";
import { ProgramCategory } from "@/types/program";

const initialState: ProgramFormDataState = {
  title: "",
  deadLine: new Date().getTime().toString(),
  type: "notification",
  category: "weekly",
  content: "",
  programGithubUrl: "",
};

interface EditFormProps {
  programId: number;
}
const EditForm = ({ programId }: EditFormProps) => {
  const { members, updateMembers } = useMemberMap();

  const { data: programInfo, isLoading: isProgrmaLoading } =
    useGetProgramByProgramId(+programId, true);
  const {
    title,
    deadLine,
    content,
    category,
    setCategory,
    setContent,
    type,
    reset: handleReset,
    programGithubUrl,
    handleGithubUrlChange,
    setTitle,
    isDemand,
    handleChangeType,
    handleTeamListChange,
    setDeadLine,
    setData,
    teams,
  } = useProgramFormData(initialState);

  useEffect(() => {
    if (isLoading) return;
    setData(programInfo);
  }, [programInfo]);

  const { mutate: updateProgramMutate } = useUpdateProgram({
    programId: +programId,
    body: {
      title,
      deadLine,
      content,
      category,
      type,
      teams,
      members: Array.from(
        members,
        ([memberId, { beforeAttendStatus, afterAttendStatus }]) => ({
          memberId,
          beforeAttendStatus,
          afterAttendStatus,
        }),
      ),
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!title || !content || !deadLine || !category || !type) {
      toast.error("모든 항목을 입력해주세요.");
      return;
    }
    updateProgramMutate();
  };

  const isLoading = isProgrmaLoading || !programInfo;

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
          programId={programId}
          selectedTeamList={teams}
          handleTeamListChange={handleTeamListChange}
        />
      </div>
      <EditMemberAttendStateTable
        programId={programId}
        setMembers={updateMembers}
      />
      <FormBtn
        submitText={FORM_INFO.SUBMIT_TEXT["create"]}
        formReset={handleReset}
      />
    </form>
  );
};

export default EditForm;
