import { useQueryClient } from "@tanstack/react-query";
import AttendStatusModalLoader from "./AttendStatusModal.loader";
import AttendStatusView from "./AttendStatusView";
import AttendToggleLabel from "./AttendToggleLabel";
import StatusToggleItem from "@/components/common/StatusToggleItem";
import MESSAGE from "@/constants/MESSAGE";
import {
  useGetMyAttendStatus,
  usePostMyAttendance,
} from "@/hooks/query/useUserQuery";
import { EditableStatus } from "@/types/attendStatusModal";
import { AttendStatus } from "@/types/member";
import { ProgramStatus } from "@/types/program";

interface UserAttendModalProps {
  programId: number;
}

const UserAttendModal = ({ programId }: UserAttendModalProps) => {
  const queryClient = useQueryClient();
  const { data: userInfo, isLoading } = useGetMyAttendStatus(programId);
  const { mutate: updateAttendStatus } = usePostMyAttendance(programId);

  if (isLoading) return <AttendStatusModalLoader />;

  const { attendStatus } = userInfo;
  const programStatus = queryClient.getQueryData<ProgramStatus>([
    "programStatus",
    programId,
  ]);

  const getEditableStatus = (
    attendStatus: AttendStatus,
    programStatus: ProgramStatus,
  ): EditableStatus => {
    if (attendStatus === "nonRelated") return "NON_RELATED";
    if (programStatus === "end" || attendStatus === "absent") {
      return "INACTIVE";
    }
    if (attendStatus === "attend" || attendStatus === "late")
      return "ALREADY_ATTENDED";
    return "EDITABLE";
  };

  const editableStatus = getEditableStatus(attendStatus, programStatus);

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
