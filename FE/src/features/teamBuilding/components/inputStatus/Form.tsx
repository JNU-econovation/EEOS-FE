"use client";

import classNames from "classnames";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import Button from "@/components/common/Button";
import {
  FieldType,
  useCreateSentence,
  useUpdateSentence,
} from "@/features/teamBuilding";

const color = {
  default: "border-gray-20",
  inputting: "border-gray-40 text-stroke-30",
  editing: "border-gray-40 text-stroke-30",
};

interface InputStatusFormProps {
  initContent: string;
  type: FieldType;
  setType: Dispatch<SetStateAction<FieldType>>;
}

export const InputStatusForm = ({
  initContent,
  type,
  setType,
}: InputStatusFormProps) => {
  const [content, setContent] = useState(initContent);
  const textareaRef = useRef(null);
  const textareaStyle = classNames(
    "w-full resize-none overflow-hidden border-b-2 p-4 text-sm leading-relaxed outline-none",
    color[type],
  );

  useEffect(() => {
    handleResizeHeight();
  }, [content]);

  const { mutate: createSentence } = useCreateSentence();
  const { mutate: editSentence } = useUpdateSentence();

  const handleResizeHeight = () => {
    textareaRef.current.style.height = "auto";
    textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    handleResizeHeight();
    setContent(e.target.value);

    if (e.target.value.length > 0 && type === "default") {
      setType("inputting");
    }
  };

  const handleReset = () => {
    if (type === "inputting") {
      setContent("");
      setType("default");
      return;
    }

    if (type === "editing") {
      setType("viewer");
      return;
    }
  };

  const handleSubmit = () => {
    if (content.length === 0) {
      toast.error("문장을 입력해주세요.");
      return;
    }
    if (type === "inputting") {
      createSentence({ content });
      setType("viewer");
      return;
    }
    if (type === "editing") {
      editSentence({ content });
      setType("viewer");
      return;
    }
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSubmit();
  };

  const handlePressEnter = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <form
      className="flex w-full flex-col items-end gap-4"
      onSubmit={handleFormSubmit}
    >
      <textarea
        maxLength={200}
        rows={1}
        ref={textareaRef}
        placeholder="문장을 입력해주세요."
        value={content}
        onChange={handleChange}
        className={textareaStyle}
        onKeyDown={handlePressEnter}
      />
      {type !== "default" && <Buttons formReset={handleReset} />}
    </form>
  );
};

const Buttons = ({ formReset }: { formReset: () => void }) => {
  return (
    <div className="flex gap-4">
      <Button color="white" size="sm" onClick={formReset}>
        취소
      </Button>
      <Button color="primary" size="sm" type="submit">
        완료
      </Button>
    </div>
  );
};
