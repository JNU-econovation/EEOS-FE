"use client";
import CreateBtn from "./CreateBtn";
import LoginRedirectBtn from "./LoginRedirectBtn";
import Logo from "./Logo";
import UserBtn from "./UserBtn";
import useCheckIsLoggedIn from "@/hooks/useCheckIsLoggedIn";

const Header = () => {
  const isLoggedIn = useCheckIsLoggedIn();
  return (
    <header className="sticky top-0 z-50 flex w-full items-center justify-between rounded-b-xl bg-background px-2 py-4 shadow-sm sm:px-32">
      <Logo />
      <section className="flex w-fit items-center gap-4 sm:gap-8">
        {isLoggedIn ? (
          <>
            <UserBtn />
            <CreateBtn />
          </>
        ) : (
          <LoginRedirectBtn />
        )}
      </section>
    </header>
  );
};
export default Header;
