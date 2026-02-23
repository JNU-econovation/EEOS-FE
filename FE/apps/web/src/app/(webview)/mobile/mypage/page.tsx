import AppSafeArea from "@/components/common/AppSafeArea/AppSafeArea";
import Spacing from "@/components/common/Spacing";
import AttendanceSection from "@/components/feature/webview-mypage/AttendanceSection";
import MobileUserInfoSection from "@/components/feature/webview-mypage/MobileUserInfoSection";
import Hamburger from "@/components/icons/items/Hamberger";
import { SsgoiTransition } from "@ssgoi/react";

const WebviewMypage = () => {
  return (
    <SsgoiTransition id="/mypage" className="min-h-screen bg-white">
      <AppSafeArea
        edges={["top"]}
        classname="flex h-screen flex-col bg-[#F8F8F8]"
      >
        <div className="bg-[#F8F8F8] px-6">
          <header className="flex justify-end">
            <Hamburger />
          </header>
        </div>
        <Spacing size={8} direction="vertical" unit="px" />

        <MobileUserInfoSection />
        <div className="mt-8" />
        <AttendanceSection />
      </AppSafeArea>
    </SsgoiTransition>
  );
};

export default WebviewMypage;
