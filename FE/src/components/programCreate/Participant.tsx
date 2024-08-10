"use client";

import MemberActiveStatusTab from "../common/tabs/MemberActiveStatusTab";
import ParticipantTable from "./participantTable/ParticipantTable";

interface MemberTableProps {
  members: Set<number>;
  setMembers: (memberId: number) => void;
  clearMembers: () => void;
  setAllMembers: (memberList: number[]) => void;
}

const Participant = ({
  members,
  setMembers,
  clearMembers,
  setAllMembers,
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
              clearMembers={clearMembers}
              setAllMembers={setAllMembers}
            />
          </div>
        )}
      </MemberActiveStatusTab>
    </section>
  );
};

export default Participant;
