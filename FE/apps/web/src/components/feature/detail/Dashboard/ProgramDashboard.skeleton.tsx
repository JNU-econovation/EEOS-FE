import DashboardContentSkelton from "./components/DashboardContentSkelton";

const ProgramDashboardSkeleton = () => {
  return (
    <div className="animate-pulse">
      {/* title */}
      <div className="h-8 w-36 rounded-lg bg-slate-200" />

      <div className="mt-4" />

      {/* tab */}
      <div className="flex h-fit w-fit items-center justify-center gap-4 font-semibold">
        <div className="h-8 w-28 rounded-lg bg-slate-200" />
        <div className="h-8 w-28 rounded-lg bg-slate-200" />
        <div className="h-8 w-28 rounded-lg bg-slate-200" />
        <div className="h-8 w-28 rounded-lg bg-slate-200" />
        <div className="h-8 w-28 rounded-lg bg-slate-200" />
      </div>

      <DashboardContentSkelton />
    </div>
  );
};

export default ProgramDashboardSkeleton;
