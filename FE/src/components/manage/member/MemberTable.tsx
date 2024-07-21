import ManageTable from "./MemberTable/ManageTable";
import TabAsChild from "@/components/common/tabs/TabAsChild/TabAsChild";
import ACTIVE_STATUS from "@/constants/ACTIVE_STATUS";
import { ActiveStatusWithAll } from "@/types/member";

const MemberTable = () => {
  return (
    <TabAsChild<ActiveStatusWithAll>
      defaultSelected="all"
      options={Object.values(ACTIVE_STATUS.TAB_WITH_ALL)}
      tabSize="lg"
      baseColor="gray"
      pointColor="teal"
      align="line"
    >
      {({ selectedItem }) => (
        <div className="mt-4">
          <ManageTable selectedItem={selectedItem} />
        </div>
      )}
    </TabAsChild>
  );
};

export default MemberTable;
