import { getDate } from "@/utils/index";
import { EllipsisVertical, Search } from "lucide-react";

export default function OrderOptionsHeader() {
  return (
    <div className="px-22 flex items-center justify-between gap-3">
      <form action="#" className="relative w-48">
        <Search
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 font-bold"
          size={18}
        />
        <input
          type="text"
          placeholder="Search"
          className="border border-gray-200 shadow-md rounded-md py-2 px-4 pr-10 w-full focus:outline-none focus:ring-2  placeholder:text-gray-800"
        />
      </form>
      <span className="border border-gray-200 px-4 py-2 rounded-md shadow-md">
        {getDate()}
      </span>
      <button className="p-2 border border-gray-200 rounded-md shadow-md cursor-pointer">
        <EllipsisVertical size={24} className="text-gray-700" />
      </button>
    </div>
  );
}
