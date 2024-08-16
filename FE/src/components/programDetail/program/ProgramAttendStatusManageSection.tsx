// TODO: 리팩토링 필요 : 중복되는 코드 줄이기
// 출석 상태값만 받아오는 API 필요

import classNames from "classnames";
import StatusToggleItem from "@/components/common/StatusToggleItem";
import Title from "@/components/common/Title/Title";
import {
  useGetProgramByProgramId,
  // useGetProgramAttendModeAndStatus,
  // useGetProgramByProgramId,
  useUpdateProgramAttendMode,
} from "@/hooks/query/useProgramQuery";

interface ProgramattendModeManageSectionProps {
  programId: number;
}
const ProgramattendModeManageSection = ({
  programId,
}: ProgramattendModeManageSectionProps) => {
  const { mutate: updateProgramAttendMode, isLoading } =
    useUpdateProgramAttendMode(programId);

  const { data, isLoading: isProgramLoading } = useGetProgramByProgramId(
    programId,
    true,
  );

  if (isProgramLoading) return <div>Loading...</div>;

  const { attendMode, programStatus } = data;

  const toggleBarStyle = classNames("flex gap-8", {
    "cursor-wait opacity-50": isLoading || programStatus === "end",
  });

  const setattendModeToAttend = () => {
    if (programStatus === "end" || attendMode === "end") return;
    if (attendMode === "non_open") return;
    updateProgramAttendMode("attend");
  };

  const setattendModeToLate = () => {
    if (programStatus === "end" || attendMode === "end") return;
    if (attendMode === "non_open") return;
    updateProgramAttendMode("late");
  };

  const closeAttend = () => {
    if (programStatus === "end" || attendMode === "end") return;
    updateProgramAttendMode("end");
  };

  const startAttend = () => {
    if (programStatus === "end") return;
    updateProgramAttendMode("attend");
  };

  return (
    <>
      <section>
        <Title text="출석 체크 관리하기" />
        <div className="mt-4" />
        <div className="flex items-center justify-between rounded-2xl bg-slate-50 p-8">
          <p className="text-xl font-semibold">출석 체크 상태</p>
          <div className={toggleBarStyle}>
            <div className={"flex rounded-full border bg-gray-10"}>
              {/* TODO: switch 로직 짜기 */}
              {attendMode === "attend" ? (
                <>
                  <button onClick={setattendModeToAttend} disabled={isLoading}>
                    <StatusToggleItem color="green" text="참석" />
                  </button>
                  <button onClick={setattendModeToLate} disabled={isLoading}>
                    <StatusToggleItem color="gray" text="지각" />
                  </button>
                </>
              ) : attendMode === "late" ? (
                <>
                  <button onClick={setattendModeToAttend} disabled={isLoading}>
                    <StatusToggleItem color="gray" text="참석" />
                  </button>
                  <button onClick={setattendModeToLate} disabled={isLoading}>
                    <StatusToggleItem color="yellow" text="지각" />
                  </button>
                </>
              ) : (
                <>
                  <button onClick={setattendModeToAttend} disabled={isLoading}>
                    <StatusToggleItem color="gray" text="참석" />
                  </button>
                  <button onClick={setattendModeToLate} disabled={isLoading}>
                    <StatusToggleItem color="gray" text="지각" />
                  </button>
                </>
              )}
            </div>
            {/* TODO: 아에 프로젝트가 끝났을 때 다시 시작 안되도록 수정 필요 */}
            {attendMode === "non_open" || attendMode === "end" ? (
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

export default ProgramattendModeManageSection;
