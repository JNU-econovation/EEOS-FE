interface LabelProps {
  id?: string;
  label: string;
}

const Label = ({ id, label }: LabelProps) => {
  return (
    <label htmlFor={id} className="select-none truncate font-semibold">
      {label}
    </label>
  );
};

export default Label;
