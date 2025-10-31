import MemberTableLoader from "@/components/common/memberTable/MemberTable.loader";
import TableWrapper from "@/components/common/Table/TableWrapper";
import { useGetProgramMembersByActive } from "@/hooks/query/useMemberQuery";
import { ActiveStatusWithAll } from "@/types/member";

interface AttendStateTableProps {
  programId: number;
  selectedActive: ActiveStatusWithAll;
  isEnableEdit: boolean;
  setMembers: (memberId: number, before: string, after: string) => void;
}
const AttendStateTable = ({
  programId,
  isEnableEdit,
  selectedActive,
  setMembers,
}: AttendStateTableProps) => {
  const { data: editMemberList, isLoading } = useGetProgramMembersByActive({
    programId,
    status: selectedActive,
  });

  const columnWidth = ["4.75rem", "7rem", "7.25rem", "1fr", "20.5rem"];
  const headerItems = ["대상", "활동 상태", "이름", "", "출석 상태"];

  return (
    <TableWrapper columnWidths={columnWidth} headerItems={headerItems}>
      <TableWrapper.Header />
      {isLoading && <MemberTableLoader />}
      {editMemberList && (
        <>
          {editMemberList.map(
            ({ activeStatus, attendStatus, memberId, name }) => (
              <TableWrapper.EditMemberList
                key={memberId}
                activeStatus={activeStatus}
                initAttendStatus={attendStatus}
                memberId={memberId}
                name={name}
                setMembers={setMembers}
                isEditable={isEnableEdit}
              />
            ),
          )}
        </>
      )}
    </TableWrapper>
  );
};

export default AttendStateTable;
