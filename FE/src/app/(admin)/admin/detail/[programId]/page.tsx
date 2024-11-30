import AttendeeInfoContainer from "@/components/feature/detail/attendee/AttendeeInfo.container";
import ProgramHeaderSection from "@/components/feature/detail/program/ProgramHeaderSection";
import ProgramDetailSection from "@/components/feature/detail/program/ProgramDetailSection";
import ProgramattendModeManageSection from "@/components/feature/detail/program/ProgramAttendStatusManageSection";
import ProgramPresentationsSection from "@/components/feature/detail/presentation/ProgramPresentationsSection";
import ProgramDashboardSection from "@/components/feature/detail/Dashboard/ProgramDashboardSection";

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
        <ProgramattendModeManageSection />
        <ProgramPresentationsSection />
        <div className="mt-12">
          <ProgramDashboardSection />
        </div>
      </section>
      <AttendeeInfoContainer programId={+programId} isLoggedIn />
    </div>
  );
};
export default ProgramDetailPage;
