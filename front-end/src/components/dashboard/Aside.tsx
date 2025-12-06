import { navigation } from "../../data/navigation";
import Links from "../ui/Links";
import Logo from "../ui/Logo";

export default function Aside() {
  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col p-4">
        <Logo/>
      <nav className="flex flex-col gap-2">
       {navigation.map((link, i) => (
        <Links key={i} link={link} />
       ))}
      </nav>
    </aside>
  );
}
