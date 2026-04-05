import LoginPageFooter from "@/components/feature/login/LoginPageFooter";
import LoginSection from "@/components/feature/login/LoginSection";
import { IntroLogo, Saly } from "@/components/icons";

const LoginPage = () => {
  return (
    <>
      <div className="grid h-[80vh] sm:h-[44rem] sm:grid-cols-[25rem_1fr] sm:shadow-lg">
        <div className="hidden flex-col gap-28 bg-secondary-10 p-8 sm:flex">
          <IntroLogo />
          <Saly />
        </div>
        <LoginSection />
      </div>
      <LoginPageFooter />
    </>
  );
};
export default LoginPage;
