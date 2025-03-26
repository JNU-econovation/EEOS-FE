import { ReactElement } from "react";

const Dimmed = ({ children }: { children: ReactElement }) => {
  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50">{children}</div>
  );
};

export default Dimmed;
