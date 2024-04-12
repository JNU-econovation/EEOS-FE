import React from "react";

interface LoginSectionProps {
  title: string;
  loginBtnComponent: React.ReactNode;
}

const LoginSection = ({ title, loginBtnComponent }: LoginSectionProps) => {
  return (
    <div className="flex flex-col items-center gap-4">
      <p className="font-light">{title}</p>
      {loginBtnComponent}
    </div>
  );
};

export default LoginSection;
