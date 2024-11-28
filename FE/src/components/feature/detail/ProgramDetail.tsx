"use client";

import { useQueryClient } from "@tanstack/react-query";
import ProgramAttendStatusManageSection from "../../programDetail/program/ProgramAttendStatusManageSection";
import ProgramPresentations from "./ProgramPresentations";
import { ProgramInfoDto } from "@/apis/dtos/program.dto";
import MarkdownViewer from "@/components/common/markdown/MarkdownViewer";
import ProgramDashboardSection from "./Dashboard/ProgramDashboardSection";
import { useGetAccessType } from "@/hooks/useAccess";

interface ProgramDetailProps {
  data: ProgramInfoDto;
  programId: number;
}

const ProgramDetail = ({ data, programId }: ProgramDetailProps) => {
  const accessType = useGetAccessType();
  const isAdmin = accessType === "admin";

  const { content } = data;

  const queryClient = useQueryClient();
  const githubUrl = queryClient.getQueryData(["githubUrl", programId]);

  return (
    <div>
      <MarkdownViewer value={content} />
      {isAdmin && <ProgramAttendStatusManageSection programId={programId} />}
      {githubUrl && <ProgramPresentations programId={programId} />}
      <div className="mt-12">
        <ProgramDashboardSection programId={programId} />
      </div>
    </div>
  );
};
export default ProgramDetail;
