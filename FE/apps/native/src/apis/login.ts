import { https } from "./instants";

interface LoginResponse {
  id: string;
  password: string;
}

export const postLogin = async (credentials: LoginResponse) => {
  // const { data } = await https({
  //   url: API.AUTH.SLACK_LOGIN,
  //   method: "POST",
  //   params: { code, redirect_uri },
  // });
  // return data;
  return null;
};
