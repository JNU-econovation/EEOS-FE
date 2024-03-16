import { MemberInfo } from "@/types/member";

export interface UserActiveStatusInfo
  extends Omit<MemberInfo, "memberId" | "attendStatus"> {}
export interface UserAttendStatusInfo
  extends Omit<MemberInfo, "memberId" | "activeStatus"> {}
