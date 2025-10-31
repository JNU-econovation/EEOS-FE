"use client";

import { useRouter } from "next/navigation";
import { PropsWithChildren } from "react";
import ROUTES from "@/constants/ROUTES";
import useAuth from "@/hooks/useAuth";

interface AuthValidateProps extends PropsWithChildren {
  isHaveToLoggedInRoute?: boolean;
}

const AuthValidate = ({
  isHaveToLoggedInRoute = true,
  children,
}: AuthValidateProps) => {
  const router = useRouter();
  const { isLoggedIn, isLoading } = useAuth();

  if (isLoading) return null;
  if (isHaveToLoggedInRoute && !isLoggedIn) {
    router.push(ROUTES.LOGIN);
    return null;
  }
  if (!isHaveToLoggedInRoute && isLoggedIn) {
    router.push(ROUTES.MAIN);
    return null;
  }

  return <>{children}</>;
};
export default AuthValidate;
