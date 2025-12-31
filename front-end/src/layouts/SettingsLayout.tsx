import Title from "@/components/ui/text/Title";
import Subtitle from "@/components/ui/text/Subtitle";
import { Outlet } from "react-router-dom";
import { navigation } from "../data/navigation-settings";
import Links from "@/components/ui/text/Links";
import OrderOptionsHeader from "@/components/ui/headers/OrderOptionsHeader";
import { User2Icon } from "lucide-react";
import { useUser } from "@/hooks/user";

export default function SettingsLayout() {
  const {data: user} = useUser();
  return (
    <>
      <section className="flex flex-col pt-7">
        <div className="flex items-center justify-between">
          <span className="text-blue-900 font-bold capitalize flex items-center gap-2">
            {" "}
            <User2Icon className="w-5 h-5" /> / Profile - {user?.name} {user?.last_name}
          </span>
          <OrderOptionsHeader />
        </div>
        <Title>User settings</Title>
        <Subtitle>Manage your account settings</Subtitle>
      </section>
      <section className="p-7 my-5 rounded-md flex gap-5 flex-col w-full">
        <nav className="flex gap-10 border-b-5 py-5 border-gray-100">
          {navigation.map((link, i) => (
            <Links key={i} link={link} />
          ))}
        </nav>
        <Outlet />
      </section>
    </>
  );
}
