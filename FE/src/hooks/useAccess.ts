import { AccessType } from "@/types/access";
import { usePathname } from "next/navigation";

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
