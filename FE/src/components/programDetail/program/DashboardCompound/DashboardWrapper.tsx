"use client";

import { createContext, useState } from "react";
import { useTeamQuery } from "../../../../hooks/query/useTeamQuery";
import Board from "./Board";
import Input from "./Form";
import TeamTab from "./TeamTab";

export const DashboardContext = createContext(null);

interface DashboardContextValue {
  programId: number;
  children: React.ReactNode;
}
const DashboardWrapper = ({ programId, children }: DashboardContextValue) => {
  const { data, isLoading } = useTeamQuery(programId);
  const { teams } = data || { teams: [] };
  const [selectedTeamId, setSelectedTeamId] = useState<number>();
  const [questionInput, setQuestionInput] = useState<string>("");
  const [parentsCommentId, setParentsCommentId] = useState<number>(-1);
  const [selectedCommentContent, setSelectedCommentContent] =
    useState<string>("");

  return (
    <DashboardContext.Provider
      value={{
        programId,
        teams,
        isLoading,
        selectedTeamId,
        setSelectedTeamId,
        questionInput,
        setQuestionInput,
        parentsCommentId,
        setParentsCommentId,
        selectedCommentContent,
        setSelectedCommentContent,
        // name,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

DashboardWrapper.TeamTab = TeamTab;
DashboardWrapper.Board = Board;
DashboardWrapper.Input = Input;

export default DashboardWrapper;
