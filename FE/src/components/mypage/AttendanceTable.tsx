import AttendanceBadge from "@/components/mypage/AttendanceBadge";
import { AttendanceInfoDto } from "@/apis/dtos/member.dto";

interface Props {
  attendanceList: AttendanceInfoDto[];
}

const AttendanceTable = ({ attendanceList }: Props) => {
  return (
    <div className="flex min-w-96 flex-col">
      <AttendanceTableHeader />
      {attendanceList.map((item) => (
        <AttendanceTableRow key={item.programId} {...item} />
      ))}
    </div>
  );
};

const AttendanceTableHeader = () => {
  return (
    <div className="grid grid-cols-[7.5rem_1fr_7.5rem] items-center justify-center border-b border-t border-stroke-10 bg-gray-10 px-10 py-2 text-center text-lg font-bold">
      <span>행사 상태</span>
      <span>행사 이름</span>
      <span>출석 상태</span>
    </div>
  );
};

const AttendanceTableRow = ({
  title,
  programStatus,
  attendStatus,
}: AttendanceInfoDto) => {
  return (
    <div className="grid grid-cols-[7.5rem_1fr_7.5rem] items-center justify-center border-b border-stroke-10 px-10  py-6 text-center text-lg">
      <span>{programStatus === "active" ? "진행중" : "완료"}</span>
      <span>{title}</span>
      <AttendanceBadge attendStatus={attendStatus} programId={1} />
    </div>
  );
};

export default AttendanceTable;
