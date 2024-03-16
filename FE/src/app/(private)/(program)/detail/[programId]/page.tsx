import BottonSheet from "@/components/common/BottomSheet";
import ProgramInfo from "@/components/programDetail/program/ProgramInfo";
import { AttendeeInfoGroup } from "@/features/member";
import { UserAttendStatusEditor } from "@/features/user";

interface ProgramDetailPageProps {
  params: {
    programId: string;
  };
}

const ProgramDetailPage = ({ params }: ProgramDetailPageProps) => {
  const { programId } = params;

  return (
    <div className="mb-16 space-y-16">
      <ProgramInfo programId={+programId} />
      <AttendeeInfoGroup programId={+programId} />
      <BottonSheet>
        <UserAttendStatusEditor programId={+programId} />
      </BottonSheet>
    </div>
  );
};
export default ProgramDetailPage;
