import { useUser } from "@/hooks/user";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { socketClient } from "../../socket/socket.ts";
import Notification from "../ui/Notification.tsx";

export default function Header() {
  const { data: user, isLoading } = useUser();
  const [open, setOpen] = useState(false);
  // Call the socket.io
  useEffect(() => {
    if (user?._id) {
      socketClient.connect(user._id);
    }
  }, [user]);

  if (isLoading) return <div>Loading...</div>;
  if (user)
    return (
      <header className="py-5 bg-white border-b border-gray-200 flex items-center justify-between px-6">
        <form action="#" className="relative w-full max-w-sm">
          <Search
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={18}
          />
          <input
            type="text"
            placeholder="Search"
            className="bg-gray-100/50 rounded-xs py-2 px-4 pr-10 w-full focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </form>

        <div className="flex items-center gap-4">
          <Notification id={user._id} open={open} setOpen={setOpen} />
          <div className="flex items-center gap-2">
            {user.image ? (
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
            <span className="text-sm font-medium text-gray-700">
              {user.name}
            </span>
          </div>
        </div>
      </header>
    );
}
