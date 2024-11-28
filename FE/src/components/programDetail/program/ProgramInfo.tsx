"use client";

import ProgramDetail from "../../feature/detail/ProgramDetail";
import ProgramHeader from "./ProgramHeader";
import ProgramInfoLoader from "../../feature/detail/loader/ProgramInfo.loader";
import { useGetProgramByProgramId } from "@/hooks/query/useProgramQuery";
import { AccessType } from "@/types/access";

interface ProgramInfoProps {
  programId: number;
  accessType?: AccessType;
}

const ProgramInfo = ({ programId, accessType }: ProgramInfoProps) => {
  const isAbleToEdit = accessType === "admin";
  const {
    data: programData,
    isLoading,
    isError,
  } = useGetProgramByProgramId(programId, isAbleToEdit);

  if (isLoading) return <ProgramInfoLoader />;
  if (isError) return <div>에러 발생</div>;

  return (
    <section className="space-y-8">
      <ProgramHeader data={programData} />
      <ProgramDetail data={programData} programId={programId} />
    </section>
  );
};
export default ProgramInfo;
