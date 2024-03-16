"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import ROUTES from "@/constants/ROUTES";
import LocalStorage from "@/utils/localStorage";

const AuthValidate = () => {
  const router = useRouter();
  useEffect(() => {
    const accessToken = LocalStorage.getItem("accessToken");
    const tokenExpiration = LocalStorage.getItem("tokenExpiration");

    if (!accessToken || !tokenExpiration) {
      LocalStorage.clearToken();
      router.push(ROUTES.LOGIN);
    }
  }, []);

  return <></>;
};
export default AuthValidate;
