import { useQueryClient } from "@tanstack/react-query";
import Paginataion from "../common/pagination/Pagination";
import ProgramListItem from "./ProgramListItem";
import PROGRAM from "@/constants/PROGRAM";
import { useGetProgramList } from "@/hooks/query/useProgramQuery";
import { AccessType } from "@/types/access";
import { ProgramCategoryWithAll, ProgramStatus } from "@/types/program";

interface ProgramListProps {
  category?: ProgramCategoryWithAll;
  programStatus?: ProgramStatus;
  page?: number;
  setPage: (page: number) => void;
  contentType: AccessType;
}

const ProgramList = ({
  category = "all",
  programStatus = "active",
  page = 1,
  setPage: handleSetPage,
  contentType,
}: ProgramListProps) => {
  const isAdmin = contentType === "admin";
  const queryClient = useQueryClient();
  const { data: programListData } = useGetProgramList({
    category,
    programStatus,
    page: page - 1,
    size: PROGRAM.LIST_SIZE,
    isAdmin,
  });

  // TODO: 전역 상태로 관리
  queryClient.setQueryData<number>(["totalPage"], programListData.totalPage);
  const { programs } = programListData;

  return (
    <>
      <div className="w-full space-y-5">
        {programs.map((program) => (
          <ProgramListItem
            key={program.programId}
            programData={program}
            contentType={contentType}
          />
        ))}
      </div>
      <Paginataion
        totalPage={programListData.totalPage}
        currentPage={page}
        onChange={(v) => handleSetPage(v)}
      />
    </>
  );
};
export default ProgramList;
