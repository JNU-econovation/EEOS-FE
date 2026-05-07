"use client";

import Setting from "@/components/icons/items/Setting";
import ROUTES from "@/constants/ROUTES";
import useRouteToWebviewScreenBridge from "@/hooks/bridge/useRouteToWebviewScreenBridge";
import { useCallback } from "react";

const SettingButton = () => {
  const routeToWebviewScreen = useRouteToWebviewScreenBridge();

  const handleOpenSetting = useCallback(() => {
    routeToWebviewScreen({
      uri: `${window.location.origin}${ROUTES.MOBILE.SETTING.MAIN}`,
    });
  }, [routeToWebviewScreen]);

  return (
    <button type="button" aria-label="설정 열기" onClick={handleOpenSetting}>
      <Setting />
    </button>
  );
};

export default SettingButton;
