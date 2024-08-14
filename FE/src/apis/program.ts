import API from "../constants/API";
import { AttendStatus } from "../types/member";
import {
  ProgramAttendStatus,
  ProgramCategoryWithAll,
  ProgramInfo,
  ProgramStatus,
} from "../types/program";
import {
  ProgramAccessRightDto,
  ProgramIdDto,
  ProgramInfoDto,
  ProgramListDto,
} from "./dtos/program.dto";
import { https } from "./instance";
import { TeamInputInfo } from "@/types/team";

/**
 * 프로그램 정보 조회
 */

export const getProgramById = async (
  programId: number,
  isAbletoEdit: boolean,
): Promise<ProgramInfoDto> => {
  const url = isAbletoEdit
    ? API.PROGRAM.Edit_DETAIL(programId)
    : API.PROGRAM.DETAIL(programId);
  const { data } = await https({
    url,
    method: "GET",
  });

  return new ProgramInfoDto(data?.data);
};

/**
 * 프로그램 리스트 조회
 */

export interface GetProgramListRequest {
  category: ProgramCategoryWithAll;
  programStatus: ProgramStatus;
  size: number;
  page: number;
  isAdmin?: boolean;
}

export const getProgramList = async ({
  category,
  programStatus,
  size,
  page,
  isAdmin,
}: GetProgramListRequest): Promise<ProgramListDto> => {
  const url = isAdmin ? API.PROGRAM.LIST : API.PROGRAM.GUEST_LIST;
  const { data } = await https({
    url,
    method: "GET",
    params: {
      category,
      programStatus,
      size,
      page,
    },
  });
  return new ProgramListDto(data?.data);
};

/**
 * 프로그램 삭제
 */

export const deleteProgram = async (programId: number) => {
  const { data } = await https({
    url: API.PROGRAM.DELETE(programId),
    method: "DELETE",
  });
  return data?.data;
};

/**
 * 프로그램 생성 및 대상자 선정
 */

export interface PostProgramRequest
  extends Omit<
    ProgramInfo,
    | "programId"
    | "programStatus"
    | "accessRight"
    | "attendMode"
    | "eventStatus"
    | "teams"
  > {
  members: { memberId: number }[];
  teams: TeamInputInfo[];
}

export const sendSlackMessage = async (programId: number) => {
  const { data } = await https({
    url: API.PROGRAM.SEND_MESSAGE(programId),
    method: "POST",
    data: {
      programUrl:
        process.env.NEXT_PUBLIC_SLACK_MESSAGE_REQUEST_URL_PREFIX + programId,
    },
  });
  return data?.data;
};

export const postProgram = async (
  body: PostProgramRequest,
): Promise<ProgramIdDto> => {
  const { data } = await https({
    url: API.PROGRAM.CREATE,
    method: "POST",
    data: body,
  });

  return new ProgramIdDto(data?.data);
};

/**
 * 프로그램 수정 및 참여 대상자/참여 상태 수정
 */

export interface PatchProgramMember {
  memberId: number;
  beforeAttendStatus: AttendStatus;
  afterAttendStatus: AttendStatus;
}

export interface PatchProgramBody
  extends Omit<
    ProgramInfo,
    | "programId"
    | "programStatus"
    | "accessRight"
    | "attendMode"
    | "eventStatus"
    | "programGithubUrl"
    | "teams"
  > {
  members: PatchProgramMember[];
  teams: TeamInputInfo[];
}

export interface PatchProgramRequest {
  programId: number;
  body: PatchProgramBody;
}
export const patchProgram = async ({
  programId,
  body,
}: PatchProgramRequest): Promise<ProgramIdDto> => {
  const { data } = await https({
    url: API.PROGRAM.UPDATE(programId),
    method: "PATCH",
    data: body,
  });

  return new ProgramIdDto(data?.data);
};

/**
 * 프로그램 수정/삭제 권한 확인
 */
export const getProgramAccessRight = async (
  programId: number,
): Promise<ProgramAccessRightDto> => {
  const { data } = await https({
    url: API.PROGRAM.ACCESS_RIGHT(programId),
    method: "GET",
  });
  return data?.data;
};

export const updateProgramAttendMode = async (
  programId: number,
  attendMode: ProgramAttendStatus,
) => {
  const { data } = await https({
    url: API.PROGRAM.UPDATE_ATTEND_MODE(programId),
    method: "POST",
    params: {
      mode: attendMode,
    },
  });

  return data?.data;
};
