import AppSafeArea from "@/components/common/AppSafeArea/AppSafeArea";
import Spacing from "@/components/common/Spacing";
import AttendeeInfoSection from "@/components/feature/detail/attendee/AttendeeInfoSection";
import ProgramDashboardSection from "@/components/feature/detail/Dashboard/ProgramDashboardSection";
import FireFIngerSection from "@/components/feature/detail/fireFinger/FireFIngerSection";
import ProgramDetailSection from "@/components/feature/detail/program/ProgramDetailSection";
import ProgramHeaderSection from "@/components/feature/detail/program/ProgramHeaderSection";
import UserAttendModalSection from "@/components/feature/detail/userAttendModal/UserAttendModalSection";
import WebviewProgramHeaderSection from "@/components/feature/webview-programs/WebviewProgramHeaderSection";
import { SsgoiTransition } from "@ssgoi/react";

const ProgramDetailPage = () => {
  return (
    <SsgoiTransition
      id="/program/[programId]"
      className="relative max-h-screen min-h-screen overflow-auto bg-white"
    >
      <WebviewProgramHeaderSection />
      <ProgramDetailSection />
      <section className="px-4">
        {/* <ProgramHeaderSection /> */}
        <div className="mt-12" />
        <FireFIngerSection />
        <div className="mt-12" />
        <AttendeeInfoSection />
        <div className="mt-12" />
        <ProgramDashboardSection />
        <div className="mt-24" />
      </section>
      {/* <UserAttendModalSection isLoggedIn /> */}
    </SsgoiTransition>
  );
};

export default ProgramDetailPage;
