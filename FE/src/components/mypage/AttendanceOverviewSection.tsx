"use client";

import DateSelector from "@/components/mypage/DateSelector";
import AttendanceTable from "@/components/mypage/AttendanceTable";
import Paginataion from "@/components/common/pagination/Pagination";
import {
  useGetUserAttendanceList,
  useGetUserAttendanceSummary,
} from "@/hooks/query/useMemberQuery";
import { useState } from "react";

// TODO: initial date 저장 위치 논의
const INITIAL_START_DATE = new Date("2025-03-24").getTime();
const INITIAL_END_DATE = new Date("2025-08-30").getTime();

const AttendanceOverviewSection = () => {
  const [page, setPage] = useState(1);
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
    page,
    size: 6,
  });

  if (
    !attendanceSummary ||
    isSummaryLoading ||
    isListLoading ||
    isListError ||
    isSummaryError
  )
    return <div>Loading...</div>;

  return (
    <section className="flex flex-col gap-4">
      <div className="flex items-center gap-5">
        <span className="text-3xl font-bold">출결 현황</span>
        <span className="text-lg">{`참석 ${attendanceSummary.attendCount}회 | 지각 ${attendanceSummary.lateCount}회 | 불참 ${attendanceSummary.absentCount}회 | 벌점 ${attendanceSummary.penaltyPoint}점`}</span>
      </div>
      <DateSelector
        startDate={startDate}
        endDate={endDate}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
      />
      <AttendanceTable attendanceList={attendanceListData.attendances} />
      <Paginataion
        totalPage={attendanceListData.totalPage}
        currentPage={page}
        onChange={(newPage: number) => setPage(newPage)}
      />
    </section>
  );
};

export default AttendanceOverviewSection;
