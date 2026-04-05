import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "@/components/common/error/ErrorFallback";
import ProgramList from "./ProgramList";
import ProgramListLoader from "./ProgramListLoader";
import { ProgramFilters } from "../hooks/useProgramFilters";
import { AccessType } from "@/types/access";

interface ProgramListContentProps {
  filters: ProgramFilters;
  onPageChange: (page: number) => void;
  accessType: AccessType;
}

/**
 * 프로그램 목록 콘텐츠 래퍼 컴포넌트
 *
 * ErrorBoundary와 Suspense로 래핑하여 에러 및 로딩 상태 처리
 */
export default function ProgramListContent({
  filters,
  onPageChange,
  accessType,
}: ProgramListContentProps) {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Suspense fallback={<ProgramListLoader />}>
        <ProgramList
          category={filters.category}
          programStatus={filters.status}
          page={filters.page}
          onPageChange={onPageChange}
          accessType={accessType}
        />
      </Suspense>
    </ErrorBoundary>
  );
}
