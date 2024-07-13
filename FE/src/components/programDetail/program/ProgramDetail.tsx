import ProgramDashboard from "./ProgramDashboard";
import ProgramPresentations from "./ProgramPresentations";
import { ProgramInfoDto } from "@/apis/dtos/program.dto";
import MarkdownViewer from "@/components/common/markdown/MarkdownViewer";

interface ProgramDetailProps {
  data: ProgramInfoDto;
  programId: number;
}

const ProgramDetail = ({ data, programId }: ProgramDetailProps) => {
  const { content } = data;
  return (
    <div>
      <MarkdownViewer value={content} />
      <ProgramPresentations programId={programId} />
      <div className="mt-12">
        <ProgramDashboard programId={programId} />
      </div>
    </div>
  );
};
export default ProgramDetail;
