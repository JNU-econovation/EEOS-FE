/**
 * @jest-environment jsdom
 */

import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import renderer from "react-test-renderer";
import SlackLoginBtn from "../default/SlackLoginBtn";
import { Link } from "@/__test__/__mock__/Link";
import withReactQuery from "@/__test__/utils/withReactQuery";

jest.mock("next/navigation", () => ({
  useSearchParams: jest.fn(() => ({
    get: jest.fn(() => "code"),
  })),
  useRouter: jest.fn(() => ({
    back: jest.fn(),
    replace: jest.fn(),
  })),
}));

jest.mock("@/hooks/query/useAuthQuery", () => ({
  useSlackLoginMutation: jest.fn(() => ({
    mutate: jest.fn(),
  })),
}));

const MockNextRouterComponent = Link;

jest.mock("next/link", () => {
  return ({ children, href }) => {
    return (
      <MockNextRouterComponent href={href}>{children}</MockNextRouterComponent>
    );
  };
});

describe("SlackLoginBtn", () => {
  let MockNextRouterComponent;

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("올바르게 렌더링 된다", async () => {
    const WrappedComponent = withReactQuery(<SlackLoginBtn />);
    const tree = renderer.create(<WrappedComponent />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it("버튼 클릭시 슬랙 로그인 페이지로 이동한다", async () => {
    const user = userEvent.setup();

    render(<SlackLoginBtn />);

    const button = screen.getByRole("link");
    await user.click(button);

    expect(MockNextRouterComponent).toHaveBeenCalled;
  });
});
