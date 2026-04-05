import TextTab from "@/components/common/tabs/tab/TextTab";
import PROGRAM from "@/constants/PROGRAM";
import { ProgramStatus } from "@/types/program";

interface ProgramStatusTabProps {
  selected: ProgramStatus;
  onSelect: (status: ProgramStatus) => void;
}

/**
 * 프로그램 상태 탭 컴포넌트
 *
 * Context 의존성 제거, props 기반으로 변경
 */
export default function ProgramStatusTab({
  selected,
  onSelect,
}: ProgramStatusTabProps) {
  return (
    <TextTab<ProgramStatus>
      options={Object.values(PROGRAM.STATUS_TAB)}
      selected={selected}
      onClick={onSelect}
    />
  );
}
