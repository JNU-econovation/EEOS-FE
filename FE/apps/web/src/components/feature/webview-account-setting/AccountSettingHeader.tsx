"use client";

import Spacing from "@/components/common/Spacing";
import { ArrowLeft } from "@/components/icons/items/ArrotLeft";
import { useRouter } from "next/navigation";

const AccountSettingHeader = () => {
  const router = useRouter();

  return (
    <header className="relative shadow-sm">
      <button
        className="absolute left-5"
        onClick={() => {
          router.back();
        }}
      >
        <ArrowLeft />
      </button>
      <h1 className="text-basefont-medium text-center text-black">
        계정 상태 변경
      </h1>
      <Spacing size={18} direction="vertical" unit="px" />
    </header>
  );
};

export default AccountSettingHeader;
