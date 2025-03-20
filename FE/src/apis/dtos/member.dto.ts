import type {
  ActiveStatus,
  AttendStatus,
  Member,
  MemberActiveStatusInfo,
  MemberAttendStatusInfo,
  MemberInfo,
  PageInfo,
  UserAttendanceSummary,
} from "@/types/member";
import { ProgramStatus } from "@/types/program";

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

class PageInfoDto {
  public readonly total: number;
  public readonly current: number;
  public readonly size: number;

  constructor(data: PageInfo) {
    this.total = data?.total;
    this.current = data?.current;
    this.size = data?.size;
  }
}

interface AttendanceInfo {
  programId: number;
  title: string;
  programStatus: ProgramStatus;
  attendStatus: AttendStatus;
}

export class AttendanceInfoDto {
  public readonly programId: number;
  public readonly title: string;
  public readonly programStatus: ProgramStatus;
  public readonly attendStatus: AttendStatus;

  constructor(data: AttendanceInfo) {
    this.programId = data.programId;
    this.title = data.title;
    this.programStatus = data.programStatus;
    this.attendStatus = data.attendStatus;
  }
}

export class UserAttendanceListDto {
  public readonly pageInfo: PageInfoDto;
  public readonly attendances: AttendanceInfo[];

  constructor(data: any) {
    this.pageInfo = new PageInfoDto(data?.pageInfo);
    this.attendances = data?.page.map(
      (item: AttendanceInfo) => new AttendanceInfoDto(item),
    );
  }
}

export class UserAttendanceSummaryDto {
  public readonly attendCount: number;
  public readonly lateCount: number;
  public readonly absentCount: number;
  public readonly paneltyPoint: number;

  constructor(data: UserAttendanceSummary) {
    this.attendCount = data?.attendCount;
    this.lateCount = data?.lateCount;
    this.absentCount = data?.absentCount;
    this.paneltyPoint = data?.paneltyPoint;
  }
}
