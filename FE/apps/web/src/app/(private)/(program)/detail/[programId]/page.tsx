import AttendeeInfoSection from "@/components/feature/detail/attendee/AttendeeInfoSection";
import ProgramDashboardSection from "@/components/feature/detail/Dashboard/ProgramDashboardSection";
import FireFIngerSection from "@/components/feature/detail/fireFinger/FireFIngerSection";
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
        <FireFIngerSection />
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
