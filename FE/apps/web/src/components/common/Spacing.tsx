interface SpacingProps {
  size: number;
  direction: "vertical" | "horizontal";
  unit?: "px" | "rem";
}

const Spacing = (props: SpacingProps) => {
  const { size, direction, unit = "rem" } = props;
  // const className = `w-${size}${unit} h-${size}${unit}`;
  let style = {};
  if (direction === "vertical") {
    style = { height: `${size}${unit}` };
  } else {
    style = { width: `${size}${unit}` };
  }

  return <div style={style} />;
};

export default Spacing;
