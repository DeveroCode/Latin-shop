import { BellDotIcon, CircleQuestionMark } from "lucide-react";
import { Link } from "react-router-dom";

export default function OptionsHeader() {
  return (
    <header className="flex justify-end items-center gap-6 px-28 pt-10">
        <BellDotIcon size={24} className="text-gray-700" />
        <CircleQuestionMark size={24} className="text-gray-700" />
      <Link to="/shop" className="text-sm font-semibold text-gray-700 rounded-md border border-gray-200 shadow-md px-4 py-2">View Shop</Link>
    </header>
  )
}
