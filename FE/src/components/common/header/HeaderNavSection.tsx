"use client";

import CreateBtn from "./CreateBtn";
import LoginRedirectBtn from "./LoginRedirectBtn";
import ManageRedirectButton from "./ManageRedirectButton";
import UserBtn from "./UserBtn";
import CalendarBtn from "./CalendarBtn";
import useAuth from "@/hooks/useAuth";
import LogoutBtn from "@/components/common/header/LogoutButton";

interface HeaderNavSectionProps {
  isAdmin: boolean;
}

const HeaderNavSection = ({ isAdmin }: HeaderNavSectionProps) => {
  const { isLoading, isLoggedIn } = useAuth();

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
      {isLoggedIn ? (
        <>
          <CalendarBtn />
          <UserBtn />
          <LogoutBtn />
        </>
      ) : (
        <LoginRedirectBtn />
      )}
    </section>
  );
};

export default HeaderNavSection;
