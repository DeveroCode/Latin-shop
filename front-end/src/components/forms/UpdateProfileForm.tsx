import { roles, type UserUpdateForm } from "@/types/index";
import LabelText from "../ui/text/LabelText";
import type { FieldErrors, UseFormRegister } from "react-hook-form";
import AlertLabel from "../ui/Alerts/AlertLabel";
import Span from "../ui/text/Span";

type UpdateProfileFormProps = {
  register: UseFormRegister<UserUpdateForm>;
  errors: FieldErrors<UserUpdateForm>;
};

export default function UpdateProfileForm({
  register,
  errors,
}: UpdateProfileFormProps) {
  return (
    <div className="py-5 w-full space-y-7">
      <fieldset className="flex justify-between gap-40">
        <div className="w-90 flex flex-col">
          <LabelText id="name">Name(s) and Last Name</LabelText>
          <Span>
            Represents the user’s first name(s) and last name. This information
            is used to identify the account owner across the platform, including
            orders, shipping details, and profile display. The name can be
            updated at any time from the account settings.
          </Span>
        </div>
        <div className="flex-1 flex gap-10">
          <fieldset className="w-1/2">
            <input
              type="text"
              id="name"
              placeholder="Name"
              className="w-full p-2 border border-gray-300 rounded-md"
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && <AlertLabel>{errors.name.message}</AlertLabel>}
          </fieldset>
          <fieldset className="w-1/2">
            <input
              type="text"
              id="last_name"
              placeholder="Last name"
              className="w-full p-2 border border-gray-300 rounded-md"
              {...register("last_name", { required: "Last name is required" })}
            />
            {errors.last_name && (
              <AlertLabel>{errors.last_name.message}</AlertLabel>
            )}
          </fieldset>
        </div>
      </fieldset>

      {/* Account Type and phone_numeber */}
      <fieldset className="flex justify-between gap-40">
        <div className="flex flex-col w-90">
          <LabelText id="role">Account Type</LabelText>
          <Span>
            Indicates the type of account the user has. A Buyer account is
            intended for purchasing products only, while a Seller account allows
            users to publish and sell products. The account type can be changed
            at any time if the user decides to start selling. A Seller account
            also retains all buyer functionalities, meaning sellers can both
            purchase and sell products.
          </Span>
        </div>
        <div className="flex-1">
          <select
            id="role"
            className="w-full p-2 border border-gray-300 rounded-md capitalize"
            {...register("role", { required: "Role is required" })}
          >
            {roles.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
          {errors.role && <AlertLabel>{errors.role.message}</AlertLabel>}
        </div>
      </fieldset>

      {/* Contact Details */}
      <fieldset className="flex justify-between gap-40">
        <div className="w-90 flex flex-col">
          <LabelText id="sensive-data">Sensitive details</LabelText>
          <Span>
            Contains sensitive personal information such as the user’s email
            address and exact residential location. This data is used for
            account security, communication, order processing, and delivery
            purposes, and is handled with strict privacy and data protection
            measures.
          </Span>
        </div>
        <div className="flex flex-1 gap-2 justify-between">
          <div className="flex flex-col w-full space-y-2">
            {/* City */}
            <fieldset className="flex flex-col gap-2">
              <input
                type="text"
                id="city"
                placeholder="City"
                className="p-2 border w-full border-gray-300 rounded-md"
                {...register("city", { required: "City is required" })}
              />
              {errors.city && <AlertLabel>{errors.city.message}</AlertLabel>}
            </fieldset>
            {/* Address */}
            <fieldset className="flex flex-col gap-2">
              <input
                type="text"
                id="address"
                placeholder="Address"
                className="p-2 w-full border border-gray-300 rounded-md"
                {...register("address", { required: "Address is required" })}
              />
              {errors.address && (
                <AlertLabel>{errors.address.message}</AlertLabel>
              )}
            </fieldset>
          </div>

          <div className="flex flex-col space-y-2">
            {/* Country */}
            <fieldset className="flex flex-col gap-2">
              <input
                type="text"
                id="country"
                placeholder="Country"
                className="p-2 border w-full border-gray-300 rounded-md"
                {...register("country", { required: "Country is required" })}
              />
              {errors.country && (
                <AlertLabel>{errors.country.message}</AlertLabel>
              )}
            </fieldset>
            {/* CP */}
            <fieldset className="flex flex-col gap-2">
              <input
                type="number"
                id="cp"
                placeholder="CP: 00000"
                className="p-2 border w-full border-gray-300 rounded-md"
                {...register("cp", {
                  required: "Postal code is required",
                  validate: (value) => value! > 0 || "Postal code cannot be 0",
                })}
              />
              {errors.cp && <AlertLabel>{errors.cp.message}</AlertLabel>}
            </fieldset>
          </div>
        </div>
      </fieldset>

      {/* Sensivity details */}
      <fieldset className="flex justify-between gap-40">
        <div className="w-90 flex flex-col">
          <LabelText id="name">More details</LabelText>
          <Span>
            Contains sensitive contact information such as the user’s email
            address and contact phone number. This data is used for account
            communication, security, and order-related notifications, and is
            handled with strict privacy and data protection measures.
          </Span>
        </div>
        <div className="flex-1 flex gap-10">
          <fieldset className="w-1/2">
            <input
              type="tel"
              id="phone_number"
              placeholder="Phone number"
              className="w-full p-2 border border-gray-300 rounded-md"
              {...register("phone_number", {
                required: "Phone number is required",
              })}
            />
            {errors.phone_number && (
              <AlertLabel>{errors.phone_number.message}</AlertLabel>
            )}
          </fieldset>
          <fieldset className="w-1/2">
            <input
              type="email"
              id="email"
              placeholder="Email"
              className="w-full p-2 border border-gray-300 rounded-md"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && <AlertLabel>{errors.email.message}</AlertLabel>}
          </fieldset>
        </div>
      </fieldset>
    </div>
  );
}
