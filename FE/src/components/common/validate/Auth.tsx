"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import ROUTES from "@/constants/ROUTES";
import { CheckIsLoggedIn } from "@/utils/authWithStorage";

interface AuthValidateProps {
  isHaveToLoggedInRoute?: boolean;
}

const AuthValidate = ({ isHaveToLoggedInRoute = true }: AuthValidateProps) => {
  const router = useRouter();
  useEffect(() => {
    const isLoggedIn = CheckIsLoggedIn();

    if (isHaveToLoggedInRoute && !isLoggedIn) {
      router.push(ROUTES.LOGIN);
    } else if (!isHaveToLoggedInRoute && isLoggedIn) {
      router.push(ROUTES.MAIN);
    }
  }, []);

  return <></>;
};
export default AuthValidate;
