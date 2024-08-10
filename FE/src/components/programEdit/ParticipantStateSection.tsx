// import MemberTableWrapper from "../common/memberTable/MemberTableWrapper";
import MemberActiveStatusTab from "../common/tabs/MemberActiveStatusTab";
import AttendStateTable from "./AttendStateTable/AttendStateTable";

interface ParticipantStateSectionProps {
  programId: number;
  setMembers: (memberId: number, before: string, after: string) => void;
}

const ParticipantStateSection = ({
  programId,
  setMembers,
}: ParticipantStateSectionProps) => {
  return (
    <section>
      <MemberActiveStatusTab>
        {(selectedItem) => (
          <div className="mt-6">
            <AttendStateTable
              programId={programId}
              selectedActive={selectedItem}
              isEnableEdit={true}
              setMembers={setMembers}
            />
          </div>
        )}
      </MemberActiveStatusTab>
    </section>
  );
};

export default ParticipantStateSection;
