import Image from "next/image";
import LoginForm from "@/components/feature/login/admin/LoginForm";
import LoginLeftSection from "@/components/feature/login/LoginLeftSection";

const LoginPage = () => {
  return (
    <div className="grid h-[80vh] sm:h-[44rem] sm:grid-cols-[25rem_1fr] sm:shadow-lg">
      <LoginLeftSection />
      <div className="flex items-center justify-center">
        <div className="rounded-lg border bg-gray-10 p-8">
          <Image
            src="/icons/eeosAdminLogo.svg"
            className="mx-auto"
            alt="logo"
            width={180}
            height={36}
            priority
          />
          <LoginForm />
          <button
            className="mt-4 w-full rounded-lg bg-gray-20 p-2 font-semibold"
            disabled
          >
            ID / PW 찾기
          </button>
        </div>
      </div>
    </div>
  );
};
export default LoginPage;
