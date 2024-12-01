"use client";

import MarkdownViewer from "@/components/common/markdown/MarkdownViewer";
import { useGetAccessType } from "@/hooks/useAccess";
import { useGetProgramId } from "@/hooks/usePrograms";
import { useGetProgramByProgramId } from "@/hooks/query/useProgramQuery";
import ProgramDetailSkeleton from "../loader/ProgramDetail.skeleton";

const ProgramDetailSection = () => {
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

  return <MarkdownViewer value={content} />;
};
export default ProgramDetailSection;
