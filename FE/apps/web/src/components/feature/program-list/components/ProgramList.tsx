import Pagination from "@/components/common/pagination/Pagination";
import ProgramListItem from "./ProgramListItem";
import PROGRAM from "@/constants/PROGRAM";
import { useGetProgramList } from "@/hooks/query/useProgramQuery";
import { AccessType } from "@/types/access";
import { ProgramCategoryWithAll, ProgramStatus } from "@/types/program";

interface ProgramListProps {
  category: ProgramCategoryWithAll;
  programStatus: ProgramStatus;
  page: number;
  onPageChange: (page: number) => void;
  accessType: AccessType;
}

/**
 * 프로그램 목록 컴포넌트
 *
 * 개선사항:
 * - queryClient.setQueryData 안티패턴 제거
 * - totalPage를 쿼리 데이터에서 직접 사용
 * - Props명 contentType → accessType으로 통일
 * - page 타입을 number로 변경
 */
export default function ProgramList({
  category,
  programStatus,
  page,
  onPageChange,
  accessType,
}: ProgramListProps) {
  const isAdmin = accessType === "admin";
  const { data: programListData } = useGetProgramList({
    category,
    programStatus,
    page: page - 1, // 0-based index
    size: PROGRAM.LIST_SIZE,
    isAdmin,
  });

  const { programs, totalPage } = programListData;

  return (
    <>
      <div className="w-full space-y-5">
        {programs.map((program) => (
          <ProgramListItem
            key={program.programId}
            programData={program}
            accessType={accessType}
          />
        ))}
      </div>
      <Pagination
        totalPage={totalPage}
        currentPage={page}
        onChange={onPageChange}
      />
    </>
  );
}
