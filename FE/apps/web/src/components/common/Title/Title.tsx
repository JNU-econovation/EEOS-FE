import classNames from "classnames";

interface TitleProps {
  text: string;
  textColor?: keyof typeof titleColors;
  textSize?: keyof typeof titleSize;
  textWeight?: keyof typeof titleWeight;
}

const titleColors = {
  black: "text-black",
  white: "text-background",
  error: "text-error",
  gray: "text-gray-30",
};

const titleSize = {
  xs: "text-xs sm:text-sm",
  sm: "text-sm sm:text-base",
  md: "text-md sm:text-base",
  lg: "text-lg sm:text-base",
  xl: "text-lg sm:text-xl",
  "2xl": "text-2xl sm:text-3xl", // default
};

const titleWeight = {
  bold: "font-bold",
  semiBold: "font-semibold",
  normal: "font-normal",
};

const Title = ({
  text,
  textColor = "black",
  textSize = "2xl",
  textWeight = "bold",
}: TitleProps) => {
  const titleStyle = classNames(
    titleColors[textColor],
    titleSize[textSize],
    titleWeight[textWeight],
  );

  return <h1 className={titleStyle}>{text}</h1>;
};
export default Title;
