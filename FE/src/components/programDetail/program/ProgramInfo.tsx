"use client";

import ProgramDetail from "./ProgramDetail";
import ProgramHeader from "./ProgramHeader";
import ProgramInfoLoader from "./ProgramInfo.loader";
// TODO: 기능 구현 이후 삭제하기
import { sendSlackMessage } from "@/apis/program";
import { useGetProgramById } from "@/hooks/query/useProgramQuery";

interface ProgramInfoProps {
  programId: number;
}

const ProgramInfo = ({ programId }: ProgramInfoProps) => {
  const {
    data: programData,
    isLoading,
    isError,
  } = useGetProgramById(programId);

  if (isLoading) return <ProgramInfoLoader />;
  if (isError) return <div>에러 발생</div>;

  return (
    <section className="space-y-8">
      {/* TODO: 기능 구현 이후 삭제하기 */}
      <button onClick={() => sendSlackMessage(+programId)}>
        메시지 보내기
      </button>
      <ProgramHeader data={programData} />
      <ProgramDetail data={programData} />
    </section>
  );
};
export default ProgramInfo;
