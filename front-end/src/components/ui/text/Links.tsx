import { NavLink } from "react-router-dom";
import type { links } from "@/types/index";

type LinkProps = {
  link: links;
};

export default function Links({ link }: LinkProps) {
  return (
    <NavLink
      to={link.url}
      end={link.exact}
      className={({ isActive }) =>
        `
        flex items-center gap-2 p-2 font-semibold text-gray-700 transition
        ${isActive ? "border-l-2 border-gray-900 bg-gray-200/50" : ""}
        `
      }
    >
      {link.icon && <link.icon className="w-4 h-4" />}
      {link.name}
    </NavLink>
  );
}
