import Provider from "../components/Provider";
import "./global.css";

import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  return (
    <Provider>
      <Stack
        screenOptions={{
          headerShown: false,
          animation: "fade",
        }}
      >
        <Stack.Screen
          name="createEvent/[date]"
          options={{
            animation: "slide_from_bottom",
            presentation: "modal",
            gestureEnabled: false,
          }}
        />
        <Stack.Screen
          name="webview/[uri]"
          options={{
            animation: "slide_from_right",
          }}
        />
      </Stack>
    </Provider>
  );
}
