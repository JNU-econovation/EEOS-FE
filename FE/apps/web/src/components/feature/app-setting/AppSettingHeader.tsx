import Spacing from "@/components/common/Spacing";
import { ArrowLeft } from "@/components/icons/items/ArrotLeft";

const AppSettingHeader = () => {
  return (
    <header className="relative shadow-sm">
      <div className="absolute left-5">
        <ArrowLeft />
      </div>
      <h1 className="text-basefont-medium text-center text-black">설정</h1>
      <Spacing size={18} direction="vertical" unit="px" />
    </header>
  );
};

export default AppSettingHeader;
