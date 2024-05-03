import { toast } from "react-toastify";
import API from "../constants/API";
import { AttendStatus } from "../types/member";
import {
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
import MESSAGE from "@/constants/MESSAGE";

/**
 * 프로그램 정보 조회
 */

export const getProgramById = async (
  programId: number,
  isLoggedIn: boolean,
): Promise<ProgramInfoDto> => {
  const url = isLoggedIn
    ? API.PROGRAM.DETAIL(programId)
    : API.PROGRAM.GUEST_DETAIL(programId);
  const { data } = await https({
    url,
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
  isLoggedIn: boolean;
}

export const getProgramList = async ({
  category,
  programStatus,
  size,
  page,
  isLoggedIn,
}: GetProgramListRequest): Promise<ProgramListDto> => {
  const url = isLoggedIn ? API.PROGRAM.LIST : API.PROGRAM.GUEST_LIST;
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
  const { data } = await toast.promise(
    https({
      url: API.PROGRAM.DELETE(programId),
      method: "DELETE",
    }),
    {
      pending: MESSAGE.DELETE.PENDING,
      success: MESSAGE.DELETE.SUCCESS,
      error: MESSAGE.DELETE.FAILED,
    },
  );
  return data?.data;
};

/**
 * 프로그램 생성 및 대상자 선정
 */

export interface PostProgramRequest
  extends Omit<ProgramInfo, "programId" | "programStatus" | "accessRight"> {
  members: { memberId: number }[];
}

export const sendSlackMessage = async (
  programId: number,
  isRetry: boolean = false,
) => {
  if (!window) return;

  if (!isRetry) {
    const isConfirmed = confirm(MESSAGE.SLACK_MESSAGE.CONFIRM);
    if (!isConfirmed) return;
  }

  return await https({
    url: API.PROGRAM.SEND_MESSAGE(programId),
    method: "POST",
    data: {
      programUrl:
        process.env.NEXT_PUBLIC_SLACK_MESSAGE_REQUEST_URL_PREFIX + programId,
    },
  })
    .then(() => alert(MESSAGE.SLACK_MESSAGE.SUCCESS))
    .catch(() => {
      const retry = confirm(MESSAGE.SLACK_MESSAGE.FAIL);
      if (retry) sendSlackMessage(programId);
    });
};

export const postProgram = async (
  body: PostProgramRequest,
): Promise<ProgramIdDto> => {
  const { data } = await toast.promise(
    https({
      url: API.PROGRAM.CREATE,
      method: "POST",
      data: body,
    }),
    {
      pending: MESSAGE.CREATE.PENDING,
      success: MESSAGE.CREATE.SUCCESS,
      error: MESSAGE.CREATE.FAILED,
    },
  );
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
  extends Omit<ProgramInfo, "programId" | "programStatus" | "accessRight"> {
  members: PatchProgramMember[];
}

export interface PatchProgramRequest {
  programId: number;
  body: PatchProgramBody;
}

export const patchProgram = async ({
  programId,
  body,
}: PatchProgramRequest): Promise<ProgramIdDto> => {
  const { data } = await toast.promise(
    https({
      url: API.PROGRAM.UPDATE(programId),
      method: "PATCH",
      data: body,
    }),
    {
      pending: MESSAGE.EDIT.PENDING,
      success: MESSAGE.EDIT.SUCCESS,
      error: MESSAGE.EDIT.FAILED,
    },
  );

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
