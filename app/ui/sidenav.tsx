import Link from "next/link";
import NavLinks from "@/app/ui/nav-links";
import ThemeChange from "./theme-change";

export default function SideNav() {
  return (
    <div className="flex h-full flex-col px-3 py-10 md:px-2 bg-surface-light dark:bg-outline-medium-dark border-r-[.5px] dark:border-none">
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
        <div className="hidden h-auto w-full grow rounded-md md:block"></div>
        <div className="flex justify-center">
          <ThemeChange />
        </div>
      </div>
    </div>
  );
}
