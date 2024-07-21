"use client";

import MemberTable from "./MemberTable";
import Title from "@/components/common/Title";

const MemberManageSection = () => {
  return (
    <section>
      <Title text="회원 관리하기" />
      <MemberTable />
    </section>
  );
};

export default MemberManageSection;
