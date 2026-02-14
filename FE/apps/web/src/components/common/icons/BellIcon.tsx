import Image from "next/image";

const imageUrl = "/icons/bell.svg";
const alt = "알림 아이콘";

const BellIcon = () => {
  return (
    <div>
      <Image src={imageUrl} alt={alt} width={24} height={24} />
    </div>
  );
};

export default BellIcon;
