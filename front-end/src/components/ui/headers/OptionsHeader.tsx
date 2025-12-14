import { CircleQuestionMark } from "lucide-react";
import { Link } from "react-router-dom";
import Notification from "../Notification";
import { useState } from "react";
import { useUser } from "@/hooks/user";

export default function OptionsHeader() {
  const [open, setOpen] = useState(false);
  const { data: user } = useUser();
  return (
    <header className="flex justify-end items-center gap-6 px-28 pt-10">
      {user && <Notification id={user._id} open={open} setOpen={setOpen} />}
      <CircleQuestionMark size={24} className="text-gray-700" />
      <Link
        to="/shop"
        className="text-sm font-semibold text-gray-700 rounded-md border border-gray-200 shadow-md px-4 py-2"
      >
        View Shop
      </Link>
    </header>
  );
}
