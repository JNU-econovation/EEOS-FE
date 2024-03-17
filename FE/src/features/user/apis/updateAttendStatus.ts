import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { UserAttendStatusInfoDto } from "./dtos";
import { https } from "@/utils/axios";
import API from "@/constants/API";
import MESSAGE from "@/constants/MESSAGE";
import { AttendStatus } from "@/types/member";

export interface UpdateAttendStatusRequest {
  beforeAttendStatus: AttendStatus;
  afterAttendStatus: AttendStatus;
}

const updateAttendStatus = async (
  programId: number,
  body: UpdateAttendStatusRequest,
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

export const useUpdateAttendStatus = (programId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [API.USER.ATTEND_STATUS],
    mutationFn: (body: UpdateAttendStatusRequest) =>
      updateAttendStatus(programId, body),
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
