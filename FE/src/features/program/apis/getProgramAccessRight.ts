import { useQuery } from "@tanstack/react-query";
import { ProgramAccessRightDto } from "./dtos";
import API from "@/constants/API";
import { https } from "@/utils/axios";

const getProgramAccessRight = async (
  programId: number,
): Promise<ProgramAccessRightDto> => {
  const { data } = await https({
    url: API.PROGRAM.ACCESS_RIGHT(programId),
    method: "GET",
  });
  return data?.data;
};

export const useGetProgramAccessRight = (programId: number) => {
  return useQuery({
    queryKey: [API.PROGRAM.ACCESS_RIGHT(programId)],
    queryFn: () => getProgramAccessRight(programId),
  });
};
