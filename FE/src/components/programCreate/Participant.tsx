"use client";

import MemberActiveStatusTab from "../common/tabs/MemberActiveStatusTab";
import ParticipantTable from "./participantTable/ParticipantTable";

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
    <section>
      <MemberActiveStatusTab>
        {(selectedItem) => (
          <div className="mt-6">
            <ParticipantTable
              members={members}
              setMembers={setMembers}
              selectedActive={selectedItem}
              onClickHeaderCheckBox={onClickHeaderCheckBox}
            />
          </div>
        )}
      </MemberActiveStatusTab>
    </section>
  );
};

export default Participant;

{
  /* 
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
</MemberTableWrapper> */
}
