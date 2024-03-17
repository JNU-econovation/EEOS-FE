import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { ProgramInfo } from "../types";
import { ProgramIdDto } from "./dtos";
import { https } from "@/apis/instance";
import API from "@/constants/API";
import MESSAGE from "@/constants/MESSAGE";
import ROUTES from "@/constants/ROUTES";

interface CreateProgramRequest
  extends Omit<ProgramInfo, "programId" | "programStatus" | "accessRight"> {
  members: { memberId: number }[];
}

const createProgram = async (
  body: CreateProgramRequest,
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

interface CreateProgram {
  programData: CreateProgramRequest;
  formReset: () => void;
}

export const useCreateProgram = ({ programData, formReset }: CreateProgram) => {
  const router = useRouter();

  return useMutation({
    mutationKey: [API.PROGRAM.CREATE],
    mutationFn: () => createProgram(programData),
    onSettled: (data) => {
      formReset();
      data && router.replace(ROUTES.DETAIL(data?.programId));
    },
  });
};
