import Image from "next/image";
import IntroLogo from "./LogoAndIntro";

const LoginLeftSection = () => {
  return (
    <div className="hidden flex-col gap-28 bg-secondary-10 p-8 sm:flex">
      <IntroLogo />
      <Image src="/saly.svg" alt="login hero" width={400} height={400} />
    </div>
  );
};
export default LoginLeftSection;
