import ProgramListItemSkeleton from "./ProgramListItemSkeleton";

/**
 * 프로그램 목록 로더 컴포넌트
 *
 * 6개의 스켈레톤 아이템을 펄스 애니메이션과 함께 표시
 */
export default function ProgramListLoader() {
  return (
    <div className="animate-pulse space-y-5">
      <ProgramListItemSkeleton />
      <ProgramListItemSkeleton />
      <ProgramListItemSkeleton />
      <ProgramListItemSkeleton />
      <ProgramListItemSkeleton />
      <ProgramListItemSkeleton />
    </div>
  );
}
