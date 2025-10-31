import BlurredAttendee from "@/components/feature/detail/attendee/BlurredAttendee";
import BlurDashboard from "@/components/feature/detail/Dashboard/BlurDashboard";
import ProgramDetailSection from "@/components/feature/detail/program/ProgramDetailSection";
import ProgramHeaderSection from "@/components/feature/detail/program/ProgramHeaderSection";
import UserAttendModalSection from "@/components/feature/detail/userAttendModal/UserAttendModalSection";

const ProgramDetailPage = () => {
  return (
    <div>
      <section>
        <ProgramHeaderSection />
        <ProgramDetailSection />
        <div className="mt-12" />
        <BlurredAttendee />
        <div className="mt-12" />
        <BlurDashboard />
        <div className="mt-24" />
      </section>
      <UserAttendModalSection isLoggedIn={false} />
    </div>
  );
};

export default ProgramDetailPage;
