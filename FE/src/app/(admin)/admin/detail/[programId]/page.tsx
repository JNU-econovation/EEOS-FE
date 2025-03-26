import AttendeeInfoSection from "@/components/feature/detail/attendee/AttendeeInfoSection";
import ProgramHeaderSection from "@/components/feature/detail/program/ProgramHeaderSection";
import ProgramDetailSection from "@/components/feature/detail/program/ProgramDetailSection";
import ProgramAttendModeManageSection from "@/components/feature/detail/program/ProgramAttendStatusManageSection";
import ProgramDashboardSection from "@/components/feature/detail/Dashboard/ProgramDashboardSection";

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
