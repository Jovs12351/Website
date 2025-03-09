import { ReactNode } from "react";
import DashboardNavbar from "@/components/dashboard-navbar";

export default function AccessKeyLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-800">
      <DashboardNavbar />
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] pointer-events-none opacity-10"></div>
      <main className="container mx-auto px-4 py-12 relative z-10">
        {children}
      </main>
    </div>
  );
}
