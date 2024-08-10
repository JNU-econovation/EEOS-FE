import MemberTableLoader from "@/components/common/memberTable/MemberTable.loader";
import TableWrapper from "@/components/common/Table/TableWrapper";
import { useGetMemberByActive } from "@/hooks/query/useMemberQuery";
import { ActiveStatusWithAll } from "@/types/member";

interface ParticipantTableProps {
  members: Set<number>;
  setMembers: (memberId: number) => void;
  selectedActive: ActiveStatusWithAll;
  clearMembers: () => void;
  setAllMembers: (memberList: number[]) => void;
}
const ParticipantTable = ({
  members,
  setMembers,
  selectedActive,
  clearMembers,
  setAllMembers,
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
      <TableWrapper.Header
        isChecked={members.size === memberList?.length}
        handleResetCheckBox={clearMembers}
        handleSetCheckBox={() =>
          setAllMembers(memberList.map(({ memberId }) => memberId))
        }
      />
      {isLoading && <MemberTableLoader />}
      {memberList && (
        <>
          {memberList.map(({ activeStatus, memberId, name }) => (
            <TableWrapper.SelectMemberList
              key={memberId}
              activeStatus={activeStatus}
              handleCheck={setMembers}
              isChecked={members.has(memberId)}
              memberId={memberId}
              name={name}
            />
          ))}
        </>
      )}
    </TableWrapper>
  );
};

export default ParticipantTable;
