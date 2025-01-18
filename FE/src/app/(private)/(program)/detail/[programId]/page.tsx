import AttendeeInfoSection from "@/components/feature/detail/attendee/AttendeeInfoSection";
import ProgramHeaderSection from "@/components/feature/detail/program/ProgramHeaderSection";
import ProgramDetailSection from "@/components/feature/detail/program/ProgramDetailSection";
import UserAttendModalSection from "@/components/feature/detail/userAttendModal/UserAttendModalSection";
import ProgramDashboardSection from "@/components/feature/detail/Dashboard/ProgramDashboardSection";

const ProgramDetailPage = () => {
  return (
    <div>
      <section>
        <ProgramHeaderSection />
        <ProgramDetailSection />
        <div className="mt-12" />
        <AttendeeInfoSection />
        <div className="mt-12" />
        <ProgramDashboardSection />
        <div className="mt-24" />
      </section>
      <UserAttendModalSection isLoggedIn />
    </div>
  );
};

export default ProgramDetailPage;
