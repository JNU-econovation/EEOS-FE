import { useEffect, useState } from "react";
import { CheckIsLoggedIn } from "@/utils/authWithStorage";

/**
 * 토큰값을 확인하여 로그인 여부를 반환하는 hook
 * isLoggedIn이 true일 경우 로그인이 되어있는 상태이며, false일 경우 로그인이 되어있지 않은 상태이다.
 * isLoading이 true일 경우 토큰값을 확인하는 중이며, false일 경우 토큰값 확인이 완료된 상태이다.
 *
 * @returns [isLoggedIn, isLoading]
 */

const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const isLoggedIn = CheckIsLoggedIn();
    setIsLoggedIn(isLoggedIn);
    setIsLoading(false);
  }, []);

  return { isLoggedIn, isLoading };
};

export default useAuth;
