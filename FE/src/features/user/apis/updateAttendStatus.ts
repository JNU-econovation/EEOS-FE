import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { UserAttendStatusInfoDto } from "./dtos";
import { https } from "@/apis/instance";
import API from "@/constants/API";
import MESSAGE from "@/constants/MESSAGE";
import { AttendStatus } from "@/types/member";

export interface UpdateUserAttendStatusRequest {
  beforeAttendStatus: AttendStatus;
  afterAttendStatus: AttendStatus;
}

const updateUserAttendStatus = async (
  programId: number,
  body: UpdateUserAttendStatusRequest,
): Promise<UserAttendStatusInfoDto> => {
  const { data } = await toast.promise(
    https({
      url: API.USER.ATTEND_STATUS(programId),
      method: "PUT",
      data: body,
    }),
    {
      pending: MESSAGE.EDIT.PENDING,
      success: MESSAGE.EDIT.SUCCESS,
      error: MESSAGE.EDIT.FAILED,
    },
  );
  return new UserAttendStatusInfoDto(data?.data);
};

export const useUpdateUserAttendStatus = (programId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [API.USER.ATTEND_STATUS],
    mutationFn: (body: UpdateUserAttendStatusRequest) =>
      updateUserAttendStatus(programId, body),
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
