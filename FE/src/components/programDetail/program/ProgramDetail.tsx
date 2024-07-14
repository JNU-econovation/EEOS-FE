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
  const isGuest = accessType === "public";
  const { content } = data;
  return (
    <div>
      <MarkdownViewer value={content} />
      <ProgramPresentations programId={programId} />
      <div className="mt-12">
        <ProgramDashboard programId={programId} isGuest={isGuest} />
      </div>
    </div>
  );
};
export default ProgramDetail;
