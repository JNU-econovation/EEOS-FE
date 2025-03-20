import Image from "next/image";
import { useRouter } from "next/navigation";

const UserBtn = () => {
  const router = useRouter();

  return (
    <button
      className="relative cursor-pointer"
      onClick={() => router.push("/mypage")}
    >
      <Image
        src="/icons/user.svg"
        alt="사용자 정보 확인"
        width={28}
        height={28}
        className="h-[28px] w-[28px]"
      />
    </button>
  );
};

export default UserBtn;
