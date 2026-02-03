import Tab from "@/components/common/tabs/tab/Tab";
import PROGRAM from "@/constants/PROGRAM";
import { ProgramCategoryWithAll } from "@/types/program";

interface ProgramCategoryTabProps {
  selected: ProgramCategoryWithAll;
  onSelect: (category: ProgramCategoryWithAll) => void;
}

/**
 * 프로그램 카테고리 탭 컴포넌트
 *
 * Context 의존성 제거, props 기반으로 변경
 */
export default function ProgramCategoryTab({
  selected,
  onSelect,
}: ProgramCategoryTabProps) {
  return (
    <Tab<ProgramCategoryWithAll>
      options={Object.values(PROGRAM.CATEGORY_TAB_WITH_ALL)}
      selected={selected}
      onItemClick={onSelect}
      size="lg"
      baseColor="white"
      pointColor="navy"
      align="line"
    />
  );
}
