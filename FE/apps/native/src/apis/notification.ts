import { authInstance } from "./instants/authInstance";
import API from "@constants/apis";

/**
 * FCM/APNs 토큰을 백엔드로 전송하여 DB에 저장
 * @param pushToken - getDevicePushTokenAsync()로 받은 푸시 토큰
 * @returns 백엔드 응답 데이터
 */
export const postSavePushToken = async (pushToken: string) => {
  const { data } = await authInstance.post(API.NOTIFICATION.SAVE_TOKEN, {
    pushToken,
    provider: "FCM",
  });

  return data;
};

/**
 * 저장된 푸시 토큰 삭제 (로그아웃 시 호출)
 */
export const deletePushToken = async () => {
  // TODO: 백엔드 API 엔드포인트가 준비되면 아래 주석을 해제하고 사용
  // const { data } = await authInstance.delete(API.NOTIFICATION.DELETE_TOKEN);
  // return data;

  console.log("📤 백엔드에서 토큰 삭제 (구현 대기)");
  return null;
};
