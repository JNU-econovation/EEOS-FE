"use client";

import { createContext, useState } from "react";
import { useTeamQuery } from "../../../../hooks/query/useTeamQuery";
import Board from "./Board";
import Input from "./Form";
import TeamTab from "./TeamTab";
import Title from "@/components/common/Title";

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
        // name,
      }}
    >
      <Title text="질문 게시판" />
      {children}
    </DashboardContext.Provider>
  );
};

DashboardWrapper.TeamTab = TeamTab;
DashboardWrapper.Board = Board;
DashboardWrapper.Input = Input;

export default DashboardWrapper;
