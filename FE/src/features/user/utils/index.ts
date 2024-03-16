import ATTEND_STATUS from "@/constants/ATTEND_STATUS";
import { EditableStatus } from "@/types/attendStatusModal";
import { AttendStatus } from "@/types/member";
import { ProgramStatus, ProgramType } from "@/types/program";

export const getEditableStatus = (
  attendStatus: AttendStatus,
  programStatus: ProgramStatus,
): EditableStatus => {
  if (attendStatus === "nonRelated") return "NON_RELATED";
  if (programStatus !== "active") return "INACTIVE";
  return "EDITABLE";
};

export const getDisplayInfo = (
  programType: ProgramType,
  attendStatus: AttendStatus,
) => {
  const { demand_text, text, color } = ATTEND_STATUS.USER[attendStatus];
  const isDemandNonResponse =
    programType === "demand" && attendStatus === "nonResponse";
  const displayText = isDemandNonResponse ? demand_text : text;

  return {
    displayText,
    color,
  };
};
