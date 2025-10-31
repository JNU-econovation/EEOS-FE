"use client";

import ProgramHeaderSkeleton from "../loader/ProgramHeader.skeleton";
import EditAndDeleteButton from "./EditAndDeleteButton";
import TabItem from "@/components/common/tabs/tab/TabItem";
import Title from "@/components/common/Title/Title";
import PROGRAM from "@/constants/PROGRAM";
import { useGetProgramByProgramId } from "@/hooks/query/useProgramQuery";
import { useGetAccessType } from "@/hooks/useAccess";
import { useGetProgramId } from "@/hooks/usePrograms";
import { formatTimestamp } from "@/utils/convert";

const DEADLINE_TEXT = "행사일정 : ";

const ProgramHeaderSection = () => {
  const isAbleToEdit = useGetAccessType() === "admin";
  const programId = useGetProgramId();

  const {
    data: programData,
    isLoading,
    isError,
  } = useGetProgramByProgramId(programId, isAbleToEdit);

  if (isLoading) return <ProgramHeaderSkeleton />;
  if (isError) return <div>에러 발생</div>;

  const { accessRight, category, deadLine, title } = programData;

  const categoryText = PROGRAM.CATEGORY_TAB[category]?.text ?? "기타";

  return (
    <section className="space-y-4 border-b-2 py-4">
      <TabItem color="yellow" size="sm" text={categoryText} rounded />
      <Title text={title} />
      <div className="flex justify-between">
        <p className="sm:text-lg">
          {DEADLINE_TEXT + formatTimestamp(deadLine, "full")}
        </p>
        {accessRight === "edit" && <EditAndDeleteButton />}
      </div>
    </section>
  );
};
export default ProgramHeaderSection;
