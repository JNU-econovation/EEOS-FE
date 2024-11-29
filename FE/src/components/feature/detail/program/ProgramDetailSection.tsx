"use client";

import { useQueryClient } from "@tanstack/react-query";
import ProgramAttendStatusManageSection from "./ProgramAttendStatusManageSection";
import ProgramPresentations from "../ProgramPresentations";
import MarkdownViewer from "@/components/common/markdown/MarkdownViewer";
import ProgramDashboardSection from "../Dashboard/ProgramDashboardSection";
import { useGetAccessType } from "@/hooks/useAccess";
import { useGetProgramId } from "@/hooks/usePrograms";
import { useGetProgramByProgramId } from "@/hooks/query/useProgramQuery";
import ProgramDetailSkeleton from "../loader/ProgramDetail.skeleton";

const ProgramDetailSection = () => {
  const queryClient = useQueryClient();

  const accessType = useGetAccessType();
  const isAdmin = accessType === "admin";
  const isGuest = accessType === "public";

  const isAbleToEdit = useGetAccessType() === "admin";
  const programId = useGetProgramId();

  const {
    data: programData,
    isLoading,
    isError,
  } = useGetProgramByProgramId(programId, isAbleToEdit);

  if (isLoading) return <ProgramDetailSkeleton />;
  if (isError) return <div>에러 발생</div>;

  const { content } = programData;

  const githubUrl = queryClient.getQueryData(["githubUrl", programId]);

  return (
    <div>
      <MarkdownViewer value={content} />
      {isAdmin && <ProgramAttendStatusManageSection programId={programId} />}
      {githubUrl && <ProgramPresentations programId={programId} />}
      <div className="mt-12">
        {isGuest ? (
          <div>로그인 후 이용해주세요.</div>
        ) : (
          <ProgramDashboardSection programId={programId} />
        )}
      </div>
    </div>
  );
};
export default ProgramDetailSection;
