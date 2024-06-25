"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import ROUTES from "@/constants/ROUTES";
import useAuth from "@/hooks/useAuth";

interface LogoProps {
  isAdmin?: boolean;
}

const Logo = ({ isAdmin }: LogoProps) => {
  const { isLoggedIn } = useAuth();
  const router = useRouter();

  const alt = isAdmin ? "eeosAdminLogo" : "eeosLogo";
  const src = isAdmin ? "/icons/eeosAdminLogo.svg" : "/eeos_logo.svg";
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
    const redirectUrl = isAdmin
      ? ROUTES.ADMIN_MAIN
      : isLoggedIn
      ? ROUTES.MAIN
      : ROUTES.GUEST_MAIN;

    router.push(redirectUrl);
  };

  return (
    <button type="button" onClick={handleClick}>
      <Image {...ImageProps} />
    </button>
  );
};

export default Logo;
