import InputStatusView from "./InputStatusView";
import SentenceField from "./SentenceField";
import { useGetInputStatus } from "@/features/teamBuilding";

const UserInputModal = () => {
  const { data: userInfo, isLoading } = useGetInputStatus();

  if (isLoading) return null;

  return (
    <>
      <InputStatusView {...userInfo} />
      <SentenceField
        inputStatus={userInfo.inputStatus}
        initContent={userInfo.content}
      />
    </>
  );
};

export default UserInputModal;
