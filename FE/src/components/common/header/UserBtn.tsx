import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

const UserBtn = () => {
  const router = useRouter();

  return (
    <Link href="/mypage" className="relative cursor-pointer">
      <Image
        src="/icons/user.svg"
        alt="사용자 정보 확인"
        width={28}
        height={28}
        className="h-[28px] w-[28px]"
      />
    </Link>
  );
};

export default UserBtn;
