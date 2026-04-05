import ProgressDisplay from "@/components/common/ProgressDisplay";
import { ProgramSimpleInfoDto } from "@/apis/dtos/program.dto";
import Link from "@/components/common/Link";
import ROUTES from "@/constants/ROUTES";
import { AccessType } from "@/types/access";
import { formatTimestamp } from "@/utils/convert";

interface ProgramListItemProps {
  programData: ProgramSimpleInfoDto;
  accessType: AccessType;
}

/**
 * 프로그램 목록 아이템 컴포넌트
 *
 * 개선사항:
 * - Props명 contentType → accessType으로 통일
 */
export default function ProgramListItem({
  programData,
  accessType,
}: ProgramListItemProps) {
  const { programId, title, deadLine, attendMode } = programData;

  const linkUrl =
    accessType === "admin"
      ? ROUTES.ADMIN_DETAIL(programId)
      : accessType === "public"
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
}
