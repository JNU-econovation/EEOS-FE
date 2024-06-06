"use client";
import { useEffect, useState } from "react";
import CreateBtn from "./CreateBtn";
import LoginRedirectBtn from "./LoginRedirectBtn";
import ManageRedirectButton from "./ManageRedirectButton";
import UserBtn from "./UserBtn";
import { CheckIsLoggedIn } from "@/utils/authWithStorage";

interface HeaderNavSectionProps {
  isAdmin: boolean;
}

const HeaderNavSection = ({ isAdmin }: HeaderNavSectionProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const isLoggedIn = CheckIsLoggedIn();
    setIsLoggedIn(isLoggedIn);
    setIsLoading(false);
  }, []);

  if (isLoading) return null;
  if (isAdmin)
    return (
      <section className="flex w-fit items-center gap-4 sm:gap-8 ">
        <ManageRedirectButton />
        <CreateBtn />
      </section>
    );
  return (
    <section className="flex w-fit items-center gap-4 sm:gap-8">
      {isLoggedIn ? <UserBtn /> : <LoginRedirectBtn />}
    </section>
  );
};

export default HeaderNavSection;
