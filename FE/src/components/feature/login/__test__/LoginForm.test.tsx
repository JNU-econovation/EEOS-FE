/**
 * @jest-environment jsdom
 */

import { findByText, render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import renderer from "react-test-renderer";
import LoginForm from "../admin/LoginForm";
import withReactQuery from "@/__test__/utils/withReactQuery";

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

describe("LoginForm", () => {
  it("올바르게 렌더링 된다", async () => {
    const WrappedComponent = withReactQuery(<LoginForm />);
    const tree = renderer.create(<WrappedComponent />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it("초기상태(아무 값도 입력하지 않은 상태)에서 로그인 시 아이디와 비밀번호를 입력해주세요 alert가 뜬다", async () => {
    // arrange
    const mockedAlert = jest
      .spyOn(window, "alert")
      .mockImplementation(() => {});

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
});

// describe("아이디를 입력한 상태에서", () => {
//   it("로그인 시 아이디와 비밀번호를 입력해주세요 alert가 뜬다", async () => {
//     // Arrange
//     const id = "testId";
//     const password = "";

//     const WrappedComponent = withReactQuery(<LoginForm />);
//     render(<WrappedComponent />);

//     // act
//     const loginButton = screen.getByRole("button", {
//       name: "로그인",
//     });

//     userEvent.click(loginButton);

//     expect(
//       screen.getByText("아이디와 비밀번호를 입력해주세요."),
//     ).toBeInTheDocument();
//   });

//   describe("비밀번호를 입력한 상태에서", () => {
//     describe("로그인 시 아이디와 비밀번호를 입력해주세요 alert가 뜬다", () => {
//       it("아이디 혹은 비밀번호가 올바르지 않은 경우 로그인이 진행되지 않는다", async () => {
//         // Arrange
//         const id = "";
//         const password = "testPassword";

//         const WrappedComponent = withReactQuery(<LoginForm />);
//         render(<WrappedComponent />);

//         // act
//         const loginButton = screen.getByRole("button", {
//           name: "로그인",
//         });

//         userEvent.click(loginButton);

//         expect(
//           screen.getByText("아이디와 비밀번호를 입력해주세요."),
//         ).toBeInTheDocument();
//       });
//       it("아이디 및 비밀번호가 올바른 경우 로그인이 진행된다", async () => {
//         // Arrange
//         const id = "testId";
//         const password = "testPassword";

//         const WrappedComponent = withReactQuery(<LoginForm />);
//         render(<WrappedComponent />);

//         // act
//         const loginButton = screen.getByRole("button", {
//           name: "로그인",
//         });

//         userEvent.click(loginButton);

//         expect(
//           screen.getByText("아이디와 비밀번호를 입력해주세요."),
//         ).toBeInTheDocument();
//       });
//     });
//   });
// });

// describe("비밀번호를 입력한 상태에서", () => {
//   it("로그인 시 아이디와 비밀번호를 입력해주세요 alert가 뜬다", async () => {
//     // Arrange
//     const id = "";
//     const password = "testPassword";

//     const WrappedComponent = withReactQuery(<LoginForm />);
//     render(<WrappedComponent />);

//     // act
//     const loginButton = screen.getByRole("button", {
//       name: "로그인",
//     });

//     userEvent.click(loginButton);

//     expect(
//       screen.getByText("아이디와 비밀번호를 입력해주세요."),
//     ).toBeInTheDocument();
//   });

//   describe("아이디를 입력한 상태에서", () => {
//     describe("로그인 시 아이디와 비밀번호를 입력해주세요 alert가 뜬다", () => {
//       it("아이디 혹은 비밀번호가 올바르지 않은 경우 로그인이 진행되지 않는다", async () => {
//         // Arrange
//         const id = "testId";
//         const password = "";

//         const WrappedComponent = withReactQuery(<LoginForm />);
//         render(<WrappedComponent />);

//         // act
//         const loginButton = screen.getByRole("button", {
//           name: "로그인",
//         });

//         userEvent.click(loginButton);

//         expect(
//           screen.getByText("아이디와 비밀번호를 입력해주세요."),
//         ).toBeInTheDocument();
//       });
//       it("아이디 및 비밀번호가 올바른 경우 로그인이 진행된다", async () => {
//         // Arrange
//         const id = "testId";
//         const password = "testPassword";

//         const WrappedComponent = withReactQuery(<LoginForm />);
//         render(<WrappedComponent />);

//         // act
//         const loginButton = screen.getByRole("button", {
//           name: "로그인",
//         });

//         userEvent.click(loginButton);

//         expect(
//           screen.getByText("아이디와 비밀번호를 입력해주세요."),
//         ).toBeInTheDocument();
//       });
//     });
//   });
// });
// });
