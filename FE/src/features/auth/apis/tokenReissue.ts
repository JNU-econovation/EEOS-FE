import { TokenDto } from "./dtos";
import { https } from "@/utils/axios";
import API from "@/constants/API";

export const tokenReissue = async (): Promise<TokenDto> => {
  const { data } = await https({
    url: API.AUTH.TOKEN_REISSUE,
    method: "POST",
  });
  return new TokenDto(data?.data);
};
