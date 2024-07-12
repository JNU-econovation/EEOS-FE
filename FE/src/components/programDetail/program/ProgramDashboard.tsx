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
      <DashboardWrapper.Form />
    </DashboardWrapper>
  );
};

export default ProgramDashboard;
