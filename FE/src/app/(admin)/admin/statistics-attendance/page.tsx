import Title from "@/components/common/Title/Title";
import PenaltyPointsButton from "@/components/feature/statistics-attendance/PenaltyPointsButton";
import StatisticsAttendanceTabSection from "@/components/feature/statistics-attendance/StatisticsAttendanceTabSection";

const StatisticsAttendancePage = () => {
  return (
    <div>
      <div className="flex items-center gap-4">
        <Title text="출석 통계" textSize="2xl" />
        <PenaltyPointsButton />
      </div>
      <div className="mt-8" />
      <StatisticsAttendanceTabSection />
    </div>
  );
};

export default StatisticsAttendancePage;
