import { https } from "./instants/publicInstance";

interface SaveTokenRequest {
  token: string;
  platform: "ios" | "android";
}

/**
 * FCM/APNs 토큰을 백엔드로 전송하여 DB에 저장
 * @param token - getDevicePushTokenAsync()로 받은 푸시 토큰
 * @param platform - 디바이스 플랫폼 (ios 또는 android)
 */
export const postSavePushToken = async (
  token: string,
  platform: "ios" | "android",
) => {
  // TODO: 백엔드 API 엔드포인트가 준비되면 아래 주석을 해제하고 사용
  // const { data } = await https.post("/notifications/token", {
  //   token,
  //   platform,
  // });
  // return data;

  console.log("📤 백엔드로 토큰 전송 (구현 대기):", { token, platform });
  return null;
};

/**
 * 저장된 푸시 토큰 삭제 (로그아웃 시 호출)
 */
export const deletePushToken = async () => {
  // TODO: 백엔드 API 엔드포인트가 준비되면 아래 주석을 해제하고 사용
  // const { data } = await https.delete("/notifications/token");
  // return data;

  console.log("📤 백엔드에서 토큰 삭제 (구현 대기)");
  return null;
};
