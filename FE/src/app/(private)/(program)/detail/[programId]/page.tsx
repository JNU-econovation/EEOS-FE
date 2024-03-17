import BottonSheet from "@/components/common/BottomSheet";
import { AttendeeInfoGroup } from "@/features/member";
import { ProgramViewer } from "@/features/program";
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
      <ProgramViewer programId={+programId} />
      <AttendeeInfoGroup programId={+programId} />
      <BottonSheet>
        <UserAttendStatusEditor programId={+programId} />
      </BottonSheet>
    </div>
  );
};
export default ProgramDetailPage;
