import Image from "next/image";
import Link from "../Link";
import ROUTES from "@/constants/ROUTES";

const LOGIN = "로그인 후 사용해주세요!";

export default function LoginRedirectBtn() {
  return (
    <Link href={ROUTES.LOGIN} color="primary" size="md">
      <Image
        src="/icons/user.svg"
        alt="로그인 버튼"
        width={20}
        height={20}
        className="hidden sm:block sm:h-[20px] sm:w-[20px]"
      />
      {LOGIN}
    </Link>
  );
}
