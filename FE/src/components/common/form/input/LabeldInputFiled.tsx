import Label from "./Label";

interface LabeldInputFiledProps {
  id: string;
  label: string;
  value: string;
  onChange?: (title: string) => void;
  placeholder: string;
  type: string;
  prefix?: string;
}

const LabeldInputFiled = ({
  id,
  label,
  value,
  onChange = () => {},
  placeholder,
  type,
  prefix,
}: LabeldInputFiledProps) => {
  return (
    <div className="flex flex-col gap-2">
      <Label id={id} label={label} />
      <div className="flex w-full gap-1 rounded-md border-[1.5px] border-gray-300 px-3 py-2 focus:border-tertiary-10">
        {prefix && <span className="whitespace-nowrap">{prefix}</span>}
        <input
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
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
