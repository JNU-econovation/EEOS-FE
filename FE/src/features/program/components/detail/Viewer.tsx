"use client";

import { ProgramViewerLoader } from "./Viewer.loader";
import { ProgramViewerHeader } from "./ViewerHeader";
import MarkdownViewer from "@/components/common/markdown/MarkdownViewer";
import { useGetProgramById } from "@/features/program";

interface ProgramViewerProps {
  programId: number;
}

export const ProgramViewer = ({ programId }: ProgramViewerProps) => {
  const {
    data: programData,
    isLoading,
    isError,
  } = useGetProgramById(programId);

  if (isLoading) return <ProgramViewerLoader />;
  if (isError) return <div>에러 발생</div>;

  const { content } = programData;

  return (
    <section className="space-y-8">
      <ProgramViewerHeader data={programData} />
      <MarkdownViewer value={content} />;
    </section>
  );
};
