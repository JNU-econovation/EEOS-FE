import { useGetUserActiveStatus } from "../../apis/getActiveStatus";
import { UserActiveStatusEditorLoader } from "./Editor.loader";
import ActiveStatusTab from "./Tab";

export const UserActiveStatusEditor = () => {
  const {
    data: { name, activeStatus },
    isLoading,
  } = useGetUserActiveStatus();

  if (isLoading) return <UserActiveStatusEditorLoader />;

  return (
    <>
      <p className="text-lg font-bold">{name}</p>
      <p className="text-sm">본인의 회원 상태를 선택해주세요.</p>
      <ActiveStatusTab activeStatus={activeStatus} />
    </>
  );
};
