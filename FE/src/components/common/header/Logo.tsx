"use client";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import ROUTES from "@/constants/ROUTES";
import useAuth from "@/hooks/useAuth";

const INIT_CATEGORY = "all";
const INIT_STATUS = "active";
const INIT_PAGE = "1";

const Logo = () => {
  const { isLoggedIn } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const mainUrl = isLoggedIn ? ROUTES.MAIN : ROUTES.GUEST_MAIN;

  const handleClick = () => {
    if (pathname === mainUrl) {
      window.location.href = `${mainUrl}?category=${INIT_CATEGORY}&status=${INIT_STATUS}&page=${INIT_PAGE}`;
      return;
    }
    router.push(mainUrl);
  };

  return (
    <button type="button" onClick={handleClick}>
      <Image
        src="/eeos_logo.svg"
        alt="logo"
        width={80}
        height={36}
        className="h-[36px] w-[80px]"
        priority
      />
    </button>
  );
};

export default Logo;
