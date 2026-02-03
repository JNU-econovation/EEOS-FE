"use client";

import { useProgramFilters } from "./hooks/useProgramFilters";
import ProgramCategoryTab from "./components/ProgramCategoryTab";
import ProgramStatusTab from "./components/ProgramStatusTab";
import ProgramListContent from "./components/ProgramListContent";
import { AccessType } from "@/types/access";

interface ProgramListSectionProps {
  accessType: AccessType;
}

/**
 * 프로그램 목록 섹션 메인 컴포넌트
 *
 * Headless 패턴을 적용하여 UI와 로직을 분리:
 * - 로직: useProgramFilters 훅이 담당
 * - UI: 하위 컴포넌트 조합만 수행
 *
 * Context API를 사용하지 않고 props로 데이터 전달 (최대 깊이 2단계)
 *
 * @param accessType - 사용자 권한 타입 (private, admin, public)
 */
export default function ProgramListSection({
  accessType,
}: ProgramListSectionProps) {
  const { filters, setCategory, setStatus, setPage } = useProgramFilters();

  return (
    <div className="relative space-y-8">
      <ProgramCategoryTab selected={filters.category} onSelect={setCategory} />
      <ProgramStatusTab selected={filters.status} onSelect={setStatus} />
      <ProgramListContent
        filters={filters}
        onPageChange={setPage}
        accessType={accessType}
      />
    </div>
  );
}
