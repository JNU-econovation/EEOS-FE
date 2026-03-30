"use client";

import LoadingSpinner from "@/components/common/LoadingSpinner";
import usePutTokenBridge from "@/hooks/bridge/usePutTokenBridge";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

const Page = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const putToken = usePutTokenBridge();

  useEffect(() => {
    const accessToken = searchParams.get("accessToken");
    const accessExpiredTime = searchParams.get("accessExpiredTime");
    const refreshToken = searchParams.get("refreshToken");

    if (!accessToken || !accessExpiredTime || !refreshToken) {
      router.replace("/login");
      return;
    }

    putToken({ accessToken, refreshToken, accessExpiredTime });
  }, [searchParams, putToken, router]);

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <LoadingSpinner />
    </div>
  );
};

export default Page;
