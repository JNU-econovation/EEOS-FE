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
    <>
      <MarkdownViewer value={content} />
      <ProgramPresentations programId={programId} />
    </>
  );
};
export default ProgramDetail;
