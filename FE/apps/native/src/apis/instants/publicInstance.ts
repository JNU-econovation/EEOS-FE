import { IS_DEV } from "@/src/app";
import axios, { AxiosResponse } from "axios";

interface ApiResponse<T> {
  data: T;
  message: "string";
  code: "string";
}

const publicInstance = axios.create({
  baseURL: process.env.EXPO_PUBLIC_BASE_URL + "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

publicInstance.interceptors.response.use(
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

export { publicInstance };
