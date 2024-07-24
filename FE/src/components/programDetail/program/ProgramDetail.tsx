"use client";
import { useQueryClient } from "@tanstack/react-query";
import ProgramAttendStatusManageSection from "./ProgramAttendStatusManageSection";
import ProgramDashboard from "./ProgramDashboard";
import ProgramPresentations from "./ProgramPresentations";
import { ProgramInfoDto } from "@/apis/dtos/program.dto";
import MarkdownViewer from "@/components/common/markdown/MarkdownViewer";
import { AccessType } from "@/types/access";

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
  console.log(githubUrl);

  return (
    <div>
      <MarkdownViewer value={content} />
      {isAdmin && <ProgramAttendStatusManageSection programId={programId} />}
      {githubUrl && <ProgramPresentations programId={programId} />}
      <div className="mt-12">
        <ProgramDashboard programId={programId} accessType={accessType} />
      </div>
    </div>
  );
};
export default ProgramDetail;
