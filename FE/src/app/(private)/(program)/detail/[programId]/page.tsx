import dynamic from "next/dynamic";
import AttendeeInfoSection from "@/components/feature/detail/attendee/AttendeeInfoSection";
import ProgramHeaderSection from "@/components/feature/detail/program/ProgramHeaderSection";
import ProgramDetailSection from "@/components/feature/detail/program/ProgramDetailSection";
import UserAttendModalSection from "@/components/feature/detail/userAttendModal/UserAttendModalSection";
import ProgramPresentationsSection from "@/components/feature/detail/presentation/ProgramPresentationsSection";

// import ProgramDashboardSection from "@/components/feature/detail/Dashboard/ProgramDashboardSection";
const ProgramDashboardSection = dynamic(
  () => import("@/components/feature/detail/Dashboard/ProgramDashboardSection"),
  { ssr: false },
);

const ProgramDetailPage = () => {
  return (
    <div className="mb-16 space-y-16">
      <section className="space-y-8">
        <ProgramHeaderSection />
        <ProgramDetailSection />
        <ProgramPresentationsSection />
        <div className="mt-12">
          <ProgramDashboardSection />
        </div>
      </section>
      <AttendeeInfoSection />
      <UserAttendModalSection isLoggedIn />
    </div>
  );
};

export default ProgramDetailPage;
