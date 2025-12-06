import { Outlet } from "react-router-dom";
import Header from "../components/dashboard/Header";
import Aside from "../components/dashboard/Aside";
import { ToastContainer } from 'react-toastify';

export default function DashboardLayout() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Aside />

      <div className="flex flex-col flex-1">
        <Header />
        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
       <ToastContainer pauseOnHover={false} pauseOnFocusLoss={false} />
    </div>
  );
}
