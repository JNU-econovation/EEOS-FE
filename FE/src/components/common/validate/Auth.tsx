"use client";

import { useRouter } from "next/navigation";
import { memo, useEffect } from "react";
import ROUTES from "@/constants/ROUTES";
import { CheckIsLoggedIn, deleteTokenInfo } from "@/utils/authWithStorage";

interface AuthValidateProps {
  isHaveToLoggedInRoute?: boolean;
}

const AuthValidate = ({ isHaveToLoggedInRoute = true }: AuthValidateProps) => {
  const router = useRouter();
  useEffect(() => {
    const isLoggedIn = CheckIsLoggedIn();

    if (isHaveToLoggedInRoute && !isLoggedIn) {
      router.push(ROUTES.LOGIN);
      deleteTokenInfo();
    }
    if (!isHaveToLoggedInRoute && isLoggedIn) {
      router.push(ROUTES.MAIN);
    }
  }, []);

  return <></>;
};
export default memo(AuthValidate);
