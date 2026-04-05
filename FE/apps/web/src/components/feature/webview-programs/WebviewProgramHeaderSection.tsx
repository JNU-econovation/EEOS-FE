"use client";

import Spacing from "@/components/common/Spacing";
import { ArrowRight } from "@/components/icons";
import { ArrowLeft } from "@/components/icons/items/ArrotLeft";
import PROGRAM from "@/constants/PROGRAM";
import { useGetProgramByProgramId } from "@/hooks/query/useProgramQuery";
import { useGetProgramId } from "@/hooks/usePrograms";
import { useRouter } from "next/navigation";

function formatDeadlineText(deadLine: string) {
  const month = new Date(parseInt(deadLine)).getMonth() + 1;
  const date = new Date(parseInt(deadLine)).getDate();
  const dayOfWeek = new Date(parseInt(deadLine)).getDay();
  const hours = new Date(parseInt(deadLine)).getHours();
  const minutes = new Date(parseInt(deadLine)).getMinutes();

  const dayOfWeekText = ["일", "월", "화", "수", "목", "금", "토"][dayOfWeek];

  return `${month}월 ${date}일 (${dayOfWeekText}) ${hours}:${minutes}`;
}

const WebviewProgramHeaderSection = () => {
  const programId = useGetProgramId();
  const router = useRouter();

  const {
    data: programData,
    isLoading,
    isError,
  } = useGetProgramByProgramId(programId, false);

  // if (isLoading) return <ProgramHeaderSkeleton />;
  if (isLoading) return null;
  if (isError) return <div>에러 발생</div>;

  const { deadLine, title, programStatus } = programData;

  return (
    <section className="sticky top-0 z-10 rounded-b-2xl border-b bg-white pt-[4.5rem]">
      <div className="relative">
        <button
          className="absolute left-5 top-1/2 -translate-y-1/2"
          onClick={() => router.back()}
        >
          <ArrowLeft />
        </button>
        <div className="relative mx-auto w-fit text-xl font-bold">
          <p>{title}</p>
          <div className="absolute -right-2 top-0 size-[5px] rounded-full bg-[#14ae5c]" />
        </div>
      </div>
      <p className="text-center sm:text-lg">{formatDeadlineText(deadLine)}</p>
      <Spacing size={18} direction="vertical" unit="px" />
    </section>
  );
};

export default WebviewProgramHeaderSection;
