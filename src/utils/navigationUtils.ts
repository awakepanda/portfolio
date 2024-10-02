import { siteStructure } from "@/app/constants/siteStructure";
import { usePathname } from "next/navigation";

export function useCurrentPage() {
  const pathname = usePathname();
  return siteStructure.find((page) => page.path === pathname);
}

export function useSiteStructure() {
  const pathname = usePathname();
  return siteStructure.map((item) => ({
    ...item,
    isActive: pathname === item.path,
  }));
}
