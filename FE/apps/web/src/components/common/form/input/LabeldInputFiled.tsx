import { UseFormRegister } from "react-hook-form";
import Label from "./Label";

interface LabeldInputFiledProps<RegitserType> {
  id: string;
  label: string;
  register: UseFormRegister<RegitserType>;
  placeholder: string;
  type: string;
  prefix?: string;
}
// TODO: 변경에 열려있는 컴포넌트로 만들기
const LabeldInputFiled = <RegitserType,>({
  id,
  label,
  register,
  placeholder,
  type,
  prefix,
}: LabeldInputFiledProps<RegitserType>) => {
  return (
    <div className="flex flex-col gap-2">
      <Label id={id} label={label} />
      <div className="flex w-full gap-1 rounded-md border-[1.5px] border-gray-300 px-3 py-2 focus:border-tertiary-10">
        {prefix && <span className="whitespace-nowrap">{prefix}</span>}
        <input
          {...register(id as never)}
          id={id}
          placeholder={placeholder}
          type={type}
          autoComplete="off"
          className="w-full bg-transparent focus:outline-none"
        />
      </div>
    </div>
  );
};

export default LabeldInputFiled;
