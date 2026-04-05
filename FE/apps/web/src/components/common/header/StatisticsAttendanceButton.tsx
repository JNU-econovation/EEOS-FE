import Image from "next/image";
import Link from "../Link";
import ROUTES from "@/constants/ROUTES";

const StatisticsAttendanceButton = () => {
  return (
    <Link href={ROUTES.STATISTICS_ATTENDANCE} color="primary" size="md">
      <Image
        src="/icons/user.svg"
        alt="행사 추가"
        width={20}
        height={20}
        className="hidden sm:block sm:h-[20px] sm:w-[20px]"
      />
      출석 통계
    </Link>
  );
};

export default StatisticsAttendanceButton;
