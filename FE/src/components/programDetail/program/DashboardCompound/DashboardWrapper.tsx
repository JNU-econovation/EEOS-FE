"use client";

import { createContext, useMemo, useState } from "react";
import Board from "./Board/Board";
import Input from "./Form";
import TeamTab from "./TeamTab";
import {
  useDeleteQuestion,
  useUpdateQuestion,
} from "@/hooks/query/useQuestion";
import { useTeamQuery } from "@/hooks/query/useTeamQuery";
import { TeamInfo } from "@/types/team";

interface DashboardContextValue {
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
  children: React.ReactNode;
}
const DashboardWrapper = ({ programId, children }: DashboardWrapperProps) => {
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

  const DashBoardValue = useMemo(() => {
    return {
      programValue,
      teamValues,
      commentValues,
      programId,
      children,
    };
  }, [programValue, teamValues, commentValues, programId, children]);

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
