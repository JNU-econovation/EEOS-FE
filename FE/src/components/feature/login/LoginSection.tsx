"use client";

import { SwitchCase } from "@toss/react";
import { useState } from "react";
import AdminLoginSection from "./admin/AdminLoginSection";
import DefaultLoginSection from "./default/DefaultLoginSection";

export type LoginType = "login" | "admin";

const LoginSection = () => {
  const [loginType, setLoginType] = useState<LoginType>("login");

  return (
    <>
      <SwitchCase
        value={loginType}
        caseBy={{
          login: (
            <DefaultLoginSection
              changeLoginType={() => setLoginType("admin")}
            />
          ),
          admin: (
            <AdminLoginSection changeLoginType={() => setLoginType("login")} />
          ),
        }}
        defaultComponent={
          <DefaultLoginSection changeLoginType={() => setLoginType("admin")} />
        }
      />
    </>
  );
};

export default LoginSection;
