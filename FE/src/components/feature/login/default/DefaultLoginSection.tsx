import GuestLoginBtn from "./GuestLoginBtn";
import SlackLoginBtn from "./SlackLoginBtn";
import Title from "@/components/common/Title/Title";
import { ArrowRight } from "@/components/icons";

interface DefaultLoginSectionProps {
  changeLoginType: () => void;
}
const DefaultLoginSection = ({ changeLoginType }: DefaultLoginSectionProps) => {
  return (
    <div className="flex flex-col items-center justify-center gap-24">
      <Title text={"로그인"} />
      <div className="flex flex-col gap-6">
        <div className="flex flex-col items-center gap-6">
          <p className="font-light">에코노베이션 슬랙으로 로그인</p>
          <SlackLoginBtn />
        </div>
        <div className="flex flex-col items-center gap-6">
          <p className="font-light">게스트모드로 EEOS 둘러보기</p>
          <GuestLoginBtn />
        </div>
        <p
          onClick={() => changeLoginType()}
          className="mx-auto flex select-none"
        >
          관리자 로그인
          <ArrowRight />
        </p>
      </div>
    </div>
  );
};

export default DefaultLoginSection;
