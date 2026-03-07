import axios from "axios";
import { toast } from "react-toastify";
import { postTokenReissue } from "./auth";
import ERROR_CODE from "@/constants/ERROR_CODE";
import ERROR_MESSAGE from "@/constants/ERROR_MESSAGE";
import ROUTES from "@/constants/ROUTES";
import {
  deleteTokenInfo,
  getAccessToken,
  getTokenExpiration,
  setAccessToken,
  setTokenExpiration,
} from "@/utils/authWithStorage";

declare module "axios" {
  export interface InternalAxiosRequestConfig {
    _retry?: boolean;
  }
}

const https = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL + "/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: process.env.NEXT_PUBLIC_USE_CREDENTIALS === "true",
});

const authInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL + "/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: process.env.NEXT_PUBLIC_USE_CREDENTIALS === "true",
});

authInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const { response } = error;
    if (`${response?.status}`.startsWith("4")) {
      deleteTokenInfo();
      toast.error(ERROR_MESSAGE[ERROR_CODE.AUTH.INVALID_TOKEN].message, {
        toastId: ERROR_CODE.AUTH.INVALID_TOKEN,
      });
      setTimeout(() => {
        window.location.href = ROUTES.LOGIN;
      }, 2000);
    }
    return Promise.reject(error);
  },
);

https.interceptors.request.use(
  async (config) => {
    if (typeof window === "undefined") return config;
    const accessToken = getAccessToken();
    const tokenExpiration = getTokenExpiration();

    // 개발 환경 디버깅 로그
    if (process.env.NODE_ENV === "development") {
      console.log("[API Request]", config.url);
      console.log("[Token Status]", {
        hasToken: !!accessToken,
        hasExpiration: !!tokenExpiration,
        token: accessToken?.substring(0, 20) + "...",
      });
    }

    if (!accessToken || !tokenExpiration) {
      console.warn("[API Request] No token found, proceeding without auth");
      return config;
    }

    const currentTime = new Date().getTime();
    const timeToExpiration = Number(tokenExpiration) - currentTime;
    const TOKEN_REISSUE_THRESHOLD = Number(
      process.env.NEXT_PUBLIC_TOKEN_REISSUE_THRESHOLD,
    );

    if (timeToExpiration < TOKEN_REISSUE_THRESHOLD) {
      try {
        const { accessToken, accessExpiredTime } = await postTokenReissue();
        setAccessToken(accessToken);
        setTokenExpiration(accessExpiredTime);
      } catch (e) {
        deleteTokenInfo();
        toast.error(ERROR_MESSAGE[ERROR_CODE.AUTH.INVALID_TOKEN].message, {
          toastId: ERROR_CODE.AUTH.INVALID_TOKEN,
        });

        setTimeout(() => {
          window.location.href = ROUTES.LOGIN;
        }, 3000);
      }
    }

    config.headers["Authorization"] = `Bearer ${accessToken}`;

    return config;
  },
  (error) => Promise.reject(error),
);

https.interceptors.response.use(
  async (config) => {
    return config;
  },
  async (error) => {
    console.error("[API Error]", error);
    const { config: originalRequest, response } = error;
    const status = response?.status;
    const errorCode = response?.data?.code;
    const errorMessage =
      ERROR_MESSAGE[errorCode]?.message || ERROR_MESSAGE.UNKNOWN.message;

    if ((status === 401 || status === 403) && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const { accessToken, accessExpiredTime } = await postTokenReissue();
        setAccessToken(accessToken);
        setTokenExpiration(accessExpiredTime);
        originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;
        return await axios(originalRequest);
      } catch {
        deleteTokenInfo();
        toast.error(ERROR_MESSAGE[ERROR_CODE.AUTH.INVALID_TOKEN].message, {
          toastId: ERROR_CODE.AUTH.INVALID_TOKEN,
        });
        setTimeout(() => {
          window.location.href = ROUTES.LOGIN;
        }, 3000);
        return Promise.reject(error);
      }
    }

    if (errorCode === ERROR_CODE.AUTH.INVALID_NAME) {
      toast.error(errorMessage, {
        toastId: errorCode,
      });
      return Promise.reject(error);
    }

    if (Object.values(ERROR_CODE.AUTH).includes(errorCode)) {
      toast.error(errorMessage, {
        toastId: errorCode,
      });
      deleteTokenInfo();
      setTimeout(() => {
        if (errorCode === ERROR_CODE.AUTH.INCORRECT_LOGIN_INFO) return;
        window.location.href = "/login";
      }, 3000);
    }

    return Promise.reject(error);
  },
);

export { https, authInstance };
