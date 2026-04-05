import ComingSoonScreen from "@/components/common/ComingSoonScreen";
import { SsgoiTransition } from "@ssgoi/react";

const AppNotificationSettingPage = () => {
  return (
    <SsgoiTransition id="/setting/notification">
      <ComingSoonScreen />
    </SsgoiTransition>
  );
};

export default AppNotificationSettingPage;
