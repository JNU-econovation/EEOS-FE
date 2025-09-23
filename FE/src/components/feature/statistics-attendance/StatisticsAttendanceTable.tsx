"use client";

import MemberTableLoader from "@/components/common/memberTable/MemberTable.loader";
import TableWrapper from "@/components/common/Table/TableWrapper";
import { useGetMemberByActive } from "@/hooks/query/useMemberQuery";
import { ActiveStatusWithAll } from "@/types/member";

interface TableProps {
  selectedItem: ActiveStatusWithAll;
}

const StatisticsAttendanceTable = ({ selectedItem }: TableProps) => {
  // const { data: memberList, isLoading } = useGetMemberByActive(selectedItem);

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
      {/* {isLoading && <MemberTableLoader />}
      {memberList && <TableWrapper.MemberManageList memberList={memberList} />} */}
    </TableWrapper>
  );
};

export default StatisticsAttendanceTable;
