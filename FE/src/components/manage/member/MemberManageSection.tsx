"use client";

import ManageTable from "./memberManageTable/ManageTable";
import TabAsChild from "@/components/common/tabs/TabAsChild/TabAsChild";
import Title from "@/components/common/Title";
// import ACTIVE_STATUS from "@/constants/ACTIVE_STATUS";
// import { ActiveStatusWithAll } from "@/types/member";

type MemberTabItem = "all" | "am" | "rm" | "cm" | "ob";
const memberTabItemList: MemberTabItem[] = ["all", "am", "rm", "cm", "ob"];

const MemberManageSection = () => {
  return (
    <section>
      <Title text="회원 관리하기" />

      <TabAsChild<MemberTabItem>
        defaultSelected="all"
        tabItemList={memberTabItemList}
        tabSize="lg"
        nonPickedColor="gray"
        pickedColor="teal"
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
