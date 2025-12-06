import { Link, useLocation } from "react-router-dom";

export default function Logo() {
  const { pathname } = useLocation();
  const startsWithAuth = pathname.startsWith("/auth");
  const startsWithIndex = pathname.startsWith("/");
  const startsWithDashboard = pathname.startsWith("/dashboard");
  return (
    <div className="w-16 h-16 flex items-center">
      <img
        src="/logo.png"
        className="invert-100 rotate-90 object-cover"
        alt="Logo"
      />
      {startsWithDashboard ? (
        <Link to="/">Dashboard</Link>
      ) : startsWithAuth || startsWithIndex ? (
        <div className="hidden"></div>
      ) : null}
    </div>
  );
}
