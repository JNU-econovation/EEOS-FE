import {
  ActiveStatus,
  AttendMode,
  UserActiveStatusInfo,
  UserAttendStatusInfo,
} from "@/types/member";

export class UserAttendStatusInfoDto {
  public readonly name: string;
  public readonly attendStatus: AttendMode;

  constructor(data: UserAttendStatusInfo) {
    this.name = data?.name;
    this.attendStatus = data?.attendMode;
  }
}

export class UserActiveStatusInfoDto {
  public readonly name: string;
  public readonly activeStatus: ActiveStatus;

  constructor(data: UserActiveStatusInfo) {
    this.name = data?.name;
    this.activeStatus = data?.activeStatus;
  }
}
