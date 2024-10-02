import { useGetProgramByProgramId } from "@/hooks/query/useProgramQuery";
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
  const { data: programData, status } = useGetProgramByProgramId(
    programId,
    true,
  );

  const isEnableEdit =
    status === "success" &&
    programData?.attendMode !== "attend" &&
    programData?.attendMode !== "late";

  return (
    <section>
      <MemberActiveStatusTab>
        {(selectedItem) => (
          <div className="mt-6">
            <AttendStateTable
              programId={programId}
              selectedActive={selectedItem}
              isEnableEdit={isEnableEdit}
              setMembers={setMembers}
            />
          </div>
        )}
      </MemberActiveStatusTab>
    </section>
  );
};

export default ParticipantStateSection;
