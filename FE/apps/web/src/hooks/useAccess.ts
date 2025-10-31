import { usePathname } from "next/navigation";
import { AccessType } from "@/types/access";

export const useGetAccessType = (): AccessType => {
  const pathname = usePathname();
  if (pathname.includes("admin")) {
    return "admin";
  }
  if (pathname.includes("guest")) {
    return "public";
  }
  return "private";
};
