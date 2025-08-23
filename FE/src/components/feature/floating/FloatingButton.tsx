import Image from "next/image";

const FloatingButton = () => {
  return (
    <div className="absolute bottom-14 right-14">
      <button className="rounded-full bg-slate-50 p-4 text-white shadow-lg">
        <Image
          src="/icons/eeos_logo.svg"
          alt="Floating Button"
          width={24}
          height={24}
        />
      </button>
    </div>
  );
};

export default FloatingButton;
