import { Link } from "react-router-dom";
import type { links } from "../../types";

type LinkProps = {
  link: links;
};

export default function Links({ link }: LinkProps) {
  return (
    <Link to={link.url} className="text-gray-700 font-semibold text-left p-3 rounded hover:bg-gray-100 flex items-center">
      {link.icon && <link.icon className="w-4 h-4 mr-2" />}
      {link.name}
    </Link>
  );
}
