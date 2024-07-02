"use client";

import MemberTableWrapper from "../common/memberTable/MemberTableWrapper";
import { Members } from "@/components/programEdit/ProgramEditForm";

interface MemberTableProps {
  members: Set<number> | Map<number, Members>;
  setMembers: (memberId: number) => void;
  onClickHeaderCheckBox?: (selected: boolean) => void;
}

const Participant = ({
  members,
  setMembers,
  onClickHeaderCheckBox,
}: MemberTableProps) => {
  return (
    <MemberTableWrapper applyLayout>
      <MemberTableWrapper.StatusTab />
      <div className="overflow-x-scroll scrollbar-hide">
        <MemberTableWrapper.Header
          formType="create"
          onClickCheckBox={onClickHeaderCheckBox}
        />

        <MemberTableWrapper.CreateList
          members={members}
          setMembers={setMembers as (memberId: number) => void}
        />
      </div>
    </MemberTableWrapper>
  );
};

export default Participant;
