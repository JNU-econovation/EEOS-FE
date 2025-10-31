import type {
  ActiveStatus,
  AttendStatus,
  Department,
  Member,
  MemberActiveStatusInfo,
  MemberAttendStatusInfo,
  MemberInfo,
  UserAttendanceInfo,
  UserAttendanceList,
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
  public readonly department: Department;

  constructor(data: MemberActiveStatusInfo) {
    super(data);
    this.activeStatus = data?.activeStatus;
    this.department = data?.department;
  }
}

export class AttendanceInfoDto {
  public readonly programId: number;
  public readonly title: string;
  public readonly programStatus: ProgramStatus;
  public readonly attendStatus: AttendStatus;

  constructor(data: UserAttendanceInfo) {
    this.programId = data.programId;
    this.title = data.title;
    this.programStatus = data.programStatus;
    this.attendStatus = data.attendStatus;
  }
}

export class UserAttendanceListDto {
  public readonly size: number;
  public readonly page: number;
  public readonly totalPage: number;
  public readonly attendances: UserAttendanceInfo[];

  constructor(data: UserAttendanceList) {
    this.size = data.size;
    this.page = data.page;
    this.totalPage = data.totalPage;
    this.attendances = data.contents.map(
      (item: UserAttendanceInfo) => new AttendanceInfoDto(item),
    );
  }
}

export class UserAttendanceSummaryDto {
  public readonly attendCount: number;
  public readonly lateCount: number;
  public readonly absentCount: number;
  public readonly penaltyPoint: number;

  constructor(data: UserAttendanceSummary) {
    this.attendCount = data.attendCount;
    this.lateCount = data.lateCount;
    this.absentCount = data.absentCount;
    this.penaltyPoint = data.penaltyPoint;
  }
}

export class AttendanceStatisticsDto {
  public id: number;
  public name: string;
  public activeStatus: ActiveStatus;
  public lateCount: number;
  public absentCount: number;
  public penaltyPoint: number;

  constructor(data: AttendanceStatisticsDto) {
    this.id = data.id;
    this.name = data.name;
    this.activeStatus = data.activeStatus;
    this.lateCount = data.lateCount;
    this.absentCount = data.absentCount;
    this.penaltyPoint = data.penaltyPoint;
  }
}
