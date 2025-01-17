import AttendeeInfoSection from "@/components/feature/detail/attendee/AttendeeInfoSection";
import ProgramHeaderSection from "@/components/feature/detail/program/ProgramHeaderSection";
import ProgramDetailSection from "@/components/feature/detail/program/ProgramDetailSection";
import ProgramAttendModeManageSection from "@/components/feature/detail/program/ProgramAttendStatusManageSection";
import ProgramPresentationsSection from "@/components/feature/detail/presentation/ProgramPresentationsSection";
import ProgramDashboardSection from "@/components/feature/detail/Dashboard/ProgramDashboardSection";

const ProgramDetailPage = () => {
  return (
    <div className="mb-16 space-y-16">
      <section className="space-y-8">
        <ProgramHeaderSection />
        <ProgramDetailSection />
        <ProgramAttendModeManageSection />
        <ProgramPresentationsSection />
        <div className="mt-12">
          <ProgramDashboardSection />
        </div>
      </section>
      <AttendeeInfoSection />
    </div>
  );
};

export default ProgramDetailPage;
