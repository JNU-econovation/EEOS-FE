import { UserActiveStatusInfo, UserAttendStatusInfo } from "../types";
import { ActiveStatus, AttendStatus } from "@/types/member";

export class UserActiveStatusInfoDto {
  public readonly name: string;
  public readonly activeStatus: ActiveStatus;

  constructor(data: UserActiveStatusInfo) {
    this.name = data?.name;
    this.activeStatus = data?.activeStatus;
  }
}

export class UserAttendStatusInfoDto {
  public readonly name: string;
  public readonly attendStatus: AttendStatus;

  constructor(data: UserAttendStatusInfo) {
    this.name = data?.name;
    this.attendStatus = data?.attendStatus;
  }
}
