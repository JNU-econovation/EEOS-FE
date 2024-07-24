// TODO: 리팩토링 필요 : 중복되는 코드 줄이기
// 출석 상태값만 받아오는 API 필요

import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { ProgramInfoDto } from "@/apis/dtos/program.dto";
import StatusToggleItem from "@/components/common/StatusToggleItem";
import Title from "@/components/common/Title";
import API from "@/constants/API";
import { useUpdateProgramAttendMode } from "@/hooks/query/useProgramQuery";
import { ProgramAttendStatus } from "@/types/program";

interface ProgramAttendStatusManageSectionProps {
  programId: number;
}
const ProgramAttendStatusManageSection = ({
  programId,
}: ProgramAttendStatusManageSectionProps) => {
  const queryClient = useQueryClient();
  const {
    mutate: updateProgramAttendMode,
    isSuccess,
    isLoading,
  } = useUpdateProgramAttendMode(programId);
  const [attendStatus, setAttendStatus] =
    useState<ProgramAttendStatus>("non_open");

  useEffect(() => {
    const currentProgramAttendStatus = queryClient.getQueryData<ProgramInfoDto>(
      [API.PROGRAM.Edit_DETAIL(programId)],
    )?.attendMode;
    setAttendStatus(currentProgramAttendStatus);
  }, [queryClient, programId, setAttendStatus, isLoading]);

  const setAttendStatusToAttend = () => {
    if (attendStatus === "non_open") return;
    updateProgramAttendMode("attend");
    isSuccess && setAttendStatus("attend");
  };

  const setAttendStatusToLate = () => {
    if (attendStatus === "non_open") return;
    updateProgramAttendMode("late");
    isSuccess && setAttendStatus("late");
  };

  const closeAttend = () => {
    updateProgramAttendMode("end");
    isSuccess && setAttendStatus("end");
  };

  const startAttend = () => {
    updateProgramAttendMode("attend");
    isSuccess && setAttendStatus("attend");
  };

  return (
    <>
      <section>
        <Title text="출석 체크 관리하기" />
        <div className="mt-4" />
        <div className="flex items-center justify-between rounded-2xl bg-slate-50 p-8">
          <p className="text-xl font-semibold">출석 체크 상태</p>
          <div className="flex gap-8">
            <div className="flex rounded-full border bg-gray-10">
              {attendStatus === "attend" ? (
                <>
                  <button
                    onClick={setAttendStatusToAttend}
                    disabled={isLoading}
                  >
                    <StatusToggleItem color="green" text="참석" />
                  </button>
                  <button onClick={setAttendStatusToLate} disabled={isLoading}>
                    <StatusToggleItem color="gray" text="지각" />
                  </button>
                </>
              ) : attendStatus === "late" ? (
                <>
                  <button
                    onClick={setAttendStatusToAttend}
                    disabled={isLoading}
                  >
                    <StatusToggleItem color="gray" text="참석" />
                  </button>
                  <button onClick={setAttendStatusToLate} disabled={isLoading}>
                    <StatusToggleItem color="yellow" text="지각" />
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={setAttendStatusToAttend}
                    disabled={isLoading}
                  >
                    <StatusToggleItem color="gray" text="참석" />
                  </button>
                  <button onClick={setAttendStatusToLate} disabled={isLoading}>
                    <StatusToggleItem color="gray" text="지각" />
                  </button>
                </>
              )}
            </div>
            {attendStatus === "non_open" ? (
              <button onClick={startAttend} disabled={isLoading}>
                <StatusToggleItem color="teal" text="출석체크 시작하기" />
              </button>
            ) : (
              <button onClick={closeAttend} disabled={isLoading}>
                <StatusToggleItem color="red" text="출석체크 종료하기" />
              </button>
            )}
          </div>
        </div>
      </section>
      <div className="mt-20" />
    </>
  );
};

export default ProgramAttendStatusManageSection;
