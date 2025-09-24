import { AttendanceStatisticsDto } from "@/apis/dtos/member.dto";
import ACTIVE_STATUS from "@/constants/ACTIVE_STATUS";
import classNames from "classnames";
import { useTableContext } from "../TableWrapper";

interface AttendanceStatisticsMemberListProps {
  memberList: AttendanceStatisticsDto[];
}
const AttendanceStatisticsMemberList = ({
  memberList,
}: AttendanceStatisticsMemberListProps) => {
  const { columnWidths } = useTableContext();

  const listColumnStyle = classNames(
    "grid h-20 w-fit items-center justify-items-center gap-4 border-b-2 border-stroke-10 px-10 sm:w-full",
  );

  return (
    <>
      {memberList.map(
        ({ id, absentCount, activeStatus, lateCount, name, penaltyPoint }) => (
          <div
            className={listColumnStyle}
            key={id}
            style={{ gridTemplateColumns: columnWidths.replace(/_/g, " ") }}
          >
            <span className="font-bold">
              {ACTIVE_STATUS.TAB[activeStatus].text}
            </span>
            <div />
            <span className="font-bold">{name}</span>
            <div />
            <span className="font-bold">{lateCount}</span>
            <span className="font-bold">{absentCount}</span>
            <span className="font-bold">{penaltyPoint}</span>
          </div>
        ),
      )}
    </>
  );
};

export default AttendanceStatisticsMemberList;
