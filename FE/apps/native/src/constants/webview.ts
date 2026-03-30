export const WEBVIEW_BASE_URL = process.env.EXPO_PUBLIC_WEB_BASE_URL || "";
export const SSO_BASE_URL = process.env.EXPO_PUBLIC_SSO_BASE_URL || "";

export const WEBVIEW_PATH = Object.freeze({
  LOGIN: WEBVIEW_BASE_URL + "/login",
  OAUTH_REDIRECT: WEBVIEW_BASE_URL + "/login/oauth",
  MAIN: WEBVIEW_BASE_URL + "/mobile/main",
  CALENDAR: WEBVIEW_BASE_URL + "/mobile/calendar",
  CREATE_EVENT: (selectedDateTimestamp: string) =>
    WEBVIEW_BASE_URL +
    "/mobile/calendar/create" +
    `?timestamp=${selectedDateTimestamp}`,
  MYPAGE: WEBVIEW_BASE_URL + "/mobile/mypage",
  PROGRAMS: WEBVIEW_BASE_URL + "/mobile/programs",
} as const);

export const SSO_PATH = {
  LOGIN:
    SSO_BASE_URL +
    "?redirect-url=" +
    WEBVIEW_PATH.OAUTH_REDIRECT +
    "&client-type=mobile",
  SIGN_UP: SSO_BASE_URL + "/signup",
} as const;
