import { useEffect } from "react";
import { CheckIsLoggedIn } from "@/utils/authWithStorage";

export default function useCheckIsLoggedIn() {
  let isLoggedIn;
  useEffect(() => {
    isLoggedIn = CheckIsLoggedIn();
  }, []);
  return isLoggedIn;
}
