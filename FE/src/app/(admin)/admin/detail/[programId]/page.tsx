import AttendeeInfoContainer from "@/components/programDetail/attendee/AttendeeInfo.container";
import ProgramInfo from "@/components/programDetail/program/ProgramInfo";

interface ProgramDetailPageProps {
  params: {
    programId: string;
  };
}

const ProgramDetailPage = ({ params }: ProgramDetailPageProps) => {
  const { programId } = params;

  return (
    <div className="mb-16 space-y-16">
      <ProgramInfo programId={+programId} accessType="admin" />
      <AttendeeInfoContainer programId={+programId} isLoggedIn />
    </div>
  );
};
export default ProgramDetailPage;
