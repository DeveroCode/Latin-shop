import Title from "@/components/ui/text/Title";
import Subtitle from "@/components/ui/text/Subtitle";
import OrderOptionsHeader from "@/components/ui/headers/OrderOptionsHeader";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { useUser } from "@/hooks/user";
import { ChevronLeft } from "lucide-react";

export default function SettingsLayout() {
  const {data: user} = useUser();
  const {pathname} = useLocation();
  return (
    <>
      <section className="flex flex-col pt-7">
        <div className="flex items-center justify-between">
          <span className="text-blue-900 font-bold capitalize flex items-center gap-2">
            {" "}
            <img src={`${user?.image}`} className="w-5 h-5 object-cover rounded-full" alt="" /> / Profile - {user?.name} {user?.last_name}
          </span>
          <OrderOptionsHeader />
        </div>

        <div className="flex items-center gap-2">
         {pathname !== "/dashboard/settings/general" && <NavLink to="/dashboard/settings/general"><ChevronLeft className="w-5 h-5" /></NavLink>}
           <Title>User settings</Title>
        </div>
        <Subtitle>Manage your account settings</Subtitle>
      </section>
      <section className="p-7 my-5 rounded-md flex gap-5 flex-col w-full">
        <Outlet />
      </section>
    </>
  );
}
