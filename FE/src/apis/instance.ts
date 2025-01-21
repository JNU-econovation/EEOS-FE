import axios from "axios";
import { toast } from "react-toastify";
import { postTokenReissue } from "./auth";
import ERROR_CODE from "@/constants/ERROR_CODE";
import ERROR_MESSAGE from "@/constants/ERROR_MESSAGE";
import {
  deleteTokenInfo,
  getAccessToken,
  getTokenExpiration,
  setAccessToken,
  setTokenExpiration,
} from "@/utils/authWithStorage";
import ROUTES from "@/constants/ROUTES";

const https = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL + "/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

const authInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL + "/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

https.interceptors.request.use(
  async (config) => {
    if (typeof window === "undefined") return config;
    const accessToken = getAccessToken();
    const tokenExpiration = getTokenExpiration();

    if (!accessToken || !tokenExpiration) return config;

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
    const { config: originalRequest, response } = error;
    const errorCode = response?.data?.code;
    const errorMessage =
      ERROR_MESSAGE[errorCode]?.message || ERROR_MESSAGE.UNKNOWN.message;

    if (errorCode === ERROR_CODE.AUTH.INVALID_TOKEN) {
      deleteTokenInfo();
      toast.error(errorMessage, {
        toastId: errorCode,
      });
      setTimeout(() => {
        window.location.href = ROUTES.LOGIN;
      }, 3000);
    }

    if (errorCode === ERROR_CODE.AUTH.EXPIRED_ACCESS_TOKEN) {
      const { accessToken, accessExpiredTime } = await postTokenReissue();

      setAccessToken(accessToken);
      setTokenExpiration(accessExpiredTime);
      originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;

      return await axios(originalRequest);
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
    error.message = errorMessage;
    return Promise.reject(error);
  },
);

export { https, authInstance };
