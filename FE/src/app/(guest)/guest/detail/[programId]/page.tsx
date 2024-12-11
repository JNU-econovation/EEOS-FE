import ProgramHeaderSection from "@/components/feature/detail/program/ProgramHeaderSection";
import ProgramDetailSection from "@/components/feature/detail/program/ProgramDetailSection";
import UserAttendModalSection from "@/components/feature/detail/userAttendModal/UserAttendModalSection";
import ProgramPresentationsSection from "@/components/feature/detail/presentation/ProgramPresentationsSection";
import BlurDashboard from "@/components/feature/detail/Dashboard/BlurDashboard";
import BluredAttedee from "@/components/feature/detail/attendee/BluredAttedee";
import ATTEND_STATUS from "@/constants/ATTEND_STATUS";

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
        <ProgramPresentationsSection />
        <div className="mt-12">
          <BlurDashboard />
        </div>
      </section>
      {ATTEND_STATUS.STATUSES.map((status) => (
        <BluredAttedee key={status} status={status} />
      ))}
      <UserAttendModalSection isLoggedIn={false} />
    </div>
  );
};

export default ProgramDetailPage;
