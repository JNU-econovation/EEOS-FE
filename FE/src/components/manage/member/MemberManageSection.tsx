"use client";

import ManageTable from "./memberManageTable/ManageTable";
import TabAsChild from "@/components/common/tabs/TabAsChild/TabAsChild";
import Title from "@/components/common/Title";
import ACTIVE_STATUS from "@/constants/ACTIVE_STATUS";
import { ActiveStatusWithAll } from "@/types/member";

const MemberManageSection = () => {
  return (
    <section>
      <Title text="회원 관리하기" />

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
    </section>
  );
};

export default MemberManageSection;
