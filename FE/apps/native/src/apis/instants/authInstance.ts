import { IS_DEV } from "@/src/app";
import axios, { AxiosResponse } from "axios";
import * as SecureStore from "expo-secure-store";

interface ApiResponse<T> {
  data: T;
  message: "string";
  code: "string";
}

const authInstance = axios.create({
  baseURL: process.env.EXPO_PUBLIC_BASE_URL + "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// 요청 인터셉터
authInstance.interceptors.request.use(
  async (config) => {
    // 필요시 공통 헤더 추가 가능 (예: 인증 토큰)
    // secureStoreage에서 토큰 가져오기
    const token = SecureStore.getItem("accessToken");

    config.headers["Authorization"] = `Bearer ${token}`;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// 응답 인터셉터

authInstance.interceptors.response.use(
  (response) => {
    if (IS_DEV) {
      console.log(
        `[API][${response.config.method?.toUpperCase()}] ${
          response.config.url
        }`,
        response.data,
      );
    }
    return response.data;
  },
  (error) => {
    const { response } = error;
    // 공통 에러 처리 로직 추가 가능
    return Promise.reject(error);
  },
);

export { authInstance };
