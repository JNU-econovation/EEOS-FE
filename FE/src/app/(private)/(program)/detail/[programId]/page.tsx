import BottonSheet from "@/components/common/BottomSheet";
import AttendeeInfoContainer from "@/components/programDetail/attendee/AttendeeInfo.container";
import ProgramInfo from "@/components/programDetail/program/ProgramInfo";
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
      <AttendeeInfoContainer programId={+programId} />
      <BottonSheet>
        <UserAttendStatusEditor programId={+programId} />
      </BottonSheet>
    </div>
  );
};
export default ProgramDetailPage;
