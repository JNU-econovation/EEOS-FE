export const ProgramListLoader = () => {
  return (
    <div className="animate-pulse space-y-5">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="h-20 w-full rounded-lg bg-slate-100"></div>
      ))}
    </div>
  );
};
