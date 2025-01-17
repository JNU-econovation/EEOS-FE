"use client";

import Title from "@/components/common/Title/Title";
import DashboardContent from "./components/DashboardContent";
import DashboardInput from "./components/DashboardInput";
import { useGetProgramId } from "@/hooks/usePrograms";
import TeamsTab from "@/components/feature/detail/Dashboard/TeamsTab";
import { ErrorBoundary } from "react-error-boundary";
import { Suspense } from "react";
import ProgramDashboardSkeleton from "./ProgramDashboard.skeleton";
import DashboardContentSkeleton from "./components/DashboardContent.skeleton";

const ProgramDashboardSection = () => {
  const programId = useGetProgramId();

  return (
    <section>
      {/* TODO: 현재는 로더가 에러 fallback으로 적용되어있음. 적절하게 변경할 필요 */}
      <ErrorBoundary fallback={<ProgramDashboardSkeleton />}>
        <Suspense fallback={<ProgramDashboardSkeleton />}>
          <Title text="질문 게시판" textSize="xl" />
          <div className="mt-4" />
          <TeamsTab programId={programId}>
            {({ teamId, teamName }) => (
              <div className="mt-8 flex flex-col gap-8">
                {/* TODO: 현재는 로더가 에러 fallback으로 적용되어있음. 적절하게 변경할 필요 */}
                <ErrorBoundary fallback={<DashboardContentSkeleton />}>
                  <Suspense fallback={<DashboardContentSkeleton />}>
                    <DashboardContent
                      programId={programId}
                      selectedTeamId={teamId}
                    />
                  </Suspense>
                </ErrorBoundary>
                <DashboardInput
                  programId={programId}
                  selectedTeamId={teamId}
                  selectedTeamName={teamName}
                />
              </div>
            )}
          </TeamsTab>
        </Suspense>
      </ErrorBoundary>
    </section>
  );
};

export default ProgramDashboardSection;
