import API from "@constants/apis";
import { publicInstance } from "./instants/publicInstance";

interface LoginResponse {
  accessToken: string;
  accessExpiredTime: number;
}

export const postLogin = async () => {
  const { data } = await publicInstance<LoginResponse>({
    url: API.AUTH.ADMIN_LOGIN,
    method: "POST",
    data: {
      id: process.env.EXPO_PUBLIC_TESTER_ID,
      password: process.env.EXPO_PUBLIC_TESTER_PW,
    },
  });

  return data;
};
