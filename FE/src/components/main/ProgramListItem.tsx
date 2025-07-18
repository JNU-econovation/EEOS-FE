import ProgressDisplay from "../common/ProgressDisplay";
import { ProgramSimpleInfoDto } from "@/apis/dtos/program.dto";
import Link from "@/components/common/Link";
import ROUTES from "@/constants/ROUTES";
import { AccessType } from "@/types/access";
import { formatTimestamp } from "@/utils/convert";

interface ProgramListItemProps {
  programData: ProgramSimpleInfoDto;
  contentType: AccessType;
}

const ProgramListItem = ({
  programData,
  contentType,
}: ProgramListItemProps) => {
  const { programId, title, deadLine, attendMode } = programData;

  const linkUrl =
    contentType === "admin"
      ? ROUTES.ADMIN_DETAIL(programId)
      : contentType === "public"
      ? ROUTES.GUEST_DETAIL(programId)
      : ROUTES.DETAIL(programId);

  const isOnChecking = attendMode === "attend" || attendMode === "late";

  return (
    <Link
      className="flex w-full flex-col items-center justify-between gap-4 rounded-lg bg-gray-10 px-8 py-6 transition-all hover:bg-secondary-20 sm:flex-row"
      href={linkUrl}
      key={programId}
    >
      <p className="w-full truncate text-center text-lg font-bold sm:text-left">
        {title}
      </p>
      {isOnChecking ? (
        <ProgressDisplay progressText="출석 진행중" color="success" />
      ) : (
        <p className="shrink-0 text-base font-normal sm:w-64 ">
          {formatTimestamp(deadLine, "full")}
        </p>
      )}
    </Link>
  );
};

export default ProgramListItem;
