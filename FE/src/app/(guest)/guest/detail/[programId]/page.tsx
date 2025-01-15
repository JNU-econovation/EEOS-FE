import ProgramHeaderSection from "@/components/feature/detail/program/ProgramHeaderSection";
import ProgramDetailSection from "@/components/feature/detail/program/ProgramDetailSection";
import UserAttendModalSection from "@/components/feature/detail/userAttendModal/UserAttendModalSection";
import ProgramPresentationsSection from "@/components/feature/detail/presentation/ProgramPresentationsSection";
import BlurDashboard from "@/components/feature/detail/Dashboard/BlurDashboard";
import ATTEND_STATUS from "@/constants/ATTEND_STATUS";
import BlurredAttendee from "@/components/feature/detail/attendee/BlurredAttendee";

const ProgramDetailPage = () => {
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
        <BlurredAttendee key={status} status={status} />
      ))}
      <UserAttendModalSection isLoggedIn={false} />
    </div>
  );
};

export default ProgramDetailPage;
