import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { MemberActiveStatusInfoDto } from "@/apis/dtos/member.dto";
import {
  deleteMember,
  getFireFingerMembers,
  getMembersByActiveStatus,
  getProgramMembersByActiveStatus,
  getProgramMembersByAttendStatus,
  getUserAttendanceList,
  getUserAttendanceSummary,
  putUserDepartment,
  updateMemberActiveStatus,
} from "@/apis/member";
import API from "@/constants/API";
import {
  ActiveStatus,
  ActiveStatusWithAll,
  AttendStatus,
} from "@/types/member";
import { ProgramAttendStatus } from "@/types/program";

export const useGetMemberByActive = (activeStatus: ActiveStatusWithAll) => {
  return useQuery({
    queryKey: [API.MEMBER.LIST, activeStatus],
    queryFn: () => getMembersByActiveStatus(activeStatus),
    staleTime: 1000 * 60 * 5,
  });
};

interface GetProgramMemebersByActive {
  status: ActiveStatusWithAll;
  programId: number;
}

interface GetProgramMemebersByAttend {
  status: AttendStatus;
  programId: number;
}

interface UpdateMemberActiveStatus {
  memberId: number;
}

interface GetUserAttendanceList {
  startDate: number;
  endDate: number;
  size: number;
  page: number;
}

interface GetUserAttendanceSummary {
  startDate: number;
  endDate: number;
}

export const useGetProgramMembersByActive = ({
  programId,
  status,
}: GetProgramMemebersByActive) => {
  return useQuery({
    queryKey: [API.MEMBER.ACTIVE_STATUS(programId), status],
    queryFn: () => getProgramMembersByActiveStatus(programId, status),
    staleTime: 1000 * 60 * 5,
  });
};

export const useGetProgramMembersByAttend = ({
  programId,
  status,
}: GetProgramMemebersByAttend) => {
  const queryClient = useQueryClient();
  const adminAttendStatus = queryClient.getQueryData<ProgramAttendStatus>([
    "attendMode",
    programId,
  ]);

  return useQuery({
    queryKey: [API.MEMBER.ATTEND_STATUS(programId), status],
    queryFn: () => getProgramMembersByAttendStatus(programId, status),
    staleTime: 1000 * 60 * 5,
    refetchInterval: () => (adminAttendStatus === "attend" ? 2000 : false),
  });
};

export const useUpdateMemberActiveStatus = () => {
  const queryClient = useQueryClient();
  const data = useMutation<
    void,
    Error,
    { activeStatus: ActiveStatus; memberId: number }
  >({
    mutationFn: ({
      activeStatus,
      memberId,
    }: {
      activeStatus: ActiveStatus;
      memberId: number;
    }) => updateMemberActiveStatus(memberId, activeStatus),

    onMutate: ({ activeStatus: newActiveStatus, memberId }) => {
      const prevMemberActiveData = queryClient.getQueryData<
        MemberActiveStatusInfoDto[]
      >([API.MEMBER.LIST, "all"]);

      const newMemberActiveData = prevMemberActiveData.map((v) =>
        memberId === v.memberId
          ? {
              activeStatus: newActiveStatus,
              memberId: v.memberId,
              name: v.name,
            }
          : v,
      );

      queryClient.setQueryData([API.MEMBER.LIST, "all"], newMemberActiveData);
    },
    onError: () => {
      queryClient.invalidateQueries([API.MEMBER.LIST]);
    },
  });
  return data;
};

export const useDeleteMember = () => {
  const queryClient = useQueryClient();
  const data = useMutation<void, Error, { memberId: number }>({
    mutationFn: ({ memberId }) => deleteMember(memberId),

    onSettled: () => {
      queryClient.invalidateQueries([API.MEMBER.LIST]);
    },
  });
  return data;
};

export const useGetFireFinger = (programId: number) => {
  return useQuery({
    queryKey: [API.MEMBER.FIRE_FINGER(programId)],
    queryFn: () => getFireFingerMembers(programId),
    enabled: !!programId,
    staleTime: 1000 * 60 * 30,
    cacheTime: 1000 * 60 * 30,
    // suspense: true,
  });
};

export const useGetUserAttendanceList = ({
  startDate,
  endDate,
  size,
  page,
}: GetUserAttendanceList) => {
  return useQuery({
    queryKey: [API.MEMBER.ATTENDANCE_LIST, startDate, endDate, size, page],
    queryFn: () => getUserAttendanceList(startDate, endDate, size, page),
    enabled: !!startDate && !!endDate,
    staleTime: Infinity,
    keepPreviousData: true,
  });
};

export const useGetUserAttendanceSummary = ({
  startDate,
  endDate,
}: GetUserAttendanceSummary) => {
  return useQuery({
    queryKey: [API.MEMBER.ATTENDANCE_SUMMARY, startDate, endDate],
    queryFn: () => getUserAttendanceSummary(startDate, endDate),
    enabled: !!startDate && !!endDate,
    staleTime: Infinity,
    keepPreviousData: true,
  });
};

export const usePutUpdateMemberDepartment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: putUserDepartment,
    onMutate({ department, userId }) {
      const prevMembers = queryClient.getQueryData<MemberActiveStatusInfoDto[]>(
        [API.MEMBER.LIST, "all"],
      );

      if (!prevMembers) return;

      const newMemberActiveData = prevMembers.map((v) => {
        if (v.memberId === userId) {
          return { ...v, department };
        }
        return v;
      });
      queryClient.setQueryData([API.MEMBER.LIST, "all"], newMemberActiveData);

      return prevMembers;
    },
    onError: () => {
      queryClient.invalidateQueries([API.MEMBER.LIST]);
    },
  });
};
