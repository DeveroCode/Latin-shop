import { useUser } from "@/hooks/user";
import { House, Mail, MapPinHouse, Phone, User } from "lucide-react";
import { Link } from "react-router-dom";

export default function SaveAddressForm() {
  const { data: user } = useUser();
  return (
    <>
      {user ? (
        <div className="border border-gray-300 shadow-xs rounded-xs mt-4 p-10 space-y-3">
          <div className="flex gap-2 items-center text-gray-700">
            <Mail />
            <p>{user?.email}</p>
          </div>
          <div className="flex gap-2 items-center text-gray-700">
            <User />
            <p>
              {user?.name} {user?.last_name}
            </p>
          </div>
          <div className="flex gap-2 items-center text-gray-700">
            <Phone />
            <p>{user?.phone_number}</p>
          </div>
          <div className="flex gap-2 items-center text-gray-700">
            <House />
            <p>
              {user?.cp}, {user?.city}
            </p>
          </div>
          <div className="flex gap-2 items-center text-gray-700">
            <MapPinHouse />
            <p>{user?.address}</p>
          </div>
        </div>
      ) : (
        <div className="bg-blue-100/70 rounded-md py-3 px-5 text-center flex justify-between items-center">
          <div className="flex items-center gap-1">
            <House className="w-5 h-5 inline-block" />
            <span className="font-semibold text-sm text-gray-700">
              Shipping Address
            </span>
          </div>
          <Link
            to={"/dashboard/settings/profile"}
            className="text-gray-600 font-montserrat text-xs"
          >
            Edit
          </Link>
        </div>
      )}
    </>
  );
}
