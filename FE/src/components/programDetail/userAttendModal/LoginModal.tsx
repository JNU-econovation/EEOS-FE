// import AttendToggleLabel from "./AttendToggleLabel";
import Link from "next/link";
import AttendStatusToggle from "@/components/common/attendStatusToggle/AttendStatusToggle";
import StatusToggleItem from "@/components/common/attendStatusToggle/StatusToggleItem";
import ROUTES from "@/constants/ROUTES";

export default function LoginModal() {
  return (
    <div>
      <Link
        href={ROUTES.LOGIN}
        className="flex items-center justify-center gap-4"
      >
        <StatusToggleItem text="로그인" color="yellow" />
      </Link>
      <p className="my-5">로그인 후 사용해주세요! </p>
      <AttendStatusToggle
        selectedValue={"nonRelated"}
        disabled={true}
        onSelect={() => {}}
      />
    </div>
  );
}
