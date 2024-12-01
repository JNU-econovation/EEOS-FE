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
import { ProgramAttendStatus, ProgramStatus } from "@/types/program";

interface UserAttendModalProps {
  programId: number;
}

const UserAttendModal = ({ programId }: UserAttendModalProps) => {
  const queryClient = useQueryClient();
  const { data: userInfo, isLoading } = useGetMyAttendStatus(programId);
  const { mutate: updateAttendStatus } = usePostMyAttendance(programId);

  if (isLoading) return <AttendStatusModalLoader />;

  const { attendStatus } = userInfo;
  const attendMode = queryClient.getQueryData<ProgramAttendStatus>([
    "attendMode",
    programId,
  ]);
  const programStatus = queryClient.getQueryData<ProgramStatus>([
    "programStatus",
    programId,
  ]);

  const getEditableStatus = (
    attendStatus: AttendStatus,
    programAttendMode: ProgramAttendStatus,
    programStatus: ProgramStatus,
  ): EditableStatus => {
    if (attendStatus === "nonRelated") {
      return "NON_RELATED";
    }
    if (programStatus === "active") {
      // 당일날에
      if (programAttendMode === "attend" || programAttendMode === "late") {
        // 출석 중이면
        if (attendStatus === "attend" || attendStatus === "late")
          // 내 상태가 참석 또는 지각이면
          return "ALREADY_ATTENDED"; // 변경 불가

        return "EDITABLE"; //내 상태가 없다면 변경 가능
      }
      if (programAttendMode === "end") return "NON_RELATED"; // 당일날 종료되었으면 변경 불가
    }
    return "INACTIVE"; // 당일날이 아니면 변경 불가
  };

  const editableStatus = getEditableStatus(
    attendStatus,
    attendMode,
    programStatus,
  );

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
