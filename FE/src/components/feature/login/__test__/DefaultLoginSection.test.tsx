/**
 * @jest-environment jsdom
 */

import { render, screen } from "@testing-library/react";
import renderer from "react-test-renderer";
import DefaultLoginSection from "../default/DefaultLoginSection";
import { Link } from "@/__test__/__mock__/Link";
import getResponse from "@/__test__/__stub__/response";
import withReactQuery from "@/__test__/utils/withReactQuery";
import { https } from "@/apis/instance";

//axios mocking
jest.mock("@/apis/instance");
const mockHttps = https as jest.MockedFunction<typeof https>;

const mockReturnData = getResponse({
  url: "/auth/login/slack",
  method: "POST",
});

mockHttps.mockResolvedValue(mockReturnData);

// next.js mocking
const MockNextRouterComponent = Link;

jest.mock("next/navigation", () => ({
  useSearchParams: jest.fn(() => ({
    get: jest.fn(() => "code"),
  })),
  useRouter: jest.fn(() => ({
    back: jest.fn(),
    replace: jest.fn(),
  })),
}));

jest.mock("next/link", () => {
  return ({ children, href }) => {
    return (
      <MockNextRouterComponent href={href}>{children}</MockNextRouterComponent>
    );
  };
});

// module mocking
const changeLoginType = jest.fn();

describe("DefaultLoginSection", () => {
  it("올바르게 렌더링 된다", async () => {
    const WrappedComponent = withReactQuery(
      <DefaultLoginSection changeLoginType={changeLoginType} />,
    );
    const tree = renderer.create(<WrappedComponent />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it("게스트 모드로 이동할 수 있다", async () => {
    const WrappedComponent = withReactQuery(
      <DefaultLoginSection changeLoginType={changeLoginType} />,
    );
    render(<WrappedComponent />);

    const guestLoginButton = screen.getByRole("link", {
      name: "Visit EEOS",
    });

    guestLoginButton.click();

    expect(MockNextRouterComponent).toHaveBeenCalled();
  });

  it("관리자 로그인 버튼 클릭시 로그인 타입을 변경한다", () => {
    const WrappedComponent = withReactQuery(
      <DefaultLoginSection changeLoginType={changeLoginType} />,
    );
    render(<WrappedComponent />);

    const adminLoginSpan = screen.getByText("관리자 로그인");

    adminLoginSpan.click();

    expect(changeLoginType).toHaveBeenCalledTimes(1);
  });
});
