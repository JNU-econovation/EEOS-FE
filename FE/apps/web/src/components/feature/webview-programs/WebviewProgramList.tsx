"use client";

import { ProgramStatus } from "@/types/program";
import { useGetProgramListInWebviewInfinite } from "@/hooks/query/useProgramQuery";
import PROGRAM from "@/constants/PROGRAM";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

interface WebviewProgramListProps {
  selectedTab: ProgramStatus;
}

const WebviewProgramList = ({ selectedTab }: WebviewProgramListProps) => {
  // 1. 무한 스크롤 훅 사용
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useGetProgramListInWebviewInfinite({
    category: "all",
    programStatus: selectedTab,
    size: PROGRAM.LIST_SIZE,
  });

  // 2. Intersection Observer 설정
  const { ref, inView } = useInView({
    threshold: 0,
    rootMargin: "100px",
  });

  // 3. 화면에 보이면 다음 페이지 fetch
  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  // 4. 로딩 상태
  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-gray-500">로딩 중...</p>
      </div>
    );
  }

  // 5. 에러 상태
  if (isError) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-red-500">프로그램을 불러오는데 실패했습니다.</p>
      </div>
    );
  }

  // 6. 데이터 평탄화
  const programs = data?.pages.flatMap((page) => page.programs) ?? [];

  // 7. 빈 데이터
  if (programs.length === 0) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-gray-500">프로그램이 없습니다.</p>
      </div>
    );
  }

  // 8. 리스트 렌더링
  return (
    <ul className="flex h-full flex-col gap-6 overflow-y-auto">
      {programs.map((program, index) => {
        const isLastItem = index === programs.length - 1;

        return (
          <li
            key={program.programId}
            ref={isLastItem ? ref : null}
            className="flex gap-2"
          >
            <div className="h-11 w-11 shrink-0 rounded-lg bg-gray-300"></div>
            <div className="grow">
              <p className="text-xl font-semibold">{program.title}</p>
              <p className="text-sm font-bold text-green-600">
                {program.attendMode === "attend" && "출석체크중"}
                {program.attendMode === "late" && "지각체크중"}
                {program.attendMode === "non_open" && "출석 전"}
                {program.attendMode === "end" && "출석 종료"}
              </p>
            </div>
          </li>
        );
      })}

      {/* 다음 페이지 로딩 */}
      {isFetchingNextPage && (
        <li className="flex items-center justify-center py-4">
          <p className="text-sm text-gray-500">더 불러오는 중...</p>
        </li>
      )}

      {/* 마지막 페이지 */}
      {!hasNextPage && programs.length > 0 && (
        <li className="flex items-center justify-center py-4">
          <p className="text-sm text-gray-400">모든 프로그램을 불러왔습니다.</p>
        </li>
      )}
    </ul>
  );
};

export default WebviewProgramList;
