import {
  AccessRight,
  ProgramAttendStatus,
  ProgramCategory,
  ProgramInfo,
  ProgramSimpleInfo,
  ProgramStatus,
  ProgramType,
} from "@/types/program";

export class ProgramIdDto {
  public readonly programId: number;

  constructor(data: { programId: number }) {
    this.programId = data?.programId;
  }
}

export class ProgramInfoDto {
  public readonly programId: number;
  public readonly title: string;
  public readonly deadLine: string;
  public readonly content: string;
  public readonly category: ProgramCategory;
  public readonly programStatus: ProgramStatus;
  public readonly type: ProgramType;
  public readonly accessRight: AccessRight;
  public readonly attendMode: ProgramAttendStatus;
  public readonly programGithubUrl: string;

  constructor(data: ProgramInfo) {
    this.programId = data?.programId;
    this.title = data?.title;
    this.deadLine = data?.deadLine;
    this.content = data?.content;
    this.category = data?.category;
    this.programStatus = data?.programStatus;
    this.type = data?.type;
    this.accessRight = data?.accessRight;
    this.attendMode = data?.attendMode;
    this.programGithubUrl = data?.programGithubUrl;
  }
}

export class ProgramSimpleInfoDto {
  public readonly programId: number;
  public readonly title: string;
  public readonly deadLine: string;
  public readonly category: ProgramCategory;
  public readonly programStatus: ProgramStatus;
  public readonly type: ProgramType;
  public readonly attendMode: ProgramAttendStatus;

  constructor(data: ProgramSimpleInfo) {
    this.programId = data?.programId;
    this.title = data?.title;
    this.deadLine = data?.deadLine;
    this.category = data?.category;
    this.programStatus = data?.programStatus;
    this.type = data?.type;
    this.attendMode = data?.attendMode;
  }
}

export class ProgramListDto {
  public readonly size: number;
  public readonly page: number;
  public readonly totalPage: number;
  public readonly programs: ProgramSimpleInfoDto[];

  constructor(data: {
    size: number;
    page: number;
    totalPage: number;
    contents: ProgramSimpleInfo[];
  }) {
    this.size = data?.size;
    this.page = data?.page;
    this.totalPage = data?.totalPage || 1;
    this.programs = data?.contents.map((program) => {
      return new ProgramSimpleInfoDto(program);
    });
  }
}

export class ProgramAccessRightDto {
  public readonly accessRight: AccessRight;

  constructor(data: { accessRight: AccessRight }) {
    this.accessRight = data?.accessRight;
  }
}
