import { PropsWithChildren } from "react";

interface AppSafeAreaProps extends PropsWithChildren {
  edges?: ("top" | "bottom" | "left" | "right")[];
  classname?: string;
}
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
      className={`h-screen max-h-screen w-screen overflow-y-auto ${edgeClasses} ${
        classname || ""
      }`}
    >
      {children}
    </div>
  );
};

export default AppSafeArea;
