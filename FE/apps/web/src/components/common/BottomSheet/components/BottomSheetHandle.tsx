interface BottomSheetHandleProps {
  onTouchStart: (e: React.TouchEvent) => void;
  onTouchMove: (e: React.TouchEvent) => void;
  onTouchEnd: () => void;
}

const BottomSheetHandle = ({
  onTouchStart,
  onTouchMove,
  onTouchEnd,
}: BottomSheetHandleProps) => {
  return (
    <div
      className="flex h-10 w-full touch-none select-none items-center justify-center"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <div className="h-1 w-10 rounded-full bg-slate-300" />
    </div>
  );
};

export default BottomSheetHandle;
