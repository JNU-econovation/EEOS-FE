"use client";

import ProgramDetail from "./ProgramDetail";
import ProgramHeader from "./ProgramHeader";
import ProgramInfoLoader from "./ProgramInfo.loader";
import { useGetProgramById } from "@/hooks/query/useProgramQuery";
import { AccessType } from "@/types/access";

interface ProgramInfoProps {
  programId: number;
  AccessType?: AccessType;
}

const ProgramInfo = ({ programId, AccessType }: ProgramInfoProps) => {
  const isAbleToEdit = AccessType === "admin";
  const {
    data: programData,
    isLoading,
    isError,
  } = useGetProgramById(programId, isAbleToEdit);

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
