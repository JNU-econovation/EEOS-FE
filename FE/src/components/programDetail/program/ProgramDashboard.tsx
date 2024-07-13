"use client";

import DashboardWrapper from "./DashboardCompound/DashboardWrapper";
import Title from "@/components/common/Title";

interface ProgramDashboardProps {
  programId: number;
}
const ProgramDashboard = ({ programId }: ProgramDashboardProps) => {
  return (
    <DashboardWrapper programId={programId}>
      <Title text="질문 게시판" />
      <div className="mt-8">
        <DashboardWrapper.TeamTab />
      </div>
      <div className="mt-8">
        <DashboardWrapper.Board />
      </div>
      <div className="mt-8">
        <DashboardWrapper.Input />
      </div>
    </DashboardWrapper>
  );
};

export default ProgramDashboard;
