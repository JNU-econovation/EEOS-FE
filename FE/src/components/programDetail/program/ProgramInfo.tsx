"use client";

import ProgramDetail from "./ProgramDetail";
import ProgramHeader from "./ProgramHeader";
import ProgramInfoLoader from "./ProgramInfo.loader";
import { useGetProgramById } from "@/hooks/query/useProgramQuery";

interface ProgramInfoProps {
  programId: number;
  isLoggedIn: boolean;
}

const ProgramInfo = ({ programId, isLoggedIn }: ProgramInfoProps) => {
  const {
    data: programData,
    isLoading,
    isError,
  } = useGetProgramById(programId, isLoggedIn);

  if (isLoading) return <ProgramInfoLoader />;
  if (isError) return <div>에러 발생</div>;

  return (
    <section className="space-y-8">
      <ProgramHeader data={programData} />
      <ProgramDetail data={programData} />
    </section>
  );
};
export default ProgramInfo;
