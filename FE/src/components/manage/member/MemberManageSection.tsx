"use client";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import MemberTable from "@/components/common/memberTable/MemberTable";
import Title from "@/components/common/Title";
import EditMemberTableItemContainer from "@/components/programEdit/EditMemberTableItemContainer";

const MemberManageSection = () => {
  const queryClient = useQueryClient();
  const [members, setMembers] = useState<Set<number>>(new Set<number>());

  const updateMembers = (memberId: number) => {
    const newMembers = new Set<number>(members);
    newMembers.has(memberId)
      ? newMembers.delete(memberId)
      : newMembers.add(memberId);
    setMembers(newMembers);
  };

  const updateAllMembers = (selected: boolean) => {
    const newMembers = new Set<number>(members);
    const memberIdList: number[] = queryClient.getQueryData(["memberIdList"]);
    if (selected) {
      memberIdList.forEach((v) => newMembers.add(v));
    }
    if (!selected) {
      memberIdList.forEach((v) => newMembers.delete(v));
    }
    setMembers(newMembers);
  };

  return (
    <section>
      <Title text="회원 관리하기" />
      {/* <MemberTable
        formType="create"
        members={members}
        setMembers={updateMembers}
        onClickHeaderCheckBox={updateAllMembers}
      /> */}

      {/* <EditMemberTableItemContainer /> */}
    </section>
  );
};

export default MemberManageSection;
