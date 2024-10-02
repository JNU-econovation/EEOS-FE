import { useContext } from "react";
import { MemberContext } from "../MemberTableWrapper";
import Tab from "@/components/common/tabs/tab/Tab";
import ACTIVE_STATUS from "@/constants/ACTIVE_STATUS";
import { ActiveStatusWithAll } from "@/types/member";

/**
 * 멤버 테이블의 상태 탭 컴포넌트
 */
const StatusTab = () => {
  const {
    tab: { selectedActive, setSelectedActive },
  } = useContext(MemberContext);

  return (
    <Tab<ActiveStatusWithAll>
      options={Object.values(ACTIVE_STATUS.TAB_WITH_ALL)}
      selected={selectedActive}
      onItemClick={(v) => setSelectedActive(v)}
      size="lg"
      baseColor="gray"
      pointColor="teal"
      align="line"
    />
  );
};
export default StatusTab;
