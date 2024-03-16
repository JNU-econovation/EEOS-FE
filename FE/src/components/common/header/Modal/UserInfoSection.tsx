import ActiveStatusTab from "./ActiveStatusTab";
import { useGetActiveStatus } from "@/features/user";

const MESSAGE = "본인의 회원 상태를 선택해주세요.";

const UserInfoSection = () => {
  const { data: myActiveData } = useGetActiveStatus();
  const { name, activeStatus } = myActiveData;

  return (
    <>
      <p className="text-lg font-bold">{name}</p>
      <p className="text-sm">{MESSAGE}</p>
      <ActiveStatusTab activeStatus={activeStatus} />
    </>
  );
};
export default UserInfoSection;
