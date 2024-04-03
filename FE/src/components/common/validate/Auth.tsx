"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import ROUTES from "@/constants/ROUTES";
import { CheckIsLoggedIn, deleteTokenInfo } from "@/utils/authWithStorage";

const AuthValidate = () => {
  const router = useRouter();
  useEffect(() => {
    const isLoggedIn = CheckIsLoggedIn();
    if (!isLoggedIn) {
      deleteTokenInfo();
      router.push(ROUTES.LOGIN);
    }
  }, []);

  return <></>;
};
export default AuthValidate;
