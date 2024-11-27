"use client";
import { useQueryClient } from "@tanstack/react-query";
import ProgramAttendStatusManageSection from "../../programDetail/program/ProgramAttendStatusManageSection";
import ProgramPresentations from "./ProgramPresentations";
import { ProgramInfoDto } from "@/apis/dtos/program.dto";
import MarkdownViewer from "@/components/common/markdown/MarkdownViewer";
import { AccessType } from "@/types/access";
import ProgramDashboardSection from "./Dashboard/ProgramDashboardSection";

interface ProgramDetailProps {
  data: ProgramInfoDto;
  programId: number;
  accessType: AccessType;
}

const ProgramDetail = ({ data, programId, accessType }: ProgramDetailProps) => {
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
