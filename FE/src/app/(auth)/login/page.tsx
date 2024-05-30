import LoginLeftSection from "@/components/login/LoginLeftSection";
import LoginRightSection from "@/components/login/LoginRightSection";

const LoginPage = () => {
  return (
    <div className="grid h-[80vh] sm:h-[44rem] sm:grid-cols-[25rem_1fr] sm:shadow-lg">
      <LoginLeftSection />
      <LoginRightSection />
    </div>
  );
};
export default LoginPage;
