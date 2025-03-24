import StatusToggleItem from "@/components/common/StatusToggleItem";
import MESSAGE from "@/constants/MESSAGE";
import {
  useGetMyAttendStatus,
  usePostMyAttendance,
} from "@/hooks/query/useUserQuery";
import { ProgramAttendStatus, ProgramStatus } from "@/types/program";
import { getEditableStatus } from "@/utils/program";
import { useQueryClient } from "@tanstack/react-query";
import AttendStatusView from "./AttendStatusView";
import AttendToggleLabel from "./AttendToggleLabel";

interface UserAttendModalProps {
  programId: number;
}

const UserAttendModal = ({ programId }: UserAttendModalProps) => {
  const queryClient = useQueryClient();
  const { data: userInfo } = useGetMyAttendStatus(programId);
  const { mutate: updateAttendStatus } = usePostMyAttendance(programId);

  const { attendStatus } = userInfo;
  const attendMode = queryClient.getQueryData<ProgramAttendStatus>([
    "attendMode",
    programId,
  ]);
  const programStatus = queryClient.getQueryData<ProgramStatus>([
    "programStatus",
    programId,
  ]);

  const editableStatus = getEditableStatus({
    myAttendStatus: attendStatus,
    programStatus: programStatus,
    programAttendMode: attendMode,
  });

  const handleSelectorClick = () => {
    if (editableStatus === "EDITABLE")
      confirm(MESSAGE.CONFIRM.EDIT) && updateAttendStatus();
  };

  return (
    <>
      <AttendStatusView userInfo={userInfo} programId={programId} />
      <AttendToggleLabel editableStatus={editableStatus} />
      <div onClick={handleSelectorClick}>
        <StatusToggleItem
          color={editableStatus == "EDITABLE" ? "green" : "gray"}
          text="출석 하기"
        />
      </div>
    </>
  );
};
export default UserAttendModal;
