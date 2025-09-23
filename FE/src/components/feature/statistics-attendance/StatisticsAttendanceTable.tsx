"use client";

import MemberTableLoader from "@/components/common/memberTable/MemberTable.loader";
import TableWrapper from "@/components/common/Table/TableWrapper";
import { useGetAttendanceStatistics } from "@/hooks/query/useMemberQuery";
import { ActiveStatusWithAll } from "@/types/member";
import { memo, useMemo } from "react";

interface TableProps {
  selectedItem: ActiveStatusWithAll;
}

const StatisticsAttendanceTable = memo(({ selectedItem }: TableProps) => {
  const queryParams = useMemo(() => ({
    activeStatus: selectedItem,
    page: 1,
    endDate: Date.now(),
    size: 100,
    startDate: Date.now(),
  }), [selectedItem]);

  const { data: memberList, isLoading } = useGetAttendanceStatistics(queryParams);

  const columnWidths = [
    "7rem",
    "1fr",
    "7rem",
    "1fr",
    "10rem",
    "10rem",
    "10rem",
  ];

  const headerItems = ["활동 상태", "", "이름", "", "지각", "불참", "벌점"];

  return (
    <TableWrapper columnWidths={columnWidths} headerItems={headerItems}>
      <TableWrapper.Header />
      {isLoading && <MemberTableLoader />}
      {memberList && (
        <TableWrapper.AttendanceStatisticsMemberList memberList={memberList} />
      )}
    </TableWrapper>
  );
});

export default StatisticsAttendanceTable;
