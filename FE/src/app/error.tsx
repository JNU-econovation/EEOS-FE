"use client";

import ROUTES from "@/constants/ROUTES";
import { useLogoutMutation } from "@/hooks/query/useAuthQuery";
import { useRouter } from "next/navigation";

const Error = () => {
  const router = useRouter();
  const { mutate: logout } = useLogoutMutation();

  const handleLogout = () => {
    console.log("error page logout");
    logout();
    router.push(ROUTES.LOGIN);
  };

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center">
      <p className="text-4xl font-bold">해당 페이지를 본 당신..!!!</p>

      <div className="mt-8" />
      <p className="text-lg">
        괜찮다면 아래의 버튼 한번만 눌러주실 수 있나요 🥺
      </p>

      <div className="mt-8" />
      <button
        className="rounded-lg bg-primary px-4 py-2 font-semibold hover:bg-warning-20"
        onClick={handleLogout}
      >
        로그아웃 및 다시 실행
      </button>

      <p className="mt-8 text-sm text-gray-500">
        ⓘ 어떻게 해당 페이지를 확인하게 되었는지 블랙컴퍼니에 제보해주세요!
      </p>
    </div>
  );
};

export default Error;
