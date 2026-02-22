import { useCallback, useRef, useState } from "react";

interface UseBottomSheetProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  maxHeight: number;
  threshold: number;
}

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

export const useBottomSheet = ({
  isOpen,
  onOpen,
  onClose,
  maxHeight,
  threshold,
}: UseBottomSheetProps) => {
  // UI 렌더링용 state
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  // 이벤트 핸들러 내 동기 접근용 ref (stale closure 방지)
  const startYRef = useRef(0);
  const dragOffsetRef = useRef(0);
  const isDraggingRef = useRef(false);
  const rafRef = useRef<number | null>(null);

  // 열린 상태: 아래로 드래그할수록 높이 감소
  // 닫힌 상태: 위로 드래그할수록 높이 증가 (dragOffset이 음수)
  const getContentHeight = (): number => {
    if (!isDragging) return isOpen ? maxHeight : 0;
    return isOpen
      ? clamp(maxHeight - dragOffset, 0, maxHeight)
      : clamp(-dragOffset, 0, maxHeight);
  };

  const contentHeight = getContentHeight();

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    isDraggingRef.current = true;
    setIsDragging(true);
    startYRef.current = e.touches[0].clientY;
    dragOffsetRef.current = 0;
    setDragOffset(0);
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isDraggingRef.current) return;

    const delta = e.touches[0].clientY - startYRef.current;
    dragOffsetRef.current = delta;

    // rAF으로 setState throttle - 매 프레임 최대 1회만 re-render
    if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      setDragOffset(dragOffsetRef.current);
      rafRef.current = null;
    });
  }, []);

  const handleTouchEnd = useCallback(() => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }

    isDraggingRef.current = false;
    setIsDragging(false);

    // ref에서 최신 offset 읽기 (stale closure 방지)
    const offset = dragOffsetRef.current;

    if (isOpen) {
      if (offset > threshold) onClose();
    } else {
      if (-offset > threshold) onOpen();
    }

    dragOffsetRef.current = 0;
    setDragOffset(0);
  }, [isOpen, threshold, onClose, onOpen]);

  return {
    contentHeight,
    isDragging,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
  };
};
