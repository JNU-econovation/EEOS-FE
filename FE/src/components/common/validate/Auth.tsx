"use client";

import { useRouter } from "next/navigation";
import ROUTES from "@/constants/ROUTES";
import useAuth from "@/hooks/useAuth";

interface AuthValidateProps {
  isHaveToLoggedInRoute?: boolean;
}

const AuthValidate = ({ isHaveToLoggedInRoute = true }: AuthValidateProps) => {
  const router = useRouter();
  const { isLoggedIn, isLoading } = useAuth();

  if (isLoading) return null;
  if (isHaveToLoggedInRoute && !isLoggedIn) router.push(ROUTES.LOGIN);
  if (!isHaveToLoggedInRoute && isLoggedIn) router.push(ROUTES.MAIN);

  return <></>;
};
export default AuthValidate;
