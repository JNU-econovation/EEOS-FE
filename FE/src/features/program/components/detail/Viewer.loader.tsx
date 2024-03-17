export const ProgramViewerLoader = () => {
  return (
    <div className="space-y-8">
      <div className="animate-pulse space-y-4 border-b-2 py-4">
        <div className="h-[1.6rem] w-12 rounded-lg bg-slate-200"></div>
        <div className="h-10 rounded-lg bg-slate-200"></div>
        <div className="h-7 rounded-lg bg-slate-200"></div>
      </div>
      <div className="animate-pulse space-y-4 [&>*]:h-5">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="w-full rounded-lg bg-slate-200"></div>
        ))}
      </div>
    </div>
  );
};
