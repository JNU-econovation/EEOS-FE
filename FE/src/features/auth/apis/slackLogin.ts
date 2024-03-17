import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { TokenDto } from "./dtos";
import { https } from "@/apis/instance";
import API from "@/constants/API";
import ERROR_CODE from "@/constants/ERROR_CODE";
import ROUTES from "@/constants/ROUTES";
import { setAccessToken, setTokenExpiration } from "@/utils/localStorage";

const slackLogin = async (
  code: string,
  redirect_uri: string,
): Promise<TokenDto> => {
  const { data } = await https({
    url: API.AUTH.SLACK_LOGIN,
    method: "POST",
    params: { code, redirect_uri },
  });
  return new TokenDto(data?.data);
};

export const useSlackLogin = () => {
  const router = useRouter();
  return useMutation(
    ["slackLogin"],
    async ({ code, redirect_uri }: { code: string; redirect_uri: string }) => {
      return await slackLogin(code, redirect_uri);
    },
    {
      onSuccess: (data) => {
        const { accessToken, accessExpiredTime } = data;
        setAccessToken(accessToken);
        setTokenExpiration(accessExpiredTime);
        router.replace(ROUTES.MAIN);
      },
      onError: (error: any) => {
        const errorCode = error?.response?.data?.code;
        errorCode === ERROR_CODE.AUTH.INVALID_NAME &&
          router.replace(ROUTES.NAME_ERROR);
      },
    },
  );
};
