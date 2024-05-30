import classNames from "classnames";
import Image from "next/image";
import Link from "next/link";

const defaultStyle = "flex w-64 justify-center gap-4 rounded-3xl py-3";

const colors = {
  slack: "bg-slack text-white text-paragraph",
  guest: "bg-primary text-black text-paragraph",
};

interface StyledLinkButtonProps {
  linkUrl: string;
  buttonText: string;
  imageUrl: string;
  color: keyof typeof colors;
}

export default function StyledLinkButton({
  linkUrl,
  buttonText,
  imageUrl,
  color,
}: Readonly<StyledLinkButtonProps>) {
  const buttonStyle = classNames(defaultStyle, colors[color]);
  return (
    <Link className={buttonStyle} href={linkUrl}>
      <Image src={imageUrl} alt="슬랙 로고" width={24} height={24} />
      <p className="text-center font-semibold">{buttonText}</p>
    </Link>
  );
}
