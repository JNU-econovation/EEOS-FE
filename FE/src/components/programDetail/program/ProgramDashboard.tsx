"use client";
import DashboardWrapper from "./DashboardCompound/DashboardWrapper";

interface ProgramDashboardProps {
  programId: number;
}
const ProgramDashboard = ({ programId }: ProgramDashboardProps) => {
  return (
    <DashboardWrapper programId={programId}>
      <DashboardWrapper.TeamTab />
      <DashboardWrapper.Board />
      <DashboardWrapper.Input />
    </DashboardWrapper>
  );
};

export default ProgramDashboard;
