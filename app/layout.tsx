import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

import UIContextProvider from "@/store/ui-context";
import GroupsContextProvider from "@/store/groups-context";
import SideNav from "@/app/ui/sidenav";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <UIContextProvider>
      <GroupsContextProvider>
        <html lang="en">
          <body
            className={`${inter.className} antialiased text-on-surface dark:text-on-surface-dark`}
          >
            <div className="flex h-screen flex-col md:flex-row md:overflow-hidden bg-white dark:bg-surface-primary-dark">
              <div className="w-full flex-none md:w-64 text-on-medium">
                <SideNav />
              </div>
              <div className="flex-grow p-6 md:overflow-y-auto md:p-12">
                {children}
              </div>
            </div>
            <div id="modal-root"></div>
          </body>
        </html>
      </GroupsContextProvider>
    </UIContextProvider>
  );
}
