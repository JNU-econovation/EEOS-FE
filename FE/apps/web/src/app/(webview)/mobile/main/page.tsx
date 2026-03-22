import AppSafeArea from "@/components/common/AppSafeArea/AppSafeArea";
import BellIcon from "@/components/common/icons/BellIcon";
import LogoIcon from "@/components/common/icons/LogoIcon";
import Spacing from "@/components/common/Spacing";
import HelloSection from "@/components/feature/webview-main/HelloSection";
import HomeEventSection from "@/components/feature/webview-main/HomeEventSection";
// import UserMetaSection from "@/components/feature/webview-main/UserMetaSection";
import { SsgoiTransition } from "@ssgoi/react";

const WebviewMainPage = () => {
  return (
    <SsgoiTransition id="/main" className="min-h-screen bg-white">
      <div className="flex h-screen flex-col">
        <div>
          <section className="relative z-10 bg-[#F2F2F7] px-6 pt-16 shadow-[0px_-10px_10px_0px_rgba(34,43,69,0.21)]">
            <div className="flex items-center justify-between">
              <LogoIcon />
              <BellIcon />
            </div>
            <div className="h-6" />
            <HelloSection />

            <Spacing size={74} direction="vertical" unit="px" />
            <div className="z-50">
              <HomeEventSection />
            </div>
            {/* <Spacing size={24} direction="vertical" unit="px" /> */}
          </section>
        </div>
        <div className="grow shadow-[0px_-100px_10px_0px_rgba(34,43,69,0.21)]"></div>
      </div>
    </SsgoiTransition>
  );
};

export default WebviewMainPage;
