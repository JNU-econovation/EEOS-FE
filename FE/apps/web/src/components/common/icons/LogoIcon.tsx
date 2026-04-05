import Image from "next/image";

interface LogoProps {
  isAdmin?: boolean;
}

const LogoIcon = ({ isAdmin }: LogoProps) => {
  const alt = isAdmin ? "eeosAdminLogo" : "eeosLogo";
  const src = isAdmin ? "/icons/eeosAdminLogo.svg" : "/eeos_logo.svg";
  const width = isAdmin ? 180 : 60;
  const height = isAdmin ? 36 : 36;
  const priority = true;
  const ImageProps = {
    src,
    alt,
    width,
    height,
    priority,
  };

  return <Image {...ImageProps} />;
};

export default LogoIcon;
