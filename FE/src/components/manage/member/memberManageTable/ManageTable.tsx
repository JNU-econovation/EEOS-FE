import MemberTableLoader from "@/components/common/memberTable/MemberTable.loader";
import TableWrapper from "@/components/common/Table/TableWrapper";
import { useGetMemberByActive } from "@/hooks/query/useMemberQuery";
import { ActiveStatusWithAll } from "@/types/member";

interface TableProps {
  selectedItem: ActiveStatusWithAll;
}
const ManageTable = ({ selectedItem }: TableProps) => {
  const { data: memberList, isLoading } = useGetMemberByActive(selectedItem);

  const columnWidths = ["7rem", "7.25rem", "1fr", "10rem"];
  const headerItems = ["활동 상태", "이름", "", ""];

  return (
    <TableWrapper columnWidths={columnWidths} headerItems={headerItems}>
      <TableWrapper.Header />
      {isLoading && <MemberTableLoader />}
      {memberList && <TableWrapper.List memberList={memberList} />}
    </TableWrapper>
  );
};

export default ManageTable;
