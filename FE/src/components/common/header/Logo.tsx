"use client";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import ROUTES from "@/constants/ROUTES";
import useAuth from "@/hooks/useAuth";

const INIT_CATEGORY = "all";
const INIT_STATUS = "active";
const INIT_PAGE = "1";

interface LogoProps {
  isAdmin?: boolean;
}

const Logo = ({ isAdmin }: LogoProps) => {
  const { isLoggedIn } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const alt = isAdmin ? "eeosAdminLogo" : "eeosLogo";
  const src = isAdmin ? "/icons/eeosAdminLogo.svg" : "/eeos_logo.svg";
  const mainUrl = isLoggedIn ? ROUTES.MAIN : ROUTES.GUEST_MAIN;
  const widdth = isAdmin ? 180 : 80;
  const height = isAdmin ? 36 : 36;
  const priority = true;

  const ImageProps = {
    src,
    alt,
    width: widdth,
    height,
    priority,
  };

  const handleClick = () => {
    if (pathname === mainUrl) {
      window.location.href = `${mainUrl}?category=${INIT_CATEGORY}&status=${INIT_STATUS}&page=${INIT_PAGE}`;
      return;
    }
    router.push(mainUrl);
  };

  return (
    <button type="button" onClick={handleClick}>
      <Image {...ImageProps} />
    </button>
  );
};

export default Logo;
