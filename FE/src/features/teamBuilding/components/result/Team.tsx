import MemberList from "@/components/common/MemberList";
import { SimpleMemberInfo } from "@/types/member";

interface TeamProps {
  index: number;
  members: SimpleMemberInfo[];
}

const TeamHeader = ({ index }: { index: number }) => {
  return (
    <div className="w-full border-b-2 border-stroke-20 py-4">
      <span className="text-2xl font-semibold">Team {index + 1}</span>
    </div>
  );
};

export const Team = ({ index, members }: TeamProps) => {
  return (
    <div className="h-fit space-y-4">
      <TeamHeader index={index} />
      <MemberList members={members} />
    </div>
  );
};
