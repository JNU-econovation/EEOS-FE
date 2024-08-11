import {
  MemberInfo,
  ActiveStatus,
  AttendStatus,
  MemberActiveStatusInfo,
  MemberAttendStatusInfo,
} from "@/types/member";

export class MemberInfoDto {
  public readonly memberId: number;
  public readonly name: string;
  public readonly attendStatus: AttendStatus;
  public readonly activeStatus: ActiveStatus;

  constructor(data: MemberInfo) {
    this.memberId = data?.memberId;
    this.name = data?.name;
    this.attendStatus = data?.attendStatus;
    this.activeStatus = data?.activeStatus;
  }
}

export class MemberAttendStatusInfoDto {
  public readonly memberId: number;
  public readonly name: string;
  public readonly attendStatus: AttendStatus;

  constructor(data: MemberAttendStatusInfo) {
    this.memberId = data?.memberId;
    this.name = data?.name;
    this.attendStatus = data?.attendStatus;
  }
}

export class MemberActiveStatusInfoDto {
  public readonly memberId: number;
  public readonly name: string;
  public readonly activeStatus: ActiveStatus;

  constructor(data: MemberActiveStatusInfo) {
    this.memberId = data?.memberId;
    this.name = data?.name;
    this.activeStatus = data?.activeStatus;
  }
}
