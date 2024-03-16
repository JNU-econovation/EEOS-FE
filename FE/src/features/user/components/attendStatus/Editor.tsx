"use client";

import { useUpdateUserAttendStatus } from "../../apis/updateAttendStatus";
import { getDisplayInfo, getEditableStatus } from "../../utils";
import { UserAttendStatusEditorLoader } from "./Editor.loader";
import AttendStatusToggle from "@/components/common/attendStatusToggle/AttendStatusToggle";
import StatusToggleItem from "@/components/common/attendStatusToggle/StatusToggleItem";
import ATTEND_STATUS from "@/constants/ATTEND_STATUS";
import MESSAGE from "@/constants/MESSAGE";
import useGetAttendStatusAndProgramInfo from "@/hooks/useGetAttendStatusAndProgramInfo";
import { AttendStatus } from "@/types/member";

interface UserAttendStatusEditorProps {
  programId: number;
}

export const UserAttendStatusEditor = ({
  programId,
}: UserAttendStatusEditorProps) => {
  const { userAttendStatusInfo, isLoading, programType, programStatus } =
    useGetAttendStatusAndProgramInfo(programId);
  const { mutate: updateAttendStatus } = useUpdateUserAttendStatus(programId);

  if (isLoading) return <UserAttendStatusEditorLoader />;
  const { name, attendStatus } = userAttendStatusInfo;

  const { displayText, color } = getDisplayInfo(programType, attendStatus);
  const editableStatus = getEditableStatus(attendStatus, programStatus);

  const handleSelectorClick = (value: AttendStatus) => {
    confirm(MESSAGE.CONFIRM.EDIT) &&
      updateAttendStatus({
        beforeAttendStatus: attendStatus,
        afterAttendStatus: value,
      });
  };

  return (
    <>
      <div className="mb-4 flex items-center gap-4">
        <p className="text-lg font-semibold">{name}</p>
        <StatusToggleItem text={displayText} color={color} />
      </div>
      <p className="mb-2">{ATTEND_STATUS.LABEL[editableStatus]}</p>
      <AttendStatusToggle
        selectedValue={attendStatus}
        disabled={editableStatus !== "EDITABLE"}
        onSelect={(v) => handleSelectorClick(v)}
      />
    </>
  );
};
