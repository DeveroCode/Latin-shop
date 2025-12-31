import { NavLink } from "react-router-dom";
import type { links } from "@/types/index";

type LinkProps = {
  link: links;
};

export default function Links({ link }: LinkProps) {
  return (
    <NavLink
      to={link.url}
      end={false}
      className={({ isActive }) =>
        `
        text-gray-700 p-2 font-semibold text-left flex items-center
        ${isActive ? "border-l-2 border-gray-900" : ""}
        `
      }
    >
      {link.icon && <link.icon className="w-4 h-4 mr-2" />}
      {link.name}
    </NavLink>
  );
}
