import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ProgramStatus, ProgramType } from "../types";
import { ProgramInfoDto } from "./dtos";
import { https } from "@/apis/instance";
import API from "@/constants/API";

export const getProgramById = async (
  programId: number,
): Promise<ProgramInfoDto> => {
  const { data } = await https({
    url: API.PROGRAM.DETAIL(programId),
  });
  return new ProgramInfoDto(data?.data);
};

export const useGetProgramById = (programId: number) => {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: [API.PROGRAM.DETAIL(programId)],
    queryFn: () =>
      getProgramById(programId).then((res) => {
        queryClient.setQueryData<ProgramStatus>(
          ["programStatus", programId],
          res.programStatus,
        );
        queryClient.setQueryData<ProgramType>(
          ["programType", programId],
          res.type,
        );
        return res;
      }),
  });
};
