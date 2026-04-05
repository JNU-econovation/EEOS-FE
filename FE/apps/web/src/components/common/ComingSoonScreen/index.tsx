const ComingSoonScreen = () => {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center bg-background">
      <div className="relative mb-10 flex items-center justify-center">
        <div className="absolute h-40 w-40 rounded-full bg-warning-10" />
        <div className="absolute h-28 w-28 rounded-full bg-primary opacity-40" />
        <span className="relative select-none text-6xl">🚀</span>
      </div>

      <p className="mt-10 text-4xl font-bold text-paragraph">준비 중이에요</p>

      <div className="mt-4" />
      <p className="text-base text-gray-30">
        더 나은 서비스를 위해 열심히 만들고 있어요.
      </p>

      <div className="mt-10" />
      <div className="flex items-center gap-2 rounded-full bg-warning-10 px-6 py-3">
        <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-primary" />
        <p className="text-sm font-semibold text-paragraph">곧 만나요!</p>
      </div>

      <p className="mt-10 text-sm text-gray-30">
        조금만 기다려 주시면 더 멋진 모습으로 돌아올게요 ✨
      </p>
    </div>
  );
};

export default ComingSoonScreen;
