import { useUser } from "@/hooks/user";

export default function GeneralView() {
  const { data: user } = useUser();
  return (
    <div className="flex gap-4 w-full py-10 px-7">
      <section className="w-[20%]">
        <div className="w-40 h-40 mx-auto">
          {user?.image ? (
            <img
              src={user?.image}
              alt=""
              className="w-full h-full object-cover rounded-full"
            />
          ) : (
            <img
              src="/user.webp"
              alt=""
              className="w-full h-full object-cover rounded-full"
            />
          )}
        </div>

        <img src="/star.webp" alt="" className="w-20 mx-auto" />
        <div className="-translate-y-5">
          <span className="text-center capitalize text-sm block">
            {user?.name} {user?.last_name}
          </span>
          <span className="text-center capitalize text-sm block">
            {user?.role}
          </span>
        </div>
      </section>

      <section className="w-[80%]">
        <div className="space-y-6">
          <section className="border-b border-gray-200 pb-4">
            <legend className="text-xs text-gray-600">
              General Information
            </legend>

            <fieldset className="flex items-center justify-between gap-2">
              <p className="text-gray-600">
                Name:{" "}
                <span className="font-semibold text-black">{user?.name}</span>
              </p>
              <p className="text-gray-600">
                Last Name:{" "}
                <span className="font-semibold text-black capitalize">
                  {user?.last_name}
                </span>
              </p>
              <p className="text-gray-600">
                Role:{" "}
                <span className="font-semibold text-black capitalize">
                  {user?.role}
                </span>
              </p>
            </fieldset>
          </section>
          <section className="border-b border-gray-200 pb-4">
            <legend className="text-xs text-gray-600">
              Personal Information
            </legend>

            <fieldset className="flex items-center justify-between gap-2">
              <p className="text-gray-600">
                Email:{" "}
                <span className="font-semibold text-black">{user?.email}</span>
              </p>
              <p className="text-gray-600">
                Phone Number:{" "}
                <span className="font-semibold text-black capitalize">
                  {user?.phone_number}
                </span>
              </p>
              <p className="text-gray-600">
                Country:{" "}
                <span className="font-semibold text-black capitalize">
                  {user?.country}
                </span>
              </p>
            </fieldset>
          </section>
          <section>
            <legend className="text-xs text-gray-600">
              Advanced Information
            </legend>

            <fieldset className="flex items-center justify-between gap-2">
              <p className="text-gray-600">
                Address:{" "}
                <span className="font-semibold text-black">
                  {user?.address}
                </span>
              </p>
              <p className="text-gray-600">
                C.P:{" "}
                <span className="font-semibold text-black capitalize">
                  #{user?.cp}
                </span>
              </p>
              <p className="text-gray-600">
                City:{" "}
                <span className="font-semibold text-black capitalize">
                  {user?.city}
                </span>
              </p>
            </fieldset>
          </section>
        </div>

        <p className="text-xs text-gray-600 text-center mt-20">Your information is securely protected with <span className="text-black font-bold">&copy; DeveroCode</span>. We never share your personal or private data with anyone.</p>
      </section>
    </div>
  );
}
