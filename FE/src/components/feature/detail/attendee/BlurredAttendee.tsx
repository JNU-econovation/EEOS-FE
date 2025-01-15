import AttendeeStatus from "./AttendeeStatus";
import { MemberAttendStatusInfoDto } from "@/apis/dtos/member.dto";
import MemberList from "@/components/common/MemberList";
import { AttendStatus } from "@/types/member";

const mockMember: MemberAttendStatusInfoDto = {
  memberId: 1,
  name: "20기 박건규",
  attendStatus: "attend",
};

interface BlurredAttendeeProps {
  status: AttendStatus;
}

export default function BlurredAttendee({ status }: BlurredAttendeeProps) {
  const population =
    status === "attend"
      ? 52
      : status === "late"
      ? 3
      : status === "absent"
      ? 1
      : 0;
  const members = Array.from({ length: population }, (_, i) => ({
    ...mockMember,
    memberId: i + 1,
  }));
  return (
    <div className="space-y-16">
      <AttendeeStatus status={status} members={members} />
      <MemberList members={members} blur />
    </div>
  );
}
