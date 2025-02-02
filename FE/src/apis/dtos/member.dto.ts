import type {
  ActiveStatus,
  AttendStatus,
  Member,
  MemberActiveStatusInfo,
  MemberAttendStatusInfo,
  MemberInfo,
} from "@/types/member";

export class MemberDto {
  public readonly memberId: number;
  public readonly name: string;

  constructor(data: Member) {
    this.memberId = data?.memberId;
    this.name = data?.name;
  }
}

export class MemberInfoDto extends MemberDto {
  public readonly attendStatus: AttendStatus;
  public readonly activeStatus: ActiveStatus;

  constructor(data: MemberInfo) {
    super(data);
    this.attendStatus = data?.attendStatus;
    this.activeStatus = data?.activeStatus;
  }
}

export class MemberAttendStatusInfoDto extends MemberDto {
  public readonly attendStatus: AttendStatus;

  constructor(data: MemberAttendStatusInfo) {
    super(data);
    this.attendStatus = data?.attendStatus;
  }
}

export class MemberActiveStatusInfoDto extends MemberDto {
  public readonly activeStatus: ActiveStatus;

  constructor(data: MemberActiveStatusInfo) {
    super(data);
    this.activeStatus = data?.activeStatus;
  }
}
