"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import ROUTES from "@/constants/ROUTES";
import {
  deleteTokenInfo,
  getAccessToken,
  getTokenExpiration,
} from "@/utils/localStorage";

const AuthValidate = () => {
  const router = useRouter();
  useEffect(() => {
    const accessToken = getAccessToken();
    const tokenExpiration = getTokenExpiration();

    if (!accessToken || !tokenExpiration) {
      deleteTokenInfo();
      router.push(ROUTES.LOGIN);
    }
  }, []);

  return <></>;
};
export default AuthValidate;
