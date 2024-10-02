"use client";

import { createContext, useState } from "react";
import Board from "./Board/Board";
import Input from "./Form";
import TeamTab from "./TeamTab";
import {
  useDeleteQuestion,
  useUpdateQuestion,
} from "@/hooks/query/useQuestionQuery";
import { useTeamQuery } from "@/hooks/query/useTeamQuery";
import { AccessType } from "@/types/access";
import { TeamInfo } from "@/types/team";

interface DashboardContextValue {
  accessType: AccessType;
  programValue: {
    readonly programId: number;
  };
  teamValues: {
    readonly teams: TeamInfo[];
    readonly isLoading: boolean;
    readonly selectedTeamId: number;
    readonly changeSelectedTeamId: (teamId: number) => void;
  };
  commentValues: {
    create: {
      readonly parentsCommentId: number;
      readonly setParentsCommentId: (id: number) => void;
      readonly selectedCommentContent: string;
      readonly changeSelectedCommentContent: (content: string) => void;
    };
    update: {
      readonly updateComment: (question: unknown) => void;
      readonly isUpdateSuccess: boolean;
    };
    delete: {
      readonly deleteComment: (question: unknown) => void;
      readonly isDeleteSuccess: boolean;
    };
  };
  programId: number;
  children: React.ReactNode;
}

export const DashboardContext = createContext<DashboardContextValue>(null);

interface DashboardWrapperProps {
  programId: number;
  accessType: AccessType; //TODO: 현재 accessType에 의존하는 중임. 이는 알지 않아도 되는 정보이므로 추후 수정 필요
  children: React.ReactNode;
}
const DashboardWrapper = ({
  programId,
  accessType,
  children,
}: DashboardWrapperProps) => {
  // teamValues
  const { data, isLoading } = useTeamQuery(programId);
  const { teams } = data || { teams: [] };
  const [selectedTeamId, setSelectedTeamId] = useState<number>();
  const changeSelectedTeamId = (teamId: number) => {
    setSelectedTeamId(teamId);
  };

  // comment
  const [parentsCommentId, setParentsCommentId] = useState<number>(-1);
  const [selectedCommentContent, setSelectedCommentContent] =
    useState<string>("");
  const { mutate: updateComment, isSuccess: isUpdateSuccess } =
    useUpdateQuestion();
  const { mutate: deleteComment, isSuccess: isDeleteSuccess } =
    useDeleteQuestion();

  const changeSelectedCommentContent = (content: string) => {
    setSelectedCommentContent(content);
  };

  if (isLoading) return null;
  if (!data || data.teams.length === 0) return null;

  const programValue = {
    programId,
  };

  const teamValues = {
    teams,
    isLoading,
    selectedTeamId,
    changeSelectedTeamId,
  };

  const commentValues = {
    create: {
      parentsCommentId,
      setParentsCommentId,
      selectedCommentContent,
      changeSelectedCommentContent,
    },
    update: {
      updateComment,
      isUpdateSuccess,
    },
    delete: {
      deleteComment,
      isDeleteSuccess,
    },
  };

  //TODO: useMemo 사용해야함 _ 급하게 임의로 수정함. 이는 의존성 문제 존재하므로 이부분 보기
  // const DashBoardValue = useMemo(() => {
  //   return {
  //     accessType,
  //     programValue,
  //     teamValues,
  //     commentValues,
  //     programId,
  //     children,
  //   };
  // }, [programValue, teamValues, commentValues, programId, children]);

  const DashBoardValue = {
    accessType,
    programValue,
    teamValues,
    commentValues,
    programId,
    children,
  };

  return (
    <DashboardContext.Provider value={DashBoardValue}>
      {children}
    </DashboardContext.Provider>
  );
};

DashboardWrapper.TeamTab = TeamTab;
DashboardWrapper.Board = Board;
DashboardWrapper.Input = Input;

export default DashboardWrapper;
