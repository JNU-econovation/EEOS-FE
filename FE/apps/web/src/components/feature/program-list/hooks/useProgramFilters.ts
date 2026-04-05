"use client";

import { useCallback, useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ProgramCategoryWithAll, ProgramStatus } from "@/types/program";

/**
 * 프로그램 필터 상태
 */
export interface ProgramFilters {
  category: ProgramCategoryWithAll;
  status: ProgramStatus;
  page: number;
}

/**
 * 프로그램 필터 관리 훅 반환 타입
 */
export interface UseProgramFiltersReturn {
  filters: ProgramFilters;
  setCategory: (category: ProgramCategoryWithAll) => void;
  setStatus: (status: ProgramStatus) => void;
  setPage: (page: number) => void;
}

/**
 * 프로그램 필터 관리 커스텀 훅
 *
 * URL 쿼리 파라미터를 단일 소스로 사용하여 필터 상태를 관리합니다.
 * - useEffect 체인 제거: searchParams를 직접 읽어 파생 상태로 사용
 * - window.history.replaceState 대신 router.replace 사용
 * - page 타입을 number로 통일
 *
 * @returns 필터 상태 및 setter 함수들
 */
export function useProgramFilters(): UseProgramFiltersReturn {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // searchParams를 직접 읽어 파생 상태로 사용 (단일 소스)
  const filters: ProgramFilters = useMemo(() => {
    const category = searchParams.get("category") as ProgramCategoryWithAll;
    const status = searchParams.get("status") as ProgramStatus;
    const pageParam = searchParams.get("page");

    return {
      category: category ?? "all",
      status: status ?? "active",
      page: pageParam ? Number(pageParam) : 1,
    };
  }, [searchParams]);

  // URL 업데이트 헬퍼
  const updateSearchParams = useCallback(
    (updates: Partial<ProgramFilters>) => {
      const params = new URLSearchParams(searchParams.toString());

      Object.entries(updates).forEach(([key, value]) => {
        params.set(key, String(value));
      });

      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [searchParams, router, pathname]
  );

  // 카테고리 변경 (페이지 자동 리셋)
  const setCategory = useCallback(
    (category: ProgramCategoryWithAll) => {
      updateSearchParams({ category, page: 1 });
    },
    [updateSearchParams]
  );

  // 상태 변경 (페이지 자동 리셋)
  const setStatus = useCallback(
    (status: ProgramStatus) => {
      updateSearchParams({ status, page: 1 });
    },
    [updateSearchParams]
  );

  // 페이지 변경
  const setPage = useCallback(
    (page: number) => {
      updateSearchParams({ page });
    },
    [updateSearchParams]
  );

  return { filters, setCategory, setStatus, setPage };
}
