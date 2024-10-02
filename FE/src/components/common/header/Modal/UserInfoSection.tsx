import { useGetMyActiveStatus } from "@/hooks/query/useUserQuery";

const MESSAGE = "활동 상태 변경은 관리자에게 요청해주세요!";

const UserInfoSection = () => {
  const { data: myActiveData } = useGetMyActiveStatus();
  const { name, activeStatus } = myActiveData;

  return (
    <>
      <p className="text-lg font-bold">{name}</p>
      <p className="text-sm">{MESSAGE}</p>
      {/* <ActiveStatusTab activeStatus={activeStatus} /> */}
      {/* TODO: tabitem을 타 컴포넌트로 변경할 필요 있음 .*/}
      {/* TODO: 해당 컴포넌트를 공통 컴포넌트로 뺼 필요성 있음.  */}

      <div className="flex h-fit min-h-[4rem] w-fit min-w-[8rem] cursor-pointer items-center justify-center rounded-md border-2 border-tertiary-20 bg-secondary-20 px-4 py-2 text-lg font-semibold text-tertiary-20">
        <p>{activeStatus}</p>
      </div>
    </>
  );
};
export default UserInfoSection;
