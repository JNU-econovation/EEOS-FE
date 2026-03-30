"use client";

import { useRouter } from "next/navigation";
import { PropsWithChildren } from "react";
import ROUTES from "@/constants/ROUTES";
import useAuth from "@/hooks/useAuth";

interface AuthValidateProps extends PropsWithChildren {
  isHaveToLoggedInRoute?: boolean;
}

/**
 * 이 컴포넌트는 로그인 상태에 따라 라우팅을 처리합니다.
 * - isHaveToLoggedInRoute가 true인 경우, 로그인하지 않은 사용자는 로그인 페이지로 리다이렉트됩니다.
 * - isHaveToLoggedInRoute가 false인 경우, 로그인한 사용자는 메인 페이지로 리다이렉트됩니다.
 * - 로딩 중에는 아무것도 렌더링하지 않습니다.
 */
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
