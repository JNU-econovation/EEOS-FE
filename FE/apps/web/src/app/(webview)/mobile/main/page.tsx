import BellIcon from "@/components/common/icons/BellIcon";
import LogoIcon from "@/components/common/icons/LogoIcon";
import Spacing from "@/components/common/Spacing";
import AnnouncementSection from "@/components/feature/webview-main/AnnouncementSection";
import HelloSection from "@/components/feature/webview-main/HelloSection";
import HomeEventSection from "@/components/feature/webview-main/HomeEventSection";
import { SsgoiTransition } from "@ssgoi/react";

const WebviewMainPage = () => {
  return (
    <SsgoiTransition id="/main" className="min-h-screen bg-white">
      <div className="flex min-h-screen flex-col">
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
          </section>
        </div>
        <div className="grow px-6 shadow-[0px_-100px_10px_0px_rgba(34,43,69,0.21)]">
          <Spacing size={32} direction="vertical" unit="px" />
          <AnnouncementSection />
        </div>
        <div>
          <Spacing size={32} direction="vertical" unit="px" />
        </div>
      </div>
    </SsgoiTransition>
  );
};

export default WebviewMainPage;
