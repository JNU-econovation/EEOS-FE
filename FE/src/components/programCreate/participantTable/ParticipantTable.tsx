import MemberTableLoader from "@/components/common/memberTable/MemberTable.loader";
import TableWrapper from "@/components/common/Table/TableWrapper";
import { useGetMemberByActive } from "@/hooks/query/useMemberQuery";
import { ActiveStatusWithAll } from "@/types/member";

interface ParticipantTableProps {
  members: Set<number>;
  setMembers: (memberId: number) => void;
  selectedActive: ActiveStatusWithAll;
  // onClickHeaderCheckBox: (selected: boolean) => void;
}
const ParticipantTable = ({
  members,
  setMembers,
  selectedActive, // onClickHeaderCheckBox,
}: ParticipantTableProps) => {
  const { data: memberList, isLoading } = useGetMemberByActive(selectedActive);

  const columnWidths = ["4.75rem", "7rem", "7.25rem", "1fr", "20.5rem"];
  const headerItems = ["활동 상태", "이름"];

  return (
    <TableWrapper
      columnWidths={columnWidths}
      headerItems={headerItems}
      hasCheckBox
    >
      <TableWrapper.Header />
      {isLoading && <MemberTableLoader />}
      {memberList && (
        <TableWrapper.SelectMemberList
          memberList={memberList}
          selectedMember={members}
          setSelectedMember={setMembers}
        />
      )}
    </TableWrapper>
  );
};

export default ParticipantTable;
