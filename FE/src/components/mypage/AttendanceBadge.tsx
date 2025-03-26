import { AttendStatus } from "@/types/member";
import { useRouter } from "next/navigation";

interface Props {
  attendStatus: AttendStatus;
  programId: number;
}

const AttendanceBadge = ({ attendStatus, programId }: Props) => {
  const router = useRouter();

  switch (attendStatus) {
    case "nonResponse":
      return (
        <button
          className="font-bold text-gray-30 underline underline-offset-4"
          onClick={() => router.push(`/detail/${programId}`)}
        >
          출석하러 가기
        </button>
      );
    case "attend":
      return (
        <div className="mx-auto flex w-fit items-center gap-2 rounded-3xl bg-success-10 px-4 py-1 font-semibold text-success-30">
          <CheckSVG />
          <span>참석</span>
        </div>
      );
    case "absent":
      return (
        <div className="mx-auto flex w-fit items-center gap-2 rounded-3xl bg-action-10 px-4 py-1 font-semibold text-action-20">
          <XSVG />
          <span>불참</span>
        </div>
      );
    case "late":
      return (
        <div className="mx-auto flex w-fit items-center gap-2 rounded-3xl bg-warning-10 px-4 py-1 font-semibold text-warning-30">
          <ClockSVG />
          <span>지각</span>
        </div>
      );
    default:
      return null;
  }
};

const CheckSVG = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 fill-none stroke-success-30 stroke-2"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <path d="M17.8741 5.8728L8.24915 15.4978L3.87415 11.1228" />
  </svg>
);

const XSVG = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 stroke-action-20 stroke-2"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <path d="M16.124 5.28271L5.62402 15.7827" />
    <path d="M5.62402 5.28271L16.124 15.7827" />
  </svg>
);

const ClockSVG = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 22 22"
    className="h-5 w-5 fill-none stroke-warning-30  stroke-2"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <g clip-path="url(#clip0_3221_675)">
      <path d="M10.8739 20.0774C15.7064 20.0774 19.6239 16.1599 19.6239 11.3274C19.6239 6.4949 15.7064 2.57739 10.8739 2.57739C6.04141 2.57739 2.1239 6.4949 2.1239 11.3274C2.1239 16.1599 6.04141 20.0774 10.8739 20.0774Z" />
      <path d="M10.8741 6.07764V11.3276L14.3741 13.0776" />
    </g>
    <defs>
      <clipPath id="clip0_3221_675">
        <rect className="translate-x-0.374146 translate-y-0.827637 h-[21px] w-[21px] fill-white" />
      </clipPath>
    </defs>
  </svg>
);

export default AttendanceBadge;
