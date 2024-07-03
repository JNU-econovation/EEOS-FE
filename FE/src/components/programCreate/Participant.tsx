"use client";

import MemberTableWrapper from "../common/memberTable/MemberTableWrapper";

interface MemberTableProps {
  members: Set<number>;
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
          members={members as Set<number>}
          setMembers={setMembers as (memberId: number) => void}
        />
      </div>
    </MemberTableWrapper>
  );
};

export default Participant;
