"use client";

import Title from "@/components/common/Title/Title";
import TeamsTab from "@/components/feature/detail/Dashboard/TeamsTab";
import { Hyperlink } from "@/components/icons";
import { useGetProgramId } from "@/hooks/usePrograms";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import ProgramDashboardSkeleton from "./ProgramDashboard.skeleton";
import DashboardContent from "./components/DashboardContent";
import DashboardContentSkeleton from "./components/DashboardContentSkelton";
import DashboardInput from "./components/DashboardInput";

const ProgramDashboardSection = () => {
  const programId = useGetProgramId();

  return (
    <section>
      {/* TODO: 현재는 로더가 에러 fallback으로 적용되어있음. 적절하게 변경할 필요 */}
      <ErrorBoundary fallback={<ProgramDashboardSkeleton />}>
        <Suspense fallback={<ProgramDashboardSkeleton />}>
          <div className="flex items-center gap-4">
            <Title text="질문 게시판" textSize="xl" />
            <div className="flex items-center gap-1 text-sm text-gray-30">
              <span>링크(</span>
              <Hyperlink />
              <span>) 를 클릭하여 발표자료를 확인하세요.</span>
            </div>
          </div>
          <div className="mt-8" />
          <TeamsTab programId={programId}>
            {({ teamId, teamName }) => (
              <>
                <DashboardInput
                  programId={programId}
                  selectedTeamId={teamId}
                  selectedTeamName={teamName}
                />
                {/* TODO: 현재는 로더가 에러 fallback으로 적용되어있음. 적절하게 변경할 필요 */}
                <ErrorBoundary fallback={<DashboardContentSkeleton />}>
                  <Suspense fallback={<DashboardContentSkeleton />}>
                    <DashboardContent
                      programId={programId}
                      selectedTeamId={teamId}
                    />
                  </Suspense>
                </ErrorBoundary>
              </>
            )}
          </TeamsTab>
        </Suspense>
      </ErrorBoundary>
    </section>
  );
};

export default ProgramDashboardSection;
