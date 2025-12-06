import { useUser } from "@/hooks/user";
import { House } from "lucide-react";
import { Link } from "react-router-dom";

export default function SaveAddressForm() {
  const { data: user } = useUser();
  return (
    <>
      {user ? (
        <>
          <fieldset className="flex flex-col text-left">
            <label htmlFor="address" className="text-xs text-gray-400">
              Address
            </label>
            <input
              type="text"
              className="border-b border-gray-300 mt-2 px-2 py-1 focus:outline-none text-gray-400"
              value={`${user.address}`}
              placeholder="Address"
            />
          </fieldset>
          <fieldset className="flex flex-col text-left">
            <label htmlFor="address" className="text-xs text-gray-400">
              Zip, City, Street
            </label>
            <input
              type="text"
              className="border-b border-gray-300 mt-2 px-2 py-1 focus:outline-none text-gray-400"
              placeholder="Address"
              value={`${user.cp}, ${user.city}`}
            />
          </fieldset>
          <fieldset className="flex flex-col text-left">
            <label htmlFor="phone_number" className="text-xs text-gray-400">
              Phone Number
            </label>
            <input
              type="text"
              className="border-b border-gray-300 mt-2 px-2 py-1 focus:outline-none text-gray-400"
              placeholder="Address"
              value={`${user.phone_number}`}
            />
          </fieldset>
        </>
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
