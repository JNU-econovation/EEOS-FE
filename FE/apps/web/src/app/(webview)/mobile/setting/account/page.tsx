import AppSafeArea from "@/components/common/AppSafeArea/AppSafeArea";
import Spacing from "@/components/common/Spacing";
import AccountSettingHeader from "@/components/feature/webview-account-setting/AccountSettingHeader";
import { SsgoiTransition } from "@ssgoi/react";

const AppAccountSettingPage = () => {
  return (
    <SsgoiTransition id="/setting/account">
      <AppSafeArea edges={["top"]}>
        <AccountSettingHeader />
        <div className="px-6">
          <Spacing size={1.5} direction="vertical" />
          <section>
            <h3 className="text-lg font-medium">활동 상태</h3>
            {/* 준비중 */}
            <div className="mt-4 flex items-center gap-2 rounded-lg bg-[#F2F2F7] px-4 py-3">
              <div className="h-3 w-3 rounded-full bg-green-500" />
              <p className="text-sm font-medium text-[#767676]">AM</p>
            </div>
            <Spacing size={8} direction="vertical" unit="px" />
            <p className="text-xs font-medium leading-[18.20px] text-[#767676]">
              활동 상태 변경은 회장단에게 문의해주세요.
            </p>
          </section>

          <Spacing size={4} direction="vertical" />
          <section>
            <div className="flex justify-between">
              <div>
                <h3 className="text-lg font-medium">파트</h3>
              </div>
              <select className="rounded-lg border border-[#D9D9D9] bg-white px-4 py-3 text-left text-sm font-medium text-[#767676]">
                <option value="designer">디자이너(DE)</option>
                <option value="planner">기획자(PM)</option>
                <option value="developer">개발자(FE)</option>
                <option value="developer">개발자(BE)</option>
                <option value="developer">개발자(GAME)</option>
              </select>
            </div>
          </section>
        </div>
      </AppSafeArea>
    </SsgoiTransition>
  );
};

export default AppAccountSettingPage;
