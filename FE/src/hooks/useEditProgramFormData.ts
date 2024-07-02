//FIXME: 책임별 분리 필요
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  useGetProgramByProgramId,
  useUpdateProgram,
} from "./query/useProgramQuery";
import useProgramFormData, { ProgramFormDataState } from "./useProgramFormData";
import { AttendStatus } from "@/types/member";

export interface Members {
  beforeAttendStatus: AttendStatus;
  afterAttendStatus: AttendStatus;
}

const initialState: ProgramFormDataState = {
  title: "",
  deadLine: new Date().getTime().toString(),
  type: "notification",
  category: "weekly",
  content: "",
  programGithubUrl: "",
};

const useEditProgramFormData = (programId: number) => {
  const { data: programInfo, isLoading } = useGetProgramByProgramId(
    +programId,
    true,
  );
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

  const [members, setMembers] = useState<Map<number, Members>>(new Map());

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

  const updateMembers = (
    memberId: number,
    before: AttendStatus,
    after: AttendStatus,
  ) => {
    const newMembers = new Map<number, Members>(members);

    if (before === after) {
      newMembers.delete(memberId);
    }
    if (before !== after) {
      newMembers.set(memberId, {
        beforeAttendStatus: before,
        afterAttendStatus: after,
      });
    }
    setMembers(newMembers);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!title || !content || !deadLine || !category || !type) {
      toast.error("모든 항목을 입력해주세요.");
      return;
    }
    updateProgramMutate();
  };

  const isLoadingToGetData = isLoading || !programInfo;

  return {
    isLoading: isLoadingToGetData,
    handleSubmit,
    title,
    category,
    deadLine,
    content,
    teams,
    handleTeamListChange,
    handleReset,
    programGithubUrl,
    handleGithubUrlChange,
    setTitle,
    isDemand,
    handleChangeType,
    setDeadLine,
    members,
    setCategory,
    updateMembers,
    setContent,
  };
};
export default useEditProgramFormData;
