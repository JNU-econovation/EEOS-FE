module.exports = {
  expo: {
    name: "eeos",
    slug: "eeos",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    scheme: "eeos",
    userInterfaceStyle: "automatic",
    newArchEnabled: true,
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.geongyu09.xnative",
      googleServicesFile: "./GoogleService-Info.plist",
      entitlements: {
        "aps-environment": "production",
      },
      infoPlist: {
        ITSAppUsesNonExemptEncryption: false, //
        // 웹뷰에서 http 도메인 허용. 빌드시에는 https로 변경 혹은 특정 도메인만 허용하도록 수정 필요
        NSAppTransportSecurity: {
          NSAllowsArbitraryLoads: true,
        },
      },
    },
    android: {
      adaptiveIcon: {
        backgroundColor: "#E6F4FE",
        foregroundImage: "./assets/images/android-icon-foreground.png",
        backgroundImage: "./assets/images/android-icon-background.png",
        monochromeImage: "./assets/images/android-icon-monochrome.png",
      },
      googleServicesFile: "./google-services.json",
      edgeToEdgeEnabled: true,
      predictiveBackGestureEnabled: false,
      package: "com.geongyu09.xnative",
      // 웹뷰에서 http 도메인 허용. 빌드시에는 https로 변경 혹은 특정 도메인만 허용하도록 수정 필요
      usesCleartextTraffic: true,
      useNextNotificationsApi: true, // FCM을 위한 설정
    },
    web: {
      output: "static",
      favicon: "./assets/images/favicon.png",
    },
    plugins: [
      "expo-router",
      [
        "expo-splash-screen",
        {
          image: "./assets/images/icon.png",
          imageWidth: 200,
          resizeMode: "contain",
          backgroundColor: "#ffffff",
          dark: {
            backgroundColor: "#000000",
          },
        },
      ],
      [
        "expo-secure-store",
        {
          configureAndroidBackup: true,
          faceIDPermission:
            "Allow $(PRODUCT_NAME) to access your Face ID biometric data.",
        },
      ],
      "@react-native-firebase/app",
      [
        "@react-native-firebase/messaging",
        {
          ios: {
            useFrameworks: "static",
          },
        },
      ],
    ],
    experiments: {
      typedRoutes: true,
      reactCompiler: true,
    },
    extra: {
      eas: {
        projectId: "05949d1e-7d4a-4649-b8d7-84e37126e5a7",
      },
    },
  },
};
