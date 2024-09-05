"use client";
import { useRouter } from "next/navigation";
import Button from "../common/Button/Button";

const CancleBtn = () => {
  const router = useRouter();

  const handleCancle = () => router.back();
  return (
    <Button size="lg" color="gray" onClick={handleCancle}>
      취소
    </Button>
  );
};

export default CancleBtn;
