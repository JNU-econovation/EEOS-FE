/**
 * @jest-environment jsdom
 */

import { render, screen, waitFor } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import renderer from "react-test-renderer";
import LoginForm from "../admin/LoginForm";
// eslint-disable-next-line import/order
import withReactQuery from "@/__test__/utils/withReactQuery";
import { useAdminLoginMutation } from "@/hooks/query/useAuthQuery";

// react-dom useFormStatus mocking
jest.mock("react-dom", () => {
  return {
    ...jest.requireActual("react-dom"),
    useFormStatus: jest.fn(),
  };
});

// next.js mocking
jest.mock("next/navigation", () => ({
  useSearchParams: jest.fn(() => ({
    get: jest.fn(() => "code"),
  })),
  useRouter: jest.fn(() => ({
    back: jest.fn(),
    replace: jest.fn(),
  })),
}));

// query mocking
const mutate = jest.fn();

jest.mock("@/hooks/query/useAuthQuery", () => ({
  useAdminLoginMutation: jest.fn(() => ({
    mutate,
    isError: false,
  })),
}));

describe("LoginForm.tsx", () => {
  let mockedAlert: jest.SpyInstance;

  beforeEach(() => {
    mockedAlert = jest.spyOn(window, "alert").mockImplementation(() => {});
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("네트워크가 올바른 환경에서", () => {
    it("올바르게 렌더링 된다", async () => {
      const WrappedComponent = withReactQuery(<LoginForm />);
      const tree = renderer.create(<WrappedComponent />).toJSON();

      expect(tree).toMatchSnapshot();
    });

    it("초기상태(아무 값도 입력하지 않은 상태)에서 로그인 시 아이디와 비밀번호를 입력해주세요 alert가 뜬다", async () => {
      // arrange
      const WrappedComponent = withReactQuery(<LoginForm />);
      render(<WrappedComponent />);

      // act
      const loginButton = screen.getByRole("button", {
        name: "로그인",
      });

      await userEvent.click(loginButton);

      // assert
      expect(mockedAlert).toHaveBeenCalledWith(
        "아이디와 비밀번호를 입력해주세요.",
      );
    });

    describe("아이디를 입력한 상태에서", () => {
      it("로그인 시 아이디와 비밀번호를 입력해주세요 alert가 뜬다", async () => {
        // Arrange
        const id = "testId";

        const WrappedComponent = withReactQuery(<LoginForm />);
        render(<WrappedComponent />);

        // act
        const loginButton = screen.getByRole("button", {
          name: "로그인",
        });
        const idInput = screen.getByRole("textbox", {
          name: "아이디",
        });

        await userEvent.click(loginButton);
        await userEvent.type(idInput, id);

        expect(mockedAlert).toHaveBeenCalledTimes(1);
      });
      describe("비밀번호를 입력한 상태에서", () => {
        it("아이디 혹은 비밀번호가 올바르지 않은 경우 로그인이 진행되지 않는다", async () => {
          // Arrange
          const id = "notCorrectId";
          const password = "notCorrectPassword";

          const WrappedComponent = withReactQuery(<LoginForm />);
          render(<WrappedComponent />);

          // act
          const idInput = screen.getByRole("textbox", {
            name: "아이디",
          });

          const passwordInput = screen.getByRole("password", {
            name: "비밀번호",
          });

          const loginButton = screen.getByRole("button", {
            name: "로그인",
          });

          await userEvent.type(idInput, id);
          await userEvent.type(passwordInput, password);
          await userEvent.click(loginButton);

          // assert
          expect(mutate).toHaveBeenCalled();
          expect(mutate).toHaveBeenCalledWith({
            id,
            password,
          });
        });
        it("아이디 및 비밀번호가 올바른 경우 로그인이 진행된다", async () => {
          // Arrange
          const id = "correctId";
          const password = "correctPassword";

          const WrappedComponent = withReactQuery(<LoginForm />);
          render(<WrappedComponent />);

          // act
          const loginButton = screen.getByRole("button", {
            name: "로그인",
          });
          const idInput = screen.getByRole("textbox", {
            name: "아이디",
          });
          const passwordInput = screen.getByRole("password", {
            name: "비밀번호",
          });

          await userEvent.type(idInput, id);
          await userEvent.type(passwordInput, password);
          await userEvent.click(loginButton);

          expect(mutate).toHaveBeenCalled();
          expect(mutate).toHaveBeenCalledWith({
            id,
            password,
          });
        });
      });
    });
    describe("비밀번호를 입력한 상태에서", () => {
      it("로그인 시 아이디와 비밀번호를 입력해주세요 alert가 뜬다", async () => {
        // Arrange
        const password = "testPassword";

        const WrappedComponent = withReactQuery(<LoginForm />);
        render(<WrappedComponent />);

        // act
        const loginButton = screen.getByRole("button", {
          name: "로그인",
        });

        const passwordInput = screen.getByRole("password", {
          name: "비밀번호",
        });

        await userEvent.type(passwordInput, password);
        await userEvent.click(loginButton);

        // assert
        expect(mockedAlert).toHaveBeenCalledWith(
          "아이디와 비밀번호를 입력해주세요.",
        );
      });

      describe("아이디를 입력한 상태에서", () => {
        it("아이디 혹은 비밀번호가 올바르지 않은 경우 로그인이 진행되지 않는다", async () => {
          // Arrange
          const id = "uncorrectId";
          const password = "uncorrectPassword";

          const WrappedComponent = withReactQuery(<LoginForm />);
          render(<WrappedComponent />);

          mutate.mockReturnValue({
            isError: true,
          });

          // act
          const loginButton = screen.getByRole("button", {
            name: "로그인",
          });
          const idInput = screen.getByRole("textbox", {
            name: "아이디",
          });
          const passwordInput = screen.getByRole("password", {
            name: "비밀번호",
          });

          await userEvent.type(idInput, id);
          await userEvent.type(passwordInput, password);
          await userEvent.click(loginButton);

          // assert
          expect(mutate).toHaveBeenCalled();
          expect(mutate).toHaveBeenCalledWith({
            id,
            password,
          });
        });

        it("아이디 및 비밀번호가 올바른 경우 로그인이 진행된다", async () => {
          // Arrange
          const id = "testId";
          const password = "testPassword";
          const WrappedComponent = withReactQuery(<LoginForm />);
          render(<WrappedComponent />);
          // act
          const loginButton = screen.getByRole("button", {
            name: "로그인",
          });
          const idInput = screen.getByRole("textbox", {
            name: "아이디",
          });
          const passwordInput = screen.getByRole("password", {
            name: "비밀번호",
          });

          await userEvent.type(idInput, id);
          await userEvent.type(passwordInput, password);
          await userEvent.click(loginButton);

          // assert
          expect(mutate).toHaveBeenCalled();
          expect(mutate).toHaveBeenCalledWith({
            id,
            password,
          });
        });
      });
    });
  });

  describe("네트워크가 올바르지 않은 환경에서", () => {
    it("로그인 시 에러가 발생하면 비밀번호를 초기화한다", async () => {
      // Arrange
      const WrappedComponent = withReactQuery(<LoginForm />);
      render(<WrappedComponent />);
      const loginButton = screen.getByRole("button", {
        name: "로그인",
      });
      const idInput = screen.getByRole("textbox", {
        name: "아이디",
      });
      const passwordInput = screen.getByRole("password", {
        name: "비밀번호",
      }) as HTMLInputElement;

      useAdminLoginMutation.mockReturnValue({
        mutate,
        isError: true,
      });

      // act
      await userEvent.type(idInput, "testId");
      await userEvent.type(passwordInput, "testPassword");

      await userEvent.click(loginButton);

      // assert
      expect(mutate).toHaveBeenCalled();
      waitFor(() => {
        expect(passwordInput.value).toBe("");
      });
    });
  });
});
