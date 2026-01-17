import messaging from "@react-native-firebase/messaging";
import * as Notifications from "expo-notifications";
import { useEffect } from "react";
import { Platform } from "react-native";

const useNotification = () => {
  // 알림 권한 요청 및 FCM 토큰 발급
  async function requestUserPermission() {
    try {
      // 1. 알림 권한 요청
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (!enabled) {
        console.log("알림 권한이 거부되었습니다.");
        return;
      }

      // console.log("알림 권한 허용됨:", authStatus);

      // 2. iOS의 경우 디바이스를 원격 메시지용으로 등록
      if (Platform.OS === "ios") {
        await messaging().registerDeviceForRemoteMessages();
      }

      // 3. FCM 토큰 발급
      // const token = await messaging().getToken();
      // console.log("FCM 토큰:", token);
      // setFcmToken(token);

      // 4. 백엔드로 토큰 전송
      // await saveTokenToBackend(token);
    } catch (error) {
      console.error("권한 요청 또는 토큰 발급 실패:", error);
    }
  }

  useEffect(() => {
    // 1. 알림 권한 요청 및 FCM 토큰 발급
    requestUserPermission();

    // 2. 포그라운드 메시지 수신 리스너
    const unsubscribeOnMessage = messaging().onMessage(
      async (remoteMessage) => {
        console.log("포그라운드 메시지 수신:", remoteMessage);

        // 포그라운드에서도 알림을 표시하려면 로컬 알림 생성
        await Notifications.scheduleNotificationAsync({
          content: {
            title: remoteMessage.notification?.title || "새 알림",
            body: remoteMessage.notification?.body || "",
            data: remoteMessage.data,
          },
          trigger: null, // 즉시 표시
        });
      },
    );

    // 3. 백그라운드/종료 상태에서 알림 클릭 시 처리
    const unsubscribeOnNotificationOpened = messaging().onNotificationOpenedApp(
      (remoteMessage) => {
        console.log("알림 클릭으로 앱 열림 (백그라운드):", remoteMessage);
        // 특정 화면으로 이동 등의 처리
      },
    );

    // 4. 종료 상태에서 알림 클릭으로 앱이 열렸는지 확인
    messaging()
      .getInitialNotification()
      .then((remoteMessage) => {
        if (remoteMessage) {
          console.log("알림 클릭으로 앱 열림 (종료 상태):", remoteMessage);
          // 특정 화면으로 이동 등의 처리
        }
      });

    // 5. FCM 토큰 갱신 리스너
    const unsubscribeTokenRefresh = messaging().onTokenRefresh((token) => {
      console.log("FCM 토큰 갱신됨:", token);
      saveTokenToBackend(token);
    });

    return () => {
      unsubscribeOnMessage();
      unsubscribeOnNotificationOpened();
      unsubscribeTokenRefresh();
    };
  }, []);

  return { requestUserPermission };
};

export default useNotification;
