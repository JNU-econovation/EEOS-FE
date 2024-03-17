import { useQuery } from "@tanstack/react-query";
import { ProgramCategoryWithAll, ProgramStatus } from "../types";
import { ProgramListDto } from "./dtos";
import { https } from "@/apis/instance";
import API from "@/constants/API";

interface GetProgramListRequest {
  category: ProgramCategoryWithAll;
  programStatus: ProgramStatus;
  size: number;
  page: number;
}

const getProgramList = async ({
  category,
  programStatus,
  size,
  page,
}: GetProgramListRequest): Promise<ProgramListDto> => {
  const { data } = await https({
    url: API.PROGRAM.LIST,
    method: "GET",
    params: {
      category,
      programStatus,
      size,
      page,
    },
  });
  return new ProgramListDto(data?.data);
};

export const useGetProgramList = ({
  category,
  programStatus,
  size,
  page,
}: GetProgramListRequest) => {
  return useQuery({
    queryKey: [API.PROGRAM.LIST, category, programStatus, size, page],
    queryFn: () => getProgramList({ category, programStatus, size, page }),
    select: (data) => ({
      totalPage: data?.totalPage,
      programs: data?.programs,
    }),
    suspense: true,
  });
};
