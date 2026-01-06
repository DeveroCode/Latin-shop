import { useUser } from "@/hooks/user";
import { Navigate, Outlet } from "react-router-dom";
import { toast } from "react-toastify";

export default function RequireAuth() {
  const { data: user, isLoading } = useUser();
  if (isLoading) {
    return (
      <div className="bg-white min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );

    if(!user){
        toast.error("You must be logged in to access this page");
        return <Navigate to="/login" replace />
    }

    return <Outlet />
  }
}
