import { ProgramStatus } from "@/types/program";

export type ActiveStatus = "am" | "rm" | "cm" | "ob";
export type ActiveStatusWithAll = ActiveStatus | "all";
export type AttendStatus =
  | "attend"
  | "absent"
  | "late"
  | "nonResponse"
  | "nonRelated";

export interface Member {
  memberId: number;
  name: string;
}

export interface MemberInfo extends Member {
  attendStatus: AttendStatus;
  activeStatus: ActiveStatus;
}

export interface MemberAttendStatusInfo
  extends Omit<MemberInfo, "activeStatus"> {}

export interface MemberActiveStatusInfo
  extends Omit<MemberInfo, "attendStatus"> {}

export interface UserActiveStatusInfo
  extends Omit<MemberInfo, "memberId" | "attendStatus"> {}

export interface UserAttendStatusInfo
  extends Omit<MemberInfo, "memberId" | "activeStatus"> {}

export interface SimpleMemberInfo
  extends Omit<MemberInfo, "attendStatus" | "activeStatus"> {}

export interface UserAttendanceInfo {
  programId: number;
  title: string;
  programStatus: ProgramStatus;
  attendStatus: AttendStatus;
}

export interface UserAttendanceList {
  size: number;
  page: number;
  totalPage: number;
  contents: UserAttendanceInfo[];
}

export interface UserAttendanceSummary {
  attendCount: number;
  lateCount: number;
  absentCount: number;
  penaltyPoint: number;
}
