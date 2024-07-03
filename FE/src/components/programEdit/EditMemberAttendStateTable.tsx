import MemberTableWrapper from "../common/memberTable/MemberTableWrapper";

interface EditMemberAttendStateTableProps {
  programId: number;
  setMembers: (memberId: number, before: string, after: string) => void;
}

const EditMemberAttendStateTable = ({
  programId,
  setMembers,
}: EditMemberAttendStateTableProps) => {
  return (
    <MemberTableWrapper applyLayout>
      <MemberTableWrapper.StatusTab />
      <MemberTableWrapper.Header formType="edit" />
      <MemberTableWrapper.EditList
        programId={programId}
        setMembers={setMembers}
      />
    </MemberTableWrapper>
  );
};

export default EditMemberAttendStateTable;
