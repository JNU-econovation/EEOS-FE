import { Tabs } from "expo-router";

import Home from "@/assets/icons/home.svg";
import HomeFill from "@/assets/icons/homeFill.svg";
import Category from "@/assets/icons/category.svg";
import CategoryFill from "@/assets/icons/categoryFill.svg";
import Profile from "@/assets/icons/profile.svg";
import ProfileFill from "@/assets/icons/profileFill.svg";
import Calendar from "@/assets/icons/calendar.svg";
import CalendarFill from "@/assets/icons/calendarFill.svg";

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
          title: "홈",
          tabBarIcon: ({ focused }) => (focused ? <HomeFill /> : <Home />),
        }}
      ></Tabs.Screen>
      <Tabs.Screen
        name="program/index"
        options={{
          title: "행사",
          tabBarIcon: ({ focused }) =>
            focused ? <CategoryFill /> : <Category />,
        }}
      ></Tabs.Screen>
      <Tabs.Screen
        name="calendar/index"
        options={{
          title: "캘린더",
          tabBarIcon: ({ focused }) =>
            focused ? <CalendarFill /> : <Calendar />,
        }}
      ></Tabs.Screen>
      <Tabs.Screen
        name="mypage/index"
        options={{
          title: "내정보",
          tabBarIcon: ({ focused }) =>
            focused ? <ProfileFill /> : <Profile />,
        }}
      ></Tabs.Screen>
    </Tabs>
  );
}
