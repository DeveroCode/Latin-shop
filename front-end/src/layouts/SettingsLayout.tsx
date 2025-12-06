import Title from "@/components/ui/Title";
import Subtitle from "@/components/ui/Subtitle";
import { Outlet } from "react-router-dom";
import { navigation } from "../data/navigation-settings";
import Links from "@/components/ui/Links";

export default function SettingsLayout() {
  return (
    <>
      <Title>Settings</Title>
      <Subtitle>Custom settings here</Subtitle>
      <section className="bg-white shadow-md p-7 my-5 rounded-md flex gap-5">
        <nav className="w-[20%]">
          {navigation.map((link, i) => (
            <Links key={i} link={link} />
          ))}
        </nav>
        <Outlet />
      </section>
    </>
  );
}
