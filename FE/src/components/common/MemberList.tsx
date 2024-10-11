import { SimpleMemberInfo } from "@/types/member";

interface MemberListProps {
  members: SimpleMemberInfo[];
  blur?: boolean;
}

const MemberList = ({ members, blur = false }: MemberListProps) => {
  return (
    <div
      className={`grid w-full auto-cols-auto grid-cols-2 justify-items-center gap-x-4 md:grid-cols-3 lg:grid-cols-4 ${
        blur ? "blur-md" : ""
      }`}
    >
      {members.map(({ memberId, name }) => (
        //TODO: attendMode 설정 임의로 추가됨. 추후 확인 필요
        <MemberListItem key={memberId} name={name} />
      ))}
    </div>
  );
};

const MemberListItem = ({ name }: Omit<SimpleMemberInfo, "memberId">) => {
  return (
    <div className="grid w-fit cursor-default select-none grid-cols-1 justify-items-center px-4 py-6 text-lg">
      <span>{name}</span>
    </div>
  );
};

export default MemberList;
