import Image from "next/image";

const EeosAdminLogo = () => {
  return (
    <Image
      src="/icons/eeosAdminLogo.svg"
      className="mx-auto"
      alt="logo"
      width={180}
      height={36}
      priority
    />
  );
};

export default EeosAdminLogo;
