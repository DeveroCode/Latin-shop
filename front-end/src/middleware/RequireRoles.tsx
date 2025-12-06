import { useUser } from "@/hooks/user";
import type { UserRole } from "../types";
import { toast } from "react-toastify";
import { Navigate, Outlet } from "react-router-dom";

export default function RequireRoles({ roles }: { roles: UserRole[] }) {
  const { data: user, isLoading } = useUser();
  if (isLoading)
    return <div className="bg-white min-h-screen text-center">Loading...</div>;
  if (!user || !roles.includes(user.role)) {
    toast.error("You don't have permission to access this page");
    return <Navigate to="/dashboard" />;
  }

  return <Outlet />;
}
