"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import ROUTES from "@/constants/ROUTES";
import { deleteTokenInfo } from "@/utils/authWithStorage";

interface AuthValidateProps {
  isHaveToLoggedInRoute?: boolean;
}

const AuthValidate = ({ isHaveToLoggedInRoute = true }: AuthValidateProps) => {
  const router = useRouter();
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const tokenExpiration = localStorage.getItem("tokenExpiration");

    const isLoggedIn = accessToken || tokenExpiration;

    if (isHaveToLoggedInRoute && !isLoggedIn) {
      deleteTokenInfo();
      router.push(ROUTES.LOGIN);
    }
    if (!isHaveToLoggedInRoute && isLoggedIn) {
      router.push(ROUTES.MAIN);
    }
  }, []);

  return <></>;
};
export default AuthValidate;
