"use client";

import UserInfoSection from "@/components/mypage/UserInfoSection";
import AttendanceOverviewSection from "@/components/mypage/AttendanceOverviewSection";

const MyPage = () => {
  return (
    <div className="space-y-16">
      <UserInfoSection />
      <AttendanceOverviewSection />
    </div>
  );
};

export default MyPage;
