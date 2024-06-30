"use client";

import MemberTableWrapper from "@/components/common/memberTable/MemberTableWrapper";
import Title from "@/components/common/Title";

const MemberManageSection = () => {
  return (
    <section>
      <Title text="회원 관리하기" />
      <MemberTableWrapper applyLayout>
        <MemberTableWrapper.StatusTab />
        <div className="overflow-x-scroll scrollbar-hide">
          <MemberTableWrapper.Header formType="manage" />
          <MemberTableWrapper.ManageList />
        </div>
      </MemberTableWrapper>
    </section>
  );
};

export default MemberManageSection;
