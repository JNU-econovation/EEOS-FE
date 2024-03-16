import { Dispatch, SetStateAction } from "react";

interface InputStatusViewerProps {
  content: string;
  setType: Dispatch<SetStateAction<"editing">>;
}

export const InputStatusViewer = ({
  content,
  setType,
}: InputStatusViewerProps) => {
  const handleButtonClick = () => {
    setType("editing");
  };

  return (
    <div className="flex w-full flex-col items-end gap-4">
      <p className="w-full break-words text-left text-stroke-30">{content}</p>
      <button className="text-gray-30" onClick={handleButtonClick}>
        수정
      </button>
    </div>
  );
};
