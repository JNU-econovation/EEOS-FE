"use client";

import ManageTable from "./memberManageTable/ManageTable";
import Tab from "@/components/common/tabs/TabCompound/TabCompound";
import Title from "@/components/common/Title";

type MemberTabItem = "all" | "am" | "rm" | "cm" | "ob";
const memberTabItemList: MemberTabItem[] = ["all", "am", "rm", "cm", "ob"];

const MemberManageSection = () => {
  return (
    <section>
      <Title text="회원 관리하기" />
      <div className="mt-8">
        <Tab<MemberTabItem>
          align="line"
          defaultSelected={memberTabItemList[0]}
          nonPickedColor="gray"
          pickedColor="teal"
          tabItemList={memberTabItemList}
          tabSize="lg"
        >
          <Tab.List>
            {memberTabItemList.map((tabItem) => (
              <Tab.Item key={tabItem} text={tabItem} />
            ))}
          </Tab.List>
          <Tab.Content<MemberTabItem>>
            {({ selectedItem }) => (
              <div className="mt-6">
                <ManageTable selectedItem={selectedItem} />
              </div>
            )}
          </Tab.Content>
        </Tab>
      </div>
    </section>
  );
};

export default MemberManageSection;
