import Spacing from "@/components/common/Spacing";
import ProgramDashboardSection from "@/components/feature/detail/Dashboard/ProgramDashboardSection";
import ProgramDetailSection from "@/components/feature/detail/program/ProgramDetailSection";
import WebviewFireFingerSection from "@/components/feature/webview-programs/WebviewFireFingerSection";
import WebviewProgramAttendSection from "@/components/feature/webview-programs/WebviewProgramAttendSection";
import WebviewProgramHeaderSection from "@/components/feature/webview-programs/WebviewProgramHeaderSection";
import { SsgoiTransition } from "@ssgoi/react";
import dynamic from "next/dynamic";

const WebviewAttendeeInfoSection = dynamic(
  () =>
    import("@/components/feature/webview-programs/WebviewAttendeeInfoSection"),
  {
    ssr: false,
  },
);

const ProgramDetailPage = () => {
  return (
    <SsgoiTransition
      id="/program/[programId]"
      className="relative max-h-screen min-h-screen overflow-auto bg-white"
    >
      <WebviewProgramHeaderSection />
      <ProgramDetailSection />
      <Spacing size={50} direction="vertical" unit="px" />
      <WebviewProgramAttendSection />
      <Spacing size={40} direction="vertical" unit="px" />
      <div className="h-3 bg-[#F5F5F5]" />

      <div className="mt-12" />
      <div className="px-4">
        <WebviewFireFingerSection />
      </div>

      <div className="mt-6" />
      <div className="h-3 bg-[#F5F5F5]" />
      <div className="mt-6" />

      <div className="px-4">
        <WebviewAttendeeInfoSection />
      </div>

      <div className="mt-6" />
      <div className="h-3 bg-[#F5F5F5]" />
      <div className="mt-6" />

      <div className="px-4">
        <ProgramDashboardSection />
      </div>

      <div className="mt-24" />
      {/* <UserAttendModalSection isLoggedIn /> */}
    </SsgoiTransition>
  );
};

export default ProgramDetailPage;
