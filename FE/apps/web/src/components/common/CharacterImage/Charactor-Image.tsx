import Image from "next/image";

const CharacterImage = () => {
  const src = "/Character_E2.png";

  return <Image src={src} alt="EEOS character" width={140} height={140} />;
};

export default CharacterImage;
