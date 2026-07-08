import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./timeline/Sidebar";
import LargeSuccessLoader from "@/components/common/Loader";

export default function PostLoginLayout() {
  return (
    <div className="flex h-screen w-full bg-[#edf2f7] dark:bg-[#0c130e] text-zinc-900 dark:text-zinc-100 overflow-hidden">
      {/* Left Sidebar - static */}
      <Sidebar />
      
      {/* Right Content Area - scrolls independently */}
      <div className="flex-1 h-full overflow-y-auto relative">
        <Suspense fallback={<div className="min-h-screen flex justify-center items-center"><LargeSuccessLoader /></div>}>
          <Outlet />
        </Suspense>
      </div>
    </div>
  );
}
