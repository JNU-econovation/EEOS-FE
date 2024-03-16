"use client";

import classNames from "classnames";
import Image from "next/image";
import { PropsWithChildren } from "react";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallbackNoIcon from "./ErrorFallbackNoIcon";
import useModal from "@/hooks/useModal";
import useOutsideRef from "@/hooks/useOutsideRef";

interface BottonSheetProps extends PropsWithChildren {}

const BottonSheet = ({ children }: BottonSheetProps) => {
  const { isOpen, openModal, closeModal } = useModal();
  const modalRef = useOutsideRef(closeModal);

  const modalStyle = classNames(
    "fixed left-0 z-10 flex h-72 w-full flex-col items-center gap-6 rounded-t-3xl border-t-2 bg-background pb-10 shadow-2xl transition-all duration-500",
    {
      "bottom-0": isOpen,
      "-bottom-[11rem]": !isOpen,
    },
  );

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    isOpen ? closeModal() : openModal();
  };

  return (
    <button
      ref={modalRef}
      onClick={openModal}
      type="button"
      className={modalStyle}
    >
      <div onClick={handleClick} className="pb-1 pt-3">
        <Image src="/icons/line.svg" alt="line" width={38} height={6} />
      </div>
      <ErrorBoundary FallbackComponent={ErrorFallbackNoIcon}>
        {children}
      </ErrorBoundary>
    </button>
  );
};
export default BottonSheet;
