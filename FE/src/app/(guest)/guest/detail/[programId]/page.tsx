import AttendeeInfoContainer from "@/components/feature/detail/attendee/AttendeeInfo.container";
import ProgramHeaderSection from "@/components/feature/detail/program/ProgramHeaderSection";
import ProgramDetailSection from "@/components/feature/detail/program/ProgramDetailSection";
import UserAttendModalContainer from "@/components/feature/detail/userAttendModal/UserAttendModal.container";

interface ProgramDetailPageProps {
  params: {
    programId: string;
  };
}

const ProgramDetailPage = ({ params }: ProgramDetailPageProps) => {
  const { programId } = params;

  return (
    <div className="mb-16 space-y-16">
      <section className="space-y-8">
        <ProgramHeaderSection />
        <ProgramDetailSection />
      </section>
      <AttendeeInfoContainer programId={+programId} isLoggedIn={false} />
      <UserAttendModalContainer programId={+programId} isLoggedIn={false} />
    </div>
  );
};
export default ProgramDetailPage;
