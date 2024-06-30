// import AttendToggleLabel from "./AttendToggleLabel";
import Link from "next/link";
import StatusToggleItem from "@/components/common/StatusToggleItem";
import AttendStatusToggle from "@/components/common/toggle/AttendStatusToggle";
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
