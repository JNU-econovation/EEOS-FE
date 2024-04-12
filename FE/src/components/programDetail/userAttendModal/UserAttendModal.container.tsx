"use client";

import classNames from "classnames";
import Image from "next/image";
import { ErrorBoundary } from "react-error-boundary";
import LoginModal from "./LoginModal";
import UserAttendModal from "./UserAttendModal";
import ErrorFallbackNoIcon from "@/components/common/ErrorFallbackNoIcon";
import useModal from "@/hooks/useModal";
import useOutsideRef from "@/hooks/useOutsideRef";

interface UserAttendModalProps {
  programId: number;
  isLoggedIn: boolean;
}

const UserAttendModalContainer = ({
  programId,
  isLoggedIn,
}: UserAttendModalProps) => {
  const { isOpen, openModal, closeModal } = useModal();
  const modalRef = useOutsideRef(closeModal);

  const modalStyle = classNames(
    "fixed left-0 z-10 flex h-60 w-full flex-col items-center gap-5 rounded-t-3xl border-t-2 bg-background shadow-2xl transition-all duration-500",
    {
      "bottom-0": isOpen,
      "-bottom-[8rem]": !isOpen,
    },
  );

  const handleOpenModal = (e: React.MouseEvent) => {
    e.stopPropagation();
    isOpen ? closeModal() : openModal();
  };

  return (
    <button
      ref={modalRef}
      className={modalStyle}
      onClick={openModal}
      type="button"
    >
      <div onClick={handleOpenModal} className="pb-1 pt-3">
        <Image
          src="/icons/line.svg"
          alt="line"
          width={38}
          height={6}
          style={{ width: 38, height: 6 }}
        />
      </div>
      {isLoggedIn ? (
        <ErrorBoundary FallbackComponent={ErrorFallbackNoIcon}>
          <UserAttendModal programId={programId} />
        </ErrorBoundary>
      ) : (
        <LoginModal />
      )}
    </button>
  );
};
export default UserAttendModalContainer;
