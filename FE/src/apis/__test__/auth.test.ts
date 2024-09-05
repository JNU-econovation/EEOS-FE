//TODO: 서버 반환값 모킹하기
import { describe } from "node:test";
import { postAdminLogin, postSlackLogin, postTokenReissue } from "../auth";
import { LoginDto } from "../dtos/auth.dto";
import { https } from "../instance";

jest.mock("../instance");

describe("postSlackLogin", () => {
  // 슬랙 리다이렉트 후 토큰 정보를 요청하는 api

  const code = "code";
  const redirect_uri = "redirect_uri";

  const mockReturnData = {
    data: {
      accessToken: "abcdedf",
      accessExpiredTime: 170444965500000,
    },
    message: "생성 성공",
    code: "201",
  };

  it("/auth/login/slack 위치로 post 요청을 code, redirect_uri와 함께 보낸다", async () => {
    https.mockReturnValue(mockReturnData);

    // when
    await postSlackLogin(code, redirect_uri);

    // then
    expect(https).toHaveBeenCalledWith({
      url: "/auth/login/slack",
      method: "POST",
      params: { code, redirect_uri },
    });
  });

  it("토큰 정보를 반환한다", async () => {
    https.mockReturnValue(mockReturnData);

    // when
    const result = await postSlackLogin(code, redirect_uri);

    // then
    expect(result).toBeInstanceOf(LoginDto);
  });
});

describe("postTokenReissue", () => {
  // 토큰 재발급 요청 api

  const mockReturnData = {
    data: {
      accessToken: "abcdedf",
    },
  };

  it("/auth/token/reissue 위치로 post 요청을 보낸다", async () => {
    await postTokenReissue();

    expect(https).toHaveBeenCalledWith({
      url: "/auth/reissue",
      method: "POST",
    });
  });

  it("토큰 정보(LoginDto)를 반환한다", async () => {
    https.mockReturnValue(mockReturnData);

    const result = await postTokenReissue();

    expect(result).toBeInstanceOf(LoginDto);
  });
});

describe("postAdminLogin", () => {
  // 관리자 로그인 api

  it("/auth/login 위치로 post 요청을 id, password 와 함께 보낸다 ", async () => {
    const id = "id";
    const password = "password";

    await postAdminLogin(id, password);

    expect(https).toHaveBeenCalledWith({
      url: "/auth/login",
      method: "POST",
      data: { id, password },
    });
  });

  it("토큰 정보(LoginDto)를 반환한다", async () => {
    const mockReturnData = {
      data: {
        accessToken: "abcdedf",
      },
    };

    https.mockReturnValue(mockReturnData);

    const result = await postAdminLogin("id", "password");

    expect(result).toBeInstanceOf(LoginDto);
  });
});
