import MemberTableLoader from "@/components/common/memberTable/MemberTable.loader";
import TableWrapper from "@/components/common/Table/TableWrapper";
import { useGetMemberByActive } from "@/hooks/query/useMemberQuery";
import { ActiveStatusWithAll } from "@/types/member";

interface ParticipantTableProps {
  selectedItem: ActiveStatusWithAll;
  members: Set<number>;
  setMembers: (memberId: number) => void;
  selectedActive: ActiveStatusWithAll;
  onClickHeaderCheckBox: (selected: boolean) => void;
}
const ParticipantTable = ({
  members,
  onClickHeaderCheckBox,
  selectedActive,
  selectedItem,
  setMembers,
}: ParticipantTableProps) => {
  const { data: memberList, isLoading } = useGetMemberByActive(selectedItem);

  const columnWidths = ["4.75rem", "7rem", "7.25rem", "1fr", "20.5rem"];
  const headerItems = ["활동 상태", "이름"];

  return (
    <TableWrapper columnWidths={columnWidths} headerItems={headerItems}>
      <TableWrapper.Header />
      {isLoading && <MemberTableLoader />}
      {memberList && <MemberTableWrapper.CreateList />}
    </TableWrapper>
  );
};

export default ParticipantTable;
