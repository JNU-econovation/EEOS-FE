import { Tabs } from "expo-router";

// layout은 화면이 아니다!
// Stack, Tabs, Drawer
// Drawer -> 헤더의 햄버거바 -> 스르륵 나오는 거
export default function Layout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="home/index"
        options={{
          title: "Home",
          tabBarIcon: () => null,
        }}
      ></Tabs.Screen>
      <Tabs.Screen
        name="mypage/index"
        options={{
          title: "MyPage",
          tabBarIcon: () => null,
        }}
      ></Tabs.Screen>
    </Tabs>
  );
}
