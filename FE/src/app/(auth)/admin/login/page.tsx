import LoginForm from "@/components/feature/login/admin/LoginForm";
import { EeosAdminLogo, IntroLogo, Saly } from "@/components/icons";

const LoginPage = () => {
  return (
    <div className="grid h-[80vh] sm:h-[44rem] sm:grid-cols-[25rem_1fr] sm:shadow-lg">
      <div className="hidden flex-col gap-28 bg-secondary-10 p-8 sm:flex">
        <IntroLogo />
        <Saly />
      </div>
      <div className="flex items-center justify-center">
        <div className="rounded-lg border bg-gray-10 p-8">
          <EeosAdminLogo />
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
