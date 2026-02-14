import AppSafeArea from "@/components/common/AppSafeArea/AppSafeArea";
import BellIcon from "@/components/common/icons/BellIcon";
import LogoIcon from "@/components/common/icons/LogoIcon";
import HelloSection from "@/components/feature/webview-main/HelloSection";
import UserMetaSection from "@/components/feature/webview-main/UserMetaSection";
import { SsgoiTransition } from "@ssgoi/react";

const WebviewMainPage = () => {
  return (
    <SsgoiTransition id="/main" className="min-h-screen bg-white">
      <div>
        <section className="bg-[#F2F2F7] px-6 pb-4 pt-16">
          <div className="flex items-center justify-between">
            <LogoIcon />
            <BellIcon />
          </div>
          <div className="h-6" />
          <HelloSection />

          <div className="h-8" />

          <UserMetaSection />

          <div className="h-20" />
        </section>
      </div>
    </SsgoiTransition>
  );
};

export default WebviewMainPage;
