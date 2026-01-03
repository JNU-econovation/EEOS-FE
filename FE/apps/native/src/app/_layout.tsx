import Provider from "../components/Provider";
import "./global.css";

import { Stack } from "expo-router";

export default function RootLayout() {
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
