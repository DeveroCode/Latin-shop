import { Outlet } from "react-router-dom";
import Aside from "../components/dashboard/Aside";
import { ToastContainer } from 'react-toastify';
import OptionsHeader from "@/components/ui/headers/OptionsHeader";

export default function DashboardLayout() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Aside />

      <div className="flex flex-col flex-1 bg-white w-[80%]">
        <OptionsHeader />
        <main className="flex-1 px-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
       <ToastContainer pauseOnHover={false} pauseOnFocusLoss={false} />
    </div>
  );
}
