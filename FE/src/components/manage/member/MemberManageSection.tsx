"use client";

import ManageTable from "./memberManageTable/ManageTable";
import MemberActiveStatusTab from "@/components/common/tabs/MemberActiveStatusTab";
import Title from "@/components/common/Title";

const MemberManageSection = () => {
  return (
    <section>
      <Title text="회원 관리하기" />
      <div className="mt-8">
        <MemberActiveStatusTab>
          {(selectedItem) => (
            <div className="mt-6">
              <ManageTable selectedItem={selectedItem} />
            </div>
          )}
        </MemberActiveStatusTab>
      </div>
    </section>
  );
};

export default MemberManageSection;
