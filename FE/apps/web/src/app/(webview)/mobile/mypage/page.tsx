import AttendanceSection from "@/components/feature/webview-mypage/AttendanceSection";
import MobileUserInfoSection from "@/components/feature/webview-mypage/MobileUserInfoSection";
import { SsgoiTransition } from "@ssgoi/react";

const WebviewMypage = () => {
  return (
    <SsgoiTransition id="/mypage" className="min-h-screen bg-white">
      <div className="flex h-screen flex-col px-4">
        <div className="mt-8" />
        <MobileUserInfoSection />
        <div className="mt-8" />
        <AttendanceSection />
      </div>
    </SsgoiTransition>
  );
};

export default WebviewMypage;
