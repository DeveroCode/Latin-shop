import { useUser } from "@/hooks/user";
import { Search } from "lucide-react";
import { useEffect } from "react";
import { socketClient } from "../../socket/socket.ts";

export default function Header() {
  const { data: user, isLoading } = useUser();
  useEffect(() => {
    if (user?._id) {
      socketClient.connect(user._id);
    }
  }, [user]);

  if (isLoading) return <div>Loading...</div>;
  if (user)
    return (
      <form action="#" className="relative w-full max-w-sm py-5">
        <Search
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600"
          size={18}
        />
        <input
          type="text"
          placeholder="Search"
          className="bg-gray-100/50 border border-gray-300 rounded-md py-2 px-4 pr-10 w-full focus:outline-none focus:ring-2 focus:ring-blue-900 placeholder:text-gray-600"
        />
      </form>
    );
}
