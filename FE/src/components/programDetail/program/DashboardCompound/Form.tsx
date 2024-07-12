// import { useState } from "react";
// import MarkdownEditor from "@/components/common/markdown/MarkdownEditor";

const Form = () => {
  // const [text, setText] = useState("");

  return (
    <form>
      {/* <MarkdownEditor
        value={text}
        onChange={(input: string) => setText(input)}
        label="질문을 입력해주세요"
        placeholder="질문을 입력해주세요"
        id="question"
      /> */}
      <textarea className="h-40 w-full rounded-sm border border-gray-300 p-4 " />
    </form>
  );
};

export default Form;
