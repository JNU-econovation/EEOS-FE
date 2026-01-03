import Provider from "../components/Provider";
import "./global.css";

import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import useAuthStore from "@/src/store/authStore";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  useEffect(() => {
    // Initialize auth state from SecureStore
    useAuthStore.getState().initialize();
  }, []);

  return (
    <Provider>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
    </Provider>
  );
}
