import { useEffect } from "react";
import { toast } from "react-toastify";
import {
  useGetProgramByProgramId,
  useUpdateProgram,
} from "./query/useProgramQuery";
import { useMemberMap } from "./useMemberForm";
import useProgramFormData, { ProgramFormDataState } from "./useProgramFormData";

const initialState: ProgramFormDataState = {
  title: "",
  deadLine: new Date().getTime().toString(),
  type: "notification",
  category: "weekly",
  content: "",
  programGithubUrl: "",
};

const useEditProgramFormData = (programId: number) => {
  const { members, updateMembers } = useMemberMap();

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
