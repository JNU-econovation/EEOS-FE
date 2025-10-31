import Image from "next/image";

const Hyperlink = () => {
  return (
    <Image
      src="/icons/hyperlink.svg"
      alt="link"
      width="12"
      height="17"
      className="cursor-pointer"
    />
  );
};

export default Hyperlink;
