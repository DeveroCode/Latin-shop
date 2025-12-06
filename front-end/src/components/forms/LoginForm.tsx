import ErrorAlert from "../ui/ErrorAlert";
import type { userLoginForm } from "@/types/index";
import type { FieldErrors, UseFormRegister } from "react-hook-form";

type LoginFormProps = {
  register: UseFormRegister<userLoginForm>;
  errors: FieldErrors<userLoginForm>;
}
export default function LoginForm({ register, errors }: LoginFormProps) {
  return (
    <>
      <fieldset className="flex flex-col text-left">
        <label className="block text-gray-700 text-sm mb-1">Email</label>
        <input
          type="email"
          className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          placeholder="you@example.com"
          {...register("email", {
            required: "The email field is required",
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: "This is not a valid email address",
            },
          })}
        />

        {errors.email && <ErrorAlert>{errors.email.message}</ErrorAlert>}
      </fieldset>

      <fieldset className="flex flex-col text-left">
        <label className="block text-gray-700 text-sm mb-1">Password</label>
        <input
          type="password"
          className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          placeholder="••••••••"
          {...register("password", {
            required: "The password field is required",
          })}
        />

        {errors.password && <ErrorAlert>{errors.password.message}</ErrorAlert>}
      </fieldset>
    </>
  );
}
