export type ActiveStatus = "am" | "rm" | "cm" | "ob";
export type ActiveStatusWithAll = ActiveStatus | "all";
export type AttendMode =
  | "attend"
  | "absent"
  | "late"
  | "nonResponse"
  | "nonRelated";

export interface MemberInfo {
  memberId: number;
  name: string;
  attendMode: AttendMode;
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
