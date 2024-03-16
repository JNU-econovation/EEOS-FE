"use client";

import { useState } from "react";
import { useGetInputStatus } from "../../apis/getInputStatus";
import { FieldType } from "../../types";
import { getType } from "../../utils";
import { InputStatusForm } from "./Form";
import { InputStatusViewer } from "./Viewer";
import StatusToggleItem from "@/components/common/attendStatusToggle/StatusToggleItem";
import INPUT_STATUS from "@/constants/INPUT_STATUS";
import { InputStatus } from "@/types/teamBuilding";

interface EditFieldProps {
  inputStatus: InputStatus;
  initContent: string;
}

export const InputStatusEditor = () => {
  const { data: userInfo, isLoading } = useGetInputStatus();

  if (isLoading) return null;

  const { name, inputStatus, content } = userInfo;
  const { text, color } = INPUT_STATUS.TOGGLE[inputStatus];

  return (
    <>
      <div className="flex items-center gap-4">
        <p className="text-lg font-semibold">{name}</p>
        <StatusToggleItem text={text} color={color} />
      </div>
      <EditField inputStatus={inputStatus} initContent={content} />
    </>
  );
};

const EditField = ({ inputStatus, initContent }: EditFieldProps) => {
  const [type, setType] = useState<FieldType>(getType(inputStatus));

  return (
    <div className="m-auto min-h-[7rem] w-[80%] max-w-[60rem]">
      {type === "viewer" ? (
        <InputStatusViewer content={initContent} setType={setType} />
      ) : (
        <InputStatusForm
          initContent={initContent}
          type={type}
          setType={setType}
        />
      )}
    </div>
  );
};
