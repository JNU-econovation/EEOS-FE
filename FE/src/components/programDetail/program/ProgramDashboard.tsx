"use client";

import DashboardWrapper from "./DashboardCompound/DashboardWrapper";
import Title from "@/components/common/Title";

interface ProgramDashboardProps {
  programId: number;
  isGuest?: boolean;
}
const ProgramDashboard = ({
  programId,
  isGuest = false,
}: ProgramDashboardProps) => {
  return (
    <DashboardWrapper programId={programId}>
      <Title text="질문 게시판" />
      <div className="mt-8 flex flex-col gap-8">
        <DashboardWrapper.TeamTab />
        <DashboardWrapper.Board isGuest={isGuest} />
        {!isGuest && <DashboardWrapper.Input />}
      </div>
    </DashboardWrapper>
  );
};

export default ProgramDashboard;
