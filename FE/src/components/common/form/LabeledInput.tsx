/**
 * 이 컴포넌트는 하위 호환성을 위하여 남겨둔 레거시 코드입니다. 추후 삭제될 예정입니다.
이 컴포넌트는 "LabeldInputFiled" 컴포넌트로 완전히 대체죌 수 있습니다. 해당 컴포넌트를 사용하고자 한다면, "LabeldInputFiled" 컴포넌트를 사용해주세요.
 */

"use client";

import Label from "./input/Label";

interface InputProps extends React.HTMLProps<HTMLInputElement> {
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  prefix?: string;
}

const LabeledInput = ({
  id,
  label,
  value,
  onChange = () => {},
  placeholder,
  type,
  prefix,
}: InputProps) => {
  return (
    <div className="flex flex-col gap-2">
      <Label id={id} label={label} />
      <div className="flex w-full gap-1 rounded-md border-[1.5px] border-gray-300 px-3 py-2 focus:border-tertiary-10">
        {prefix && <span className="whitespace-nowrap">{prefix}</span>}
        <input
          id={id}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          type={type}
          autoComplete="off"
          className="w-full bg-transparent focus:outline-none"
        />
      </div>
    </div>
  );
};

export default LabeledInput;
