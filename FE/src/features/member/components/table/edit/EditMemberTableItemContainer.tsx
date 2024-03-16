"use client";

import { MemberTableLoader } from "../Table.loader";
import { EditMemberTableItem } from "./EditMemberTableItem";
import {
  ActiveStatusWithAll,
  AttendStatus,
  useGetMembersByActiveAndProgram,
} from "@/features/member";

interface EditMemberTableItemContainerProps {
  setMembers: (
    memberId: number,
    before: AttendStatus,
    after: AttendStatus,
  ) => void;
  status: ActiveStatusWithAll;
  programId: number;
  isEditable?: boolean;
}

export const EditMemberTableItemContainer = ({
  setMembers,
  programId,
  status,
  isEditable = true,
}: EditMemberTableItemContainerProps) => {
  const { data: memberList, isLoading } = useGetMembersByActiveAndProgram({
    programId,
    status,
  });

  if (isLoading) return <MemberTableLoader />;

  return (
    <>
      {memberList.map((member) => (
        <EditMemberTableItem
          key={member.memberId}
          memberId={member.memberId}
          name={member.name}
          activeStatus={member.activeStatus}
          initAttendStatus={member.attendStatus}
          setMembers={setMembers}
          isEditable={isEditable}
        />
      ))}
    </>
  );
};
