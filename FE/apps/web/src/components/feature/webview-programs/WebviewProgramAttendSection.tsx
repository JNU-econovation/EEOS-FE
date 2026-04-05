"use client";

import StatusToggleItem from "@/components/common/StatusToggleItem";
import MESSAGE from "@/constants/MESSAGE";
import { useGetProgramByProgramId } from "@/hooks/query/useProgramQuery";
import {
  useGetMyAttendStatus,
  usePostMyAttendance,
} from "@/hooks/query/useUserQuery";
import { useGetProgramId } from "@/hooks/usePrograms";
import { ProgramAttendStatus, ProgramStatus } from "@/types/program";
import { getEditableStatus } from "@/utils/program";
import { useQueryClient } from "@tanstack/react-query";

const WebviewProgramAttendSection = () => {
  const queryClient = useQueryClient();
  const programId = useGetProgramId();
  const { data: userInfo } = useGetMyAttendStatus(programId);
  const { mutate: updateAttendStatus } = usePostMyAttendance(programId);

  const programStatus = queryClient.getQueryData<ProgramStatus>([
    "programStatus",
    programId,
  ]);

  const { attendStatus } = userInfo;
  // const attendMode = queryClient.getQueryData<ProgramAttendStatus>([
  //   "attendMode",
  //   programId,
  // ]);

  const { data, isLoading, isError } = useGetProgramByProgramId(
    programId,
    true,
  );

  if (isLoading || isError) {
    return null; //TODO: UI 넣기
  }

  const attendMode = data.attendMode;

  const editableStatus = getEditableStatus({
    myAttendStatus: attendStatus,
    programStatus: programStatus,
    programAttendMode: attendMode,
  });

  const handleSelectorClick = () => {
    if (editableStatus === "EDITABLE")
      confirm(MESSAGE.CONFIRM.EDIT) && updateAttendStatus();
  };

  return (
    <section className="flex w-full items-center justify-center">
      <button className="mx-auto w-fit" onClick={handleSelectorClick}>
        <StatusToggleItem
          color={editableStatus === "EDITABLE" ? "green" : "gray"}
          text="출석 체크 하기"
        />
      </button>
    </section>
  );
};

export default WebviewProgramAttendSection;
