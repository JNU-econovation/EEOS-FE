import { IS_DEV } from "@/src/app";
import useSavePushTokenMutation from "@hooks/query/useSavePushTokenMutation";
import * as Notifications from "expo-notifications";
import { useCallback, useEffect, useState } from "react";
import { PermissionsAndroid, Platform } from "react-native";
import messaging from "@react-native-firebase/messaging";

// 포그라운드 알림 표시 방식 설정
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

// 권한 요청 (Android 13+)
async function requestUserPermission() {
  if (Platform.OS === "android" && Platform.Version >= 33) {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
    );
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  }

  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  return enabled;
}

// FCM 토큰 가져오기
async function getFCMToken() {
  const hasPermission = await requestUserPermission();

  if (hasPermission) {
    const fcmToken = await messaging().getToken();
    console.log("FCM Token:", fcmToken);
    return fcmToken;
  }
  throw new Error("푸시 알림 권한이 거부되었습니다.");
}

const useNotification = () => {
  const [expoPushToken, setExpoPushToken] = useState<string>("");
  const { mutate: savePushToken } = useSavePushTokenMutation();

  // 앱이 종료 상태에서 알림으로 열렸는지 확인
  const lastNotificationResponse = Notifications.useLastNotificationResponse();

  // 알림 권한 요청 및 푸시 토큰 발급
  const requestUserPermission = useCallback(
    async function requestUserPermission() {
      try {
        // 1. 알림 권한 요청
        const { status: existingStatus } =
          await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;

        if (existingStatus !== "granted") {
          const { status } = await Notifications.requestPermissionsAsync();
          finalStatus = status;
        }

        if (finalStatus !== "granted") {
          console.log("알림 권한이 거부되었습니다.");
          return;
        }

        // 2. 푸시 토큰 발급
        // FCM을 사용하려면 getDevicePushTokenAsync() 사용
        // Expo Push Notification을 사용하려면 getExpoPushTokenAsync() 사용
        // const tokenData = await Notifications.getDevicePushTokenAsync();
        // const token = tokenData.data;
        const token = await getFCMToken();
        if (IS_DEV) console.log("✅ 푸시 토큰 발급 완료:", token);
        setExpoPushToken(token);

        // 3. 백엔드로 토큰 전송
        savePushToken(token);
      } catch (error) {
        console.error("권한 요청 또는 토큰 발급 실패:", error);
      }
    },
    [savePushToken],
  );

  useEffect(() => {
    // 1. 알림 권한 요청 및 푸시 토큰 발급
    requestUserPermission();

    // 2. 포그라운드 알림 수신 리스너
    const notificationListener = Notifications.addNotificationReceivedListener(
      (notification) => {
        if (IS_DEV) console.log("포그라운드 알림 수신:", notification);
        // 포그라운드에서도 알림이 자동으로 표시됨 (setNotificationHandler 설정)
      },
    );

    // 3. 알림 클릭 시 처리
    const responseListener =
      Notifications.addNotificationResponseReceivedListener((response) => {
        if (IS_DEV) console.log("알림 클릭:", response);
        // 특정 화면으로 이동 등의 처리
        // const data = response.notification.request.content.data;
      });

    return () => {
      notificationListener.remove();
      responseListener.remove();
    };
  }, [requestUserPermission]);

  // 4. 앱이 종료 상태에서 알림으로 열렸을 때 처리
  useEffect(() => {
    if (lastNotificationResponse) {
      if (IS_DEV)
        console.log(
          "알림 클릭으로 앱 열림 (종료 상태):",
          lastNotificationResponse,
        );
      // 특정 화면으로 이동 등의 처리
      // const data = lastNotificationResponse.notification.request.content.data;
    }
  }, [lastNotificationResponse]);

  return { requestUserPermission, expoPushToken };
};

export default useNotification;
