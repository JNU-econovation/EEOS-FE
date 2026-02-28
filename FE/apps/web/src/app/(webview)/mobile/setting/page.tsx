"use client";

import AppSafeArea from "@/components/common/AppSafeArea/AppSafeArea";
import Spacing from "@/components/common/Spacing";
import AppSettingHeader from "@/components/feature/app-setting/AppSettingHeader";
import ROUTES from "@/constants/ROUTES";
import { SsgoiTransition } from "@ssgoi/react";
import { useRouter } from "next/navigation";

const SettingPage = () => {
  const router = useRouter();

  return (
    <SsgoiTransition id="/setting" className="min-h-screen bg-white">
      <AppSafeArea edges={["top"]}>
        <AppSettingHeader />

        <div className="px-6">
          <Spacing size={12} direction="vertical" unit="px" />
          <p className="text-sm font-semibold leading-[18.20px] text-[#767676]">
            내 정보
          </p>
          <Spacing size={1} direction="vertical" unit="rem" />
          <ul className="flex flex-col gap-4">
            <li
              className="flex justify-between gap-3"
              onClick={() => {
                router.push(ROUTES.MOBILE.SETTING.ACCOUNT);
              }}
            >
              <UserIcon />
              <div className="w-full text-lg font-medium leading-6 text-black">
                계정 정보 변경
              </div>
              <ChevronRight />
            </li>
          </ul>
          <Spacing size={22} direction="vertical" unit="px" />
        </div>

        <div className="h-1.5 bg-[#F8F8F8]" />

        <div className="px-6">
          <Spacing size={12} direction="vertical" unit="px" />
          <p className="text-sm font-semibold leading-[18.20px] text-[#767676]">
            알림
          </p>
          <Spacing size={1} direction="vertical" unit="rem" />
          <ul className="flex flex-col gap-4">
            <li
              className="flex justify-between gap-3"
              onClick={() => {
                router.push(ROUTES.MOBILE.SETTING.NOTIFICATION);
              }}
            >
              <UserIcon />
              <div className="w-full text-lg font-medium leading-6 text-black">
                알림 설정
              </div>
              <ChevronRight />
            </li>
            <li
              className="flex justify-between gap-3"
              onClick={() => {
                router.push(ROUTES.MOBILE.SETTING.NOTIFICATION);
              }}
            >
              <UserIcon />

              <div className="w-full text-lg font-medium leading-6 text-black">
                알림 설정
              </div>
              <ChevronRight />
            </li>
          </ul>
          <Spacing size={22} direction="vertical" unit="px" />
        </div>
        <div className="h-1.5 bg-[#F8F8F8]" />

        {/*  */}
        <div className="px-6">
          <Spacing size={12} direction="vertical" unit="px" />
          <p className="text-sm font-semibold leading-[18.20px] text-[#767676]">
            기타
          </p>
          <Spacing size={1} direction="vertical" unit="rem" />
          <ul className="flex flex-col gap-4">
            <li
              className="flex justify-between gap-3"
              onClick={() => {
                router.push(ROUTES.MOBILE.SETTING.ACCOUNT);
              }}
            >
              <UserIcon />
              <div className="w-full text-lg font-medium leading-6 text-black">
                피드백
              </div>
              <ChevronRight />
            </li>
          </ul>
          <Spacing size={22} direction="vertical" unit="px" />
        </div>

        <div className="h-1.5 bg-[#F8F8F8]" />

        {/*  */}
        <div className="px-6">
          <Spacing size={12} direction="vertical" unit="px" />
          <p className="text-sm font-semibold leading-[18.20px] text-[#767676]">
            계정
          </p>
          <Spacing size={1} direction="vertical" unit="rem" />
          <ul className="flex flex-col gap-4">
            <li
              className="flex justify-between gap-3"
              onClick={() => {
                router.push(ROUTES.MOBILE.SETTING.ACCOUNT);
              }}
            >
              <div className="w-full text-lg font-medium leading-6 text-red-500">
                로그아웃
              </div>
            </li>
          </ul>
          <Spacing size={22} direction="vertical" unit="px" />
        </div>
      </AppSafeArea>
    </SsgoiTransition>
  );
};

const UserIcon = () => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M19 21V19C19 17.9391 18.5786 16.9217 17.8284 16.1716C17.0783 15.4214 16.0609 15 15 15H9C7.93913 15 6.92172 15.4214 6.17157 16.1716C5.42143 16.9217 5 17.9391 5 19V21"
        stroke="black"
        stroke-width="1.25"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z"
        stroke="black"
        stroke-width="1.25"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

const ChevronRight = () => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9 18L15 12L9 6"
        stroke="black"
        stroke-width="1.25"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export default SettingPage;
