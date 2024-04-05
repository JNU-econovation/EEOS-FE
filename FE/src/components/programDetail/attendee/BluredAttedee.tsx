import { attendStatuses } from "./AttendeeInfo.container";
import AttendeeStatus from "./AttendeeStatus";
import { MemberAttendStatusInfoDto } from "@/apis/dtos/member.dto";
import MemberList from "@/components/common/MemberList";

const members: MemberAttendStatusInfoDto[] = [
  {
    memberId: 1,
    name: "김민수",
    attendStatus: "attend",
  },
];

export default function BluredAttedee() {
  return (
    <div className="space-y-16">
      {attendStatuses.map((status) => (
        <div>
          <AttendeeStatus status={status} members={members} />
          <MemberList members={members} blur />
        </div>
      ))}
    </div>
  );
}
