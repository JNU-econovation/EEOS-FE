"use client";

import { AttendanceInfoDto } from "@/apis/dtos/member.dto";
import AttendanceBadge from "@/components/mypage/AttendanceBadge";
import {
  useGetUserAttendanceList,
  useGetUserAttendanceSummary,
} from "@/hooks/query/useMemberQuery";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

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

  const attendanceText = `참석 ${attendanceSummary.attendCount}회 | 지각 ${attendanceSummary.lateCount}회 | 불참 ${attendanceSummary.absentCount}회`;

  return (
    <section className="flex h-16 grow flex-col rounded-t-xl bg-gray-10 px-4 pt-4">
      <div className="flex w-full grow items-end gap-2">
        <p className="min-w-20 truncate text-xl font-semibold">출결 현황</p>
        <p className="text-sm opacity-75">{attendanceText}</p>
      </div>

      {/*  */}
      <div className="mt-4" />
      <ul className="flex grow flex-col gap-2 overflow-y-auto">
        <Link href="/mobile/program/94">
          <li>
            <div className="rounded-xl border bg-white p-4">
              <p className="text-sm font-semibold">진행중</p>
              <p className="text-lg font-semibold">2024-2 B팀 2차 주간발표</p>
            </div>
          </li>
        </Link>
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
      className="flex items-center justify-between gap-1 rounded-xl border bg-gray-20 p-4 opacity-50"
      onClick={() => {
        router.push(`/mobile/program/${programId}`);
      }}
    >
      <div>
        <p className="text-xs font-semibold">
          {programStatus === "active" ? "진행중" : "완료"}
        </p>
        <p className="font-semibold">{title}</p>
      </div>
      <div className="truncate !text-sm">
        <AttendanceBadge attendStatus={attendStatus} programId={94} />
      </div>
    </li>
  );
}

export default AttendanceSection;
