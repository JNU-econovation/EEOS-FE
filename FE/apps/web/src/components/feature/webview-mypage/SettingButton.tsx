import Setting from "@/components/icons/items/Setting";
import ROUTES from "@/constants/ROUTES";
import Link from "next/link";

const SettingButton = () => {
  return (
    <Link href={ROUTES.MOBILE.SETTING.MAIN}>
      <Setting />
    </Link>
  );
};

export default SettingButton;
