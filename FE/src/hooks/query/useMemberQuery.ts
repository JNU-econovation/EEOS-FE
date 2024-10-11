import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { MemberActiveStatusInfoDto } from "@/apis/dtos/member.dto";
import {
  deleteMember,
  getMembersByActiveStatus,
  getProgramMembersByActiveStatus,
  getProgramMembersByAttendStatus,
  updateMemberActiveStatus,
} from "@/apis/member";
import API from "@/constants/API";
import { ActiveStatus, ActiveStatusWithAll, AttendMode } from "@/types/member";

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
  status: AttendMode;
  programId: number;
}
interface UpdateMemberActiveStatus {
  memberId: number;
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
  return useQuery({
    queryKey: [API.MEMBER.ATTEND_STATUS(programId), status],
    queryFn: () => getProgramMembersByAttendStatus(programId, status),
    staleTime: 1000 * 60 * 5,
  });
};

export const useUpdateMemberActiveStatus = ({
  memberId,
}: UpdateMemberActiveStatus) => {
  const queryClient = useQueryClient();
  const data = useMutation<void, Error, { activeStatus: ActiveStatus }>({
    mutationFn: ({ activeStatus }: { activeStatus: ActiveStatus }) =>
      updateMemberActiveStatus(memberId, activeStatus),

    onMutate: ({ activeStatus: newActiveStatus }) => {
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
