//TODO: 리팩토링 필요 : isLoggedIn을 props로 받아서 조건부 렌더링을 하고 있음

"use client";

import classNames from "classnames";
import { ErrorBoundary } from "react-error-boundary";
import LoginModal from "./LoginModal";
import UserAttendModal from "./UserAttendModal";
import ErrorFallbackNoIcon from "@/components/common/error/ErrorFallbackNoIcon";
import useModal from "@/hooks/useModal";
import useOutsideRef from "@/hooks/useOutsideRef";
import { useGetProgramId } from "@/hooks/usePrograms";
import { Line } from "@/components/icons";
import { Suspense } from "react";
import AttendStatusModalLoader from "./AttendStatusModal.loader";

interface UserAttendModalProps {
  isLoggedIn: boolean;
}

const UserAttendModalSection = ({ isLoggedIn }: UserAttendModalProps) => {
  const programId = useGetProgramId();
  const { isOpen, openModal, closeModal } = useModal();
  const modalRef = useOutsideRef(closeModal);

  const modalStyle = classNames(
    "fixed left-0 z-30 flex h-60 w-full flex-col items-center gap-5 rounded-t-3xl border-t-2 bg-background shadow-2xl transition-all duration-500",
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
        <Line />
      </div>
      {isLoggedIn ? (
        <ErrorBoundary FallbackComponent={ErrorFallbackNoIcon}>
          <Suspense fallback={<AttendStatusModalLoader />}>
            <UserAttendModal programId={programId} />
          </Suspense>
        </ErrorBoundary>
      ) : (
        <LoginModal />
      )}
    </button>
  );
};
export default UserAttendModalSection;
