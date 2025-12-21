export const WEBVIEW_BASE_URL = process.env.EXPO_PUBLIC_WEB_BASE_URL || "";

export const WEBVIEW_PATH = Object.freeze({
  LOGIN: WEBVIEW_BASE_URL + "/login",
  MAIN: WEBVIEW_BASE_URL + "/mobile/main",
  CALENDAR: WEBVIEW_BASE_URL + "/mobile/calendar",
  MYPAGE: WEBVIEW_BASE_URL + "/mobile/mypage",
  PROGRAMS: WEBVIEW_BASE_URL + "/mobile/programs",
} as const);
