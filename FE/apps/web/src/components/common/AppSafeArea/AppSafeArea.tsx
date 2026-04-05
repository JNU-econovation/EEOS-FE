import { PropsWithChildren } from "react";

interface AppSafeAreaProps extends PropsWithChildren {
  edges: ("top" | "bottom" | "left" | "right")[];
  classname?: string;
}

/**
 *
 * 해당 컴포넌트는 앱의 safe area를 임의로 조정할 수 있는 컴포넌트입니다.
 * 필수적으로 edges 를 받아야 합니다. edges는 safe area를 적용할 방향을 배열로 받습니다. 예를 들어, edges가 ["top", "bottom"]이라면, 상단과 하단에 safe area가 적용됩니다.
 * classname은 선택적으로 받을 수 있으며, 추가적인 스타일링이 필요한 경우 사용할 수 있습니다.
 */
const AppSafeArea = ({ children, edges, classname }: AppSafeAreaProps) => {
  const edgeClasses = edges
    .map((edge) => {
      switch (edge) {
        case "top":
          return "pt-16";
        case "bottom":
          return "pb-4";
        case "left":
          return "pl-6";
        case "right":
          return "pr-6";
        default:
          return "";
      }
    })
    .join(" ");

  return (
    <div
      className={`relative max-h-screen w-screen ${edgeClasses} ${
        classname || ""
      }`}
    >
      {children}
    </div>
  );
};

export default AppSafeArea;
