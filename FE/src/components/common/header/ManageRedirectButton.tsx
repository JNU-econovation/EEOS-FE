import Image from "next/image";
import Link from "../Link";
import ROUTES from "@/constants/ROUTES";

const BUTTONTEXT = "회원 관리";

const ManageRedirectButton = () => {
  return (
    <Link href={ROUTES.MANAGE} color="primary" size="md">
      <Image
        src="/icons/user.svg"
        alt="행사 추가"
        width={20}
        height={20}
        className="hidden sm:block sm:h-[20px] sm:w-[20px]"
      />
      {BUTTONTEXT}
    </Link>
  );
};

export default ManageRedirectButton;
