import AttendeeInfoSection from "@/components/feature/detail/attendee/AttendeeInfoSection";
import ProgramDashboardSection from "@/components/feature/detail/Dashboard/ProgramDashboardSection";
import ProgramAttendModeManageSection from "@/components/feature/detail/program/ProgramAttendStatusManageSection";
import ProgramDetailSection from "@/components/feature/detail/program/ProgramDetailSection";
import ProgramHeaderSection from "@/components/feature/detail/program/ProgramHeaderSection";

const ProgramDetailPage = () => {
  return (
    <section className="">
      <ProgramHeaderSection />
      <ProgramDetailSection />
      <div className="mt-12" />
      <ProgramAttendModeManageSection />
      <div className="mt-16" />
      <AttendeeInfoSection />
      <div className="mt-12" />
      <ProgramDashboardSection />
      <div className="mt-24" />
    </section>
  );
};

export default ProgramDetailPage;
