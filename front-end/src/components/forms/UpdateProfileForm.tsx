import { roles, type UserUpdateForm } from "@/types/index";
import LabelText from "../ui/LabelText";
import type { FieldErrors, UseFormRegister } from "react-hook-form";
import AlertLabel from "../ui/AlertLabel";

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
      {/* Campos principales */}
      <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-y-4 gap-x-5 items-center">
        {/* Account Type */}
        <LabelText id="role">Account Type</LabelText>
        <fieldset>
          <select
            id="role"
            className="w-full p-2 border border-gray-300 rounded-md"
            {...register("role", { required: "Role is required" })}
          >
            {roles.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
          {errors.role && <AlertLabel>{errors.role.message}</AlertLabel>}
        </fieldset>

        {/* Name */}
        <LabelText id="name">Name</LabelText>
        <fieldset>
          <input
            type="text"
            id="name"
            placeholder="Name"
            className="w-full p-2 border border-gray-300 rounded-md"
            {...register("name", { required: "Name is required" })}
          />
          {errors.name && <AlertLabel>{errors.name.message}</AlertLabel>}
        </fieldset>

        {/* Last Name */}
        <LabelText id="last_name">Last Name</LabelText>
        <fieldset>
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

        {/* Phone Number */}
        <LabelText id="phone_number">Phone Number</LabelText>
        <fieldset>
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

        {/* Email */}
        <LabelText id="email">Email</LabelText>
        <fieldset>
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

      {/* Campos combinados (Address, CP, Country, City) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Address */}
        <fieldset className="flex flex-col gap-2">
          <LabelText id="address">Address</LabelText>
          <input
            type="text"
            id="address"
            placeholder="Address"
            className="p-2 border border-gray-300 rounded-md"
            {...register("address", { required: "Address is required" })}
          />
          {errors.address && <AlertLabel>{errors.address.message}</AlertLabel>}
        </fieldset>

        {/* CP */}
        <fieldset className="flex flex-col gap-2">
          <LabelText id="cp">C.P</LabelText>
          <input
            type="number"
            id="cp"
            placeholder="CP: 00000"
            className="p-2 border border-gray-300 rounded-md"
            {...register("cp", {
              required: "Postal code is required",
              validate: (value) => value! > 0 || "Postal code cannot be 0",
            })}
          />
          {errors.cp && <AlertLabel>{errors.cp.message}</AlertLabel>}
        </fieldset>

        {/* Country */}
        <fieldset className="flex flex-col gap-2">
          <LabelText id="country">Country</LabelText>
          <input
            type="text"
            id="country"
            placeholder="Country"
            className="p-2 border border-gray-300 rounded-md"
            {...register("country", { required: "Country is required" })}
          />
          {errors.country && <AlertLabel>{errors.country.message}</AlertLabel>}
        </fieldset>

        {/* City */}
        <fieldset className="flex flex-col gap-2">
          <LabelText id="city">City</LabelText>
          <input
            type="text"
            id="city"
            placeholder="City"
            className="p-2 border border-gray-300 rounded-md"
            {...register("city", { required: "City is required" })}
          />
          {errors.city && <AlertLabel>{errors.city.message}</AlertLabel>}
        </fieldset>
      </div>
    </div>
  );
}
