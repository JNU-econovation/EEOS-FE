import API from "../constants/API";
import {
  ActiveStatus,
  ActiveStatusWithAll,
  AttendStatus,
  Department,
  Member,
  MemberActiveStatusInfo,
  MemberAttendStatusInfo,
  MemberInfo,
} from "../types/member";
import {
  AttendanceStatisticsDto,
  MemberActiveStatusInfoDto,
  MemberAttendStatusInfoDto,
  MemberDto,
  MemberInfoDto,
  UserAttendanceListDto,
  UserAttendanceSummaryDto,
} from "./dtos/member.dto";
import { https } from "./instance";

/**
 * 활동 상태별 회원 정보 조회
 */

export const getMembersByActiveStatus = async (
  activeStatus: ActiveStatusWithAll,
): Promise<MemberActiveStatusInfoDto[]> => {
  const { data } = await https({
    url: API.MEMBER.LIST,
    method: "GET",
    params: { activeStatus },
  });

  return data?.data?.members.map(
    (member: MemberActiveStatusInfo) => new MemberActiveStatusInfoDto(member),
  );
};

/**
 * 해당 프로그램의 활동 상태별 회원 정보 조회
 */

export const getProgramMembersByActiveStatus = async (
  programId: number,
  activeStatus: ActiveStatusWithAll,
): Promise<MemberInfoDto[]> => {
  const { data } = await https({
    url: API.MEMBER.ACTIVE_STATUS(programId),
    method: "GET",
    params: { activeStatus },
  });

  return data?.data?.members.map(
    (member: MemberInfo) => new MemberInfoDto(member),
  );
};

/**
 * 해당 프로그램의 출석 상태별 회원 정보 조회
 */

export const getProgramMembersByAttendStatus = async (
  programId: number,
  attendStatus: AttendStatus,
): Promise<MemberAttendStatusInfoDto[]> => {
  const { data } = await https({
    url: API.MEMBER.ATTEND_STATUS(programId),
    method: "GET",
    params: { attendStatus },
  });

  return data?.data?.members.map(
    (member: MemberAttendStatusInfo) => new MemberAttendStatusInfoDto(member),
  );
};

/**
 * 회원 활동 상태 변경
 */
export const updateMemberActiveStatus = async (
  memberId: number,
  activeStatus: ActiveStatus,
) => {
  const { data } = await https({
    url: API.MEMBER.UPDATE(memberId),
    method: "PUT",
    data: activeStatus,
  });

  return data?.data;
};

/**
 * 회원 삭제
 */
export const deleteMember = async (memberId: number) => {
  const { data } = await https({
    url: API.MEMBER.DELETE(memberId),
    method: "DELETE",
  });
  return data?.data;
};

/**
 * 해당 프로그램 파이어 핑거 회원 정보 조회
 */
export const getFireFingerMembers = async (
  programId: number,
): Promise<MemberDto[]> => {
  const { data } = await https({
    url: API.MEMBER.FIRE_FINGER(programId),
    method: "GET",
  });

  return data?.data.members.map((member: Member) => new MemberDto(member));
};

/**
 * 본인의 출결 현황 리스트 조회
 */
export const getUserAttendanceList = async (
  startDate: number,
  endDate: number,
  size: number,
  page: number,
) => {
  const { data } = await https({
    url: API.MEMBER.ATTENDANCE_LIST,
    method: "GET",
    params: {
      startDate,
      endDate,
      size,
      page,
    },
  });

  return new UserAttendanceListDto(data?.data);
};

/**
 * 본인의 출결 현황 요약 정보 조회
 */
export const getUserAttendanceSummary = async (
  startDate: number,
  endDate: number,
) => {
  const { data } = await https({
    url: API.MEMBER.ATTENDANCE_SUMMARY,
    method: "GET",
    params: {
      startDate,
      endDate,
    },
  });

  return new UserAttendanceSummaryDto(data?.data);
};

/**
 * 사용자의 부서 설정 및 변경
 */
export const putUserDepartment = async ({
  department,
  userId,
}: {
  userId: number;
  department: Department;
}) => {
  const { data } = await https({
    url: API.MEMBER.UPDATE_DEPARTMENT(userId, department),
    method: "PUT",
  });

  return data?.data;
};

export interface AttendanceStatisticsParams {
  size: number;
  page: number;
  status: string;
  startDate: number;
  endDate: number;
}
/**
 * 출석 통계 조회
 */
export const getAttendanceStatistics = async (
  params: AttendanceStatisticsParams,
) => {
  const { data } = await https({
    url: API.MEMBER.ATTENDANCE_STATISTICS,
    method: "GET",
    params,
  });

  return data?.data.map(
    (item: AttendanceStatisticsDto) => new AttendanceStatisticsDto(item),
  ) as AttendanceStatisticsDto[];
};
