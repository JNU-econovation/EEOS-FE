"use client";

import { PropsWithChildren } from "react";
import BottomSheetHandle from "./components/BottomSheetHandle";
import { useBottomSheet } from "./hooks/useBottomSheet";

interface BottomSheetProps extends PropsWithChildren {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  /** 컨텐츠 영역 최대 높이 (px), 기본값: 400 */
  maxHeight?: number;
  /** 열기/닫기를 트리거하는 최소 드래그 거리 (px), 기본값: 100 */
  threshold?: number;
}

const BottomSheet = ({
  isOpen,
  onOpen,
  onClose,
  children,
  maxHeight = 400,
  threshold = 100,
}: BottomSheetProps) => {
  const {
    contentHeight,
    isDragging,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
  } = useBottomSheet({ isOpen, onOpen, onClose, maxHeight, threshold });

  return (
    <div className="fixed bottom-0 left-0 right-0 z-10 rounded-t-2xl border bg-white shadow-[0_0_5px_rgba(0,0,0,0.1)]">
      <BottomSheetHandle
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      />
      <div
        style={{
          height: contentHeight,
          transition: isDragging ? "none" : "height 0.3s ease",
          overflow: "hidden",
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default BottomSheet;
