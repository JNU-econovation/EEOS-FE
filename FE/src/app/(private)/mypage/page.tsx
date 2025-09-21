"use client";

import AttendanceOverviewSection from "@/components/mypage/AttendanceOverviewSection";
import UserInfoSection from "@/components/mypage/UserInfoSection";

const MyPage = () => {
  return (
    <div className="space-y-16">
      <UserInfoSection />
      <AttendanceOverviewSection />
    </div>
  );
};

export default MyPage;
