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

export interface PageInfo {
  total: number;
  current: number;
  size: number;
}

export interface UserAttendanceSummary {
  attendCount: number;
  lateCount: number;
  absentCount: number;
  paneltyPoint: number;
}
