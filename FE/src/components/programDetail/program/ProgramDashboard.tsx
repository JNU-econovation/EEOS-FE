"use client";

import DashboardWrapper from "./DashboardCompound/DashboardWrapper";
import Title from "@/components/common/Title";
import { AccessType } from "@/types/access";

interface ProgramDashboardProps {
  programId: number;
  accessType: AccessType;
}
const ProgramDashboard = ({ programId, accessType }: ProgramDashboardProps) => {
  const isGuest = accessType === "public";
  return (
    <DashboardWrapper programId={programId} accessType={accessType}>
      <Title text="질문 게시판" />
      <div className="mt-8 flex flex-col gap-8">
        <DashboardWrapper.TeamTab />
        <DashboardWrapper.Board />
        {!isGuest && <DashboardWrapper.Input />}
      </div>
    </DashboardWrapper>
  );
};

export default ProgramDashboard;
