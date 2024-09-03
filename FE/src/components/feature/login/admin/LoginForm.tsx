"use client";

import { FormEvent, useEffect, useState } from "react";
import { useAdminLoginMutation } from "@/hooks/query/useAuthQuery";

const LoginForm = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const { mutate, isError } = useAdminLoginMutation();

  const loginToAdmin = async (e: FormEvent) => {
    e.preventDefault();
    if (!id || !password) {
      alert("아이디와 비밀번호를 입력해주세요.");
      return;
    }
    mutate({ id, password });
  };

  useEffect(() => {
    setPassword("");
  }, [isError]);

  return (
    <form className="mt-12 flex flex-col gap-3" onSubmit={loginToAdmin}>
      <input
        type="text"
        aria-label="아이디"
        name="id"
        placeholder="아이디"
        className="mx-8 p-2"
        value={id}
        onChange={(e) => setId(e.target.value)}
      />
      <input
        type="password"
        aria-label="비밀번호"
        role="password"
        name="password"
        placeholder="비밀번호"
        className="mx-8 p-2"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="mt-4 w-full rounded-lg bg-primary p-2 font-semibold">
        로그인
      </button>
    </form>
  );
};

export default LoginForm;
