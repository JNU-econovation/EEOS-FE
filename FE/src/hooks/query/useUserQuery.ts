import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getMyActiveStatus,
  getMyAttendStatus,
  postMyAttendance,
  putMyActiveStatus,
  putMyAttendStatus,
} from "@/apis/user";
import API from "@/constants/API";
import { ActiveStatus, AttendStatus } from "@/types/member";

export const useGetMyActiveStatus = () => {
  return useQuery({
    queryKey: [API.USER.ACTIVE_STATUS],
    queryFn: getMyActiveStatus,
    suspense: true,
  });
};

export const usePutMyActiveStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [API.USER.ACTIVE_STATUS],
    mutationFn: (activeStatus: ActiveStatus) =>
      putMyActiveStatus({ activeStatus }),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [API.USER.ACTIVE_STATUS] });
    },
  });
};

export const useGetMyAttendStatus = (programId: number) => {
  return useQuery({
    queryKey: [API.USER.ATTEND_STATUS(programId)],
    queryFn: () => getMyAttendStatus(programId),
    staleTime: 1000 * 60 * 5,
  });
};

interface PutMyAttendStatus {
  programId: number;
  beforeAttendStatus: AttendStatus;
}

/**
 * 이전에 직접 참석 여부를 변경할 떄 사용하던 api 입니다.
 * 현재는 사용하지 않습니다.
 */
export const usePutMyAttendStatus = ({
  programId,
  beforeAttendStatus,
}: PutMyAttendStatus) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [API.USER.ATTEND_STATUS],
    mutationFn: (afterAttendStatus: AttendStatus) =>
      putMyAttendStatus(programId, {
        beforeAttendStatus,
        afterAttendStatus: afterAttendStatus,
      }),
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [API.USER.ATTEND_STATUS(programId)],
      });
      const statuses: AttendStatus[] = [
        "attend",
        "late",
        "absent",
        "nonResponse",
      ];
      statuses.forEach((status) => {
        queryClient.invalidateQueries({
          queryKey: [API.MEMBER.ATTEND_STATUS(programId), status],
        });
      });
    },
  });
};

export const usePostMyAttendance = (programId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [API.USER.ATTEND_STATUS(programId)],
    mutationFn: () => postMyAttendance(programId),
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [API.USER.ATTEND_STATUS(programId)],
      });
      const statuses: AttendStatus[] = [
        "attend",
        "late",
        "absent",
        "nonResponse",
      ];
      statuses.forEach((status) => {
        queryClient.invalidateQueries({
          queryKey: [API.MEMBER.ATTEND_STATUS(programId), status],
        });
      });
    },
  });
};
