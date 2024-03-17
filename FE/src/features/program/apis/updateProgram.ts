import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { ProgramInfo } from "../types";
import { ProgramIdDto } from "./dtos";
import { https } from "@/apis/instance";
import API from "@/constants/API";
import MESSAGE from "@/constants/MESSAGE";
import ROUTES from "@/constants/ROUTES";
import { ActiveStatusWithAll, AttendStatus } from "@/features/member";

export interface UpdateProgramMember {
  memberId: number;
  beforeAttendStatus: AttendStatus;
  afterAttendStatus: AttendStatus;
}

export interface UpdateProgramBody
  extends Omit<ProgramInfo, "programId" | "programStatus" | "accessRight"> {
  members: UpdateProgramMember[];
}

export interface UpdateProgramRequest {
  programId: number;
  body: UpdateProgramBody;
}
const updateProgram = async ({
  programId,
  body,
}: UpdateProgramRequest): Promise<ProgramIdDto> => {
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

export const useUpdateProgram = ({ programId, body }: UpdateProgramRequest) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [API.PROGRAM.UPDATE(programId)],
    mutationFn: () => updateProgram({ programId, body }),
    onSettled: (data) => {
      data && router.replace(ROUTES.DETAIL(data?.programId));
      const statuses: ActiveStatusWithAll[] = ["all", "am", "cm", "rm", "ob"];
      statuses.forEach((status) => {
        queryClient.invalidateQueries([
          API.MEMBER.ACTIVE_STATUS(programId),
          status,
        ]);
      });
    },
  });
};
