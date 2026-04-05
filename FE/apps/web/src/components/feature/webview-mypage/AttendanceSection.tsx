"use client";

import { AttendanceInfoDto } from "@/apis/dtos/member.dto";
import Spacing from "@/components/common/Spacing";
import AttendanceBadge from "@/components/mypage/AttendanceBadge";
import {
  useGetUserAttendanceList,
  useGetUserAttendanceSummary,
} from "@/hooks/query/useMemberQuery";
import classNames from "classnames";
import { useRouter } from "next/navigation";
import { useState } from "react";

//TODO: 날짜를 코드가 아닌 env로 관리하기
const INITIAL_START_DATE = new Date("2025-03-24").getTime();
const INITIAL_END_DATE = new Date("2025-08-30").getTime();

const AttendanceSection = () => {
  const [startDate, setStartDate] = useState(INITIAL_START_DATE);
  const [endDate, setEndDate] = useState(INITIAL_END_DATE);

  const {
    data: attendanceSummary,
    isLoading: isSummaryLoading,
    isError: isSummaryError,
  } = useGetUserAttendanceSummary({
    startDate,
    endDate,
  });

  const {
    data: attendanceListData,
    isLoading: isListLoading,
    isError: isListError,
  } = useGetUserAttendanceList({
    startDate,
    endDate,
    page: 1,
    size: 10,
  });

  if (
    !attendanceSummary ||
    isSummaryLoading ||
    isSummaryError ||
    !attendanceListData ||
    isListLoading ||
    isListError
  )
    return <div>Loading...</div>;

  const attendanceText = `참석 ${attendanceSummary.attendCount}회 | 지각 ${attendanceSummary.lateCount}회 | 불참 ${attendanceSummary.absentCount}회 | 벌점 ${attendanceSummary.penaltyPoint}점`;

  return (
    <section className="flex h-16 grow flex-col rounded-t-2xl bg-white px-4 pt-4">
      <Spacing size={30} direction="vertical" unit="px" />
      <p className="text-sm opacity-75">{attendanceText}</p>

      <div className="mt-4" />
      <ul className="flex grow flex-col gap-2 overflow-y-auto">
        {attendanceListData.attendances.map((attendance, idx) => (
          <AttendanceItem key={idx} {...attendance} />
        ))}
        <div className="mt-4" />
      </ul>
    </section>
  );
};

function AttendanceItem({
  attendStatus,
  programStatus,
  title,
  programId,
}: AttendanceInfoDto) {
  const router = useRouter();
  return (
    <li
      className={classNames(
        "flex items-center justify-between gap-1 rounded-xl border p-4",
        programStatus !== "active" && "bg-gray-20 opacity-50 ",
      )}
      onClick={() => {
        router.push(`/mobile/program/${programId}`);
      }}
    >
      <div className="w-full">
        <p
          className={classNames(
            "text-xs font-semibold",
            programStatus === "active" && "text-green-600",
          )}
        >
          {programStatus === "active" ? "진행중" : "종료"}
        </p>
        <div className="flex w-full justify-between">
          <p className="font-semibold">{title}</p>
          <div className="truncate !text-sm">
            <AttendanceBadge
              attendStatus={attendStatus}
              programId={programId}
              backgroundColor={false}
            />
          </div>
        </div>
      </div>
    </li>
  );
}

export default AttendanceSection;
