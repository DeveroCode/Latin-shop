import { useUser } from "@/hooks/user";
import { navigation } from "../../data/navigation";
import Links from "../ui/Links";
import Logo from "../ui/Logo";
import Header from "./Header";
import { LogOut } from "lucide-react";

export default function Aside() {
  const { data: user } = useUser();
  return (
    <aside className="w-72 bg-gray-100 border-r border-gray-300 flex flex-col p-4 justify-between">
      <div>
        <Logo />

        <nav className="flex flex-col gap-2 mt-4">
          <Header />
          {navigation.map((link, i) => (
            <Links key={i} link={link} />
          ))}
        </nav>
      </div>

      <div className="flex items-center gap-2 mt-4">
        {user?.image ? (
          <img
            src={user.image}
            alt=""
            className="w-10 h-10 object-cover rounded-full"
          />
        ) : (
          <img
            src="/user.webp"
            alt=""
            className="w-10 h-10 object-cover rounded-full"
          />
        )}

        <div className="flex items-center gap-6">
          <div>
            <p className="text-sm font-bold text-gray-700">
              {user?.name} {user?.last_name}
            </p>
            <span className="text-xs text-gray-700 block">{user?.email}</span>
          </div>

          <button className="flex items-center gap-2 cursor-pointer">
            <LogOut className="text-gray-600 w-5 h-5" />
          </button>
        </div>
      </div>
    </aside>
  );
}
