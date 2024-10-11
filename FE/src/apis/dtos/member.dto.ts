import {
  MemberInfo,
  ActiveStatus,
  AttendMode,
  MemberActiveStatusInfo,
  MemberAttendStatusInfo,
} from "@/types/member";

export class MemberInfoDto {
  public readonly memberId: number;
  public readonly name: string;
  public readonly attendStatus: AttendMode;
  public readonly activeStatus: ActiveStatus;

  constructor(data: MemberInfo) {
    this.memberId = data?.memberId;
    this.name = data?.name;
    this.attendStatus = data?.attendMode;
    this.activeStatus = data?.activeStatus;
  }
}

export class MemberAttendStatusInfoDto {
  public readonly memberId: number;
  public readonly name: string;
  public readonly attendStatus: AttendMode;

  constructor(data: MemberAttendStatusInfo) {
    this.memberId = data?.memberId;
    this.name = data?.name;
    this.attendStatus = data?.attendMode;
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
