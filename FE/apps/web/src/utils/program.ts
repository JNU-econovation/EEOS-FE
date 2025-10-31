import { EditableStatus } from "@/types/attendStatusModal";
import { AttendStatus } from "@/types/member";
import { ProgramAttendStatus, ProgramStatus } from "@/types/program";

export const getEditableStatus = ({
  myAttendStatus,
  programStatus,
  programAttendMode,
}: {
  myAttendStatus: AttendStatus; // 내 출결 상태
  programStatus: ProgramStatus; // 프로그램 상태
  programAttendMode: ProgramAttendStatus; // 프로그램 출석 모드
}): EditableStatus => {
  if (
    programStatus === "active" &&
    myAttendStatus === "nonResponse" &&
    (programAttendMode === "attend" || programAttendMode === "late")
  )
    return "EDITABLE";

  if (myAttendStatus === "nonRelated") return "NON_RELATED";
  if (programStatus === "end") return "INACTIVE";
  if (
    programStatus === "active" &&
    (myAttendStatus === "attend" ||
      myAttendStatus === "late" ||
      myAttendStatus === "absent") &&
    (programAttendMode === "attend" || programAttendMode === "late")
  )
    return "ALREADY_ATTENDED";

  return "INACTIVE";
};
