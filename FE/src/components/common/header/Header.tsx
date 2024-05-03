"use client";
import { useEffect, useState } from "react";
import CreateBtn from "./CreateBtn";
import LoginRedirectBtn from "./LoginRedirectBtn";
import Logo from "./Logo";
import UserBtn from "./UserBtn";
import { CheckIsLoggedIn } from "@/utils/authWithStorage";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const isLoggedIn = CheckIsLoggedIn();
    setIsLoggedIn(isLoggedIn);
    setIsLoading(false);
  }, []);

  return (
    <header className="sticky top-0 z-50 flex w-full items-center justify-between rounded-b-xl bg-background px-2 py-4 shadow-sm sm:px-32">
      <Logo isLoggedIn={isLoggedIn} />
      {!isLoading && (
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
      )}
    </header>
  );
};
export default Header;
