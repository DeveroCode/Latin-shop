import type { userRegisterForm } from "@/types/index";
import type { FieldErrors, UseFormRegister } from "react-hook-form";
import ErrorAlert from "../ui/ErrorAlert";

type RegisterFormProps = {
  errors: FieldErrors<userRegisterForm>;
  register: UseFormRegister<userRegisterForm>;
};

export default function RegisterForm({ register, errors }: RegisterFormProps) {
  return (
    <>
      <fieldset>
        <label
          className="block text-gray-700 text-sm mb-1 text-start"
          htmlFor="email"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-900 focus:outline-none"
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
      <fieldset>
        <label
          className="block text-gray-700 text-sm mb-1 text-start"
          htmlFor="name"
        >
          Name
        </label>
        <input
          type="text"
          id="name"
          className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-900 focus:outline-none"
          placeholder="John Doe"
          {...register("name", { required: "The name field is required" })}
        />

        {errors.name && <ErrorAlert>{errors.name.message}</ErrorAlert>}
      </fieldset>
      <fieldset>
        <label
          className="block text-gray-700 text-sm mb-1 text-start"
          htmlFor="password"
        >
          Password
        </label>
        <input
          type="password"
          id="password"
          className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-900 focus:outline-none"
          placeholder="********"
          {...register("password", {
            required: "The password field is required",
            minLength: {
              value: 6,
              message: "The password must be at least 6 characters long",
            },
          })}
        />

        {errors.password && <ErrorAlert>{errors.password.message}</ErrorAlert>}
      </fieldset>
      <fieldset>
        <label
          className="block text-gray-700 text-sm mb-1 text-start"
          htmlFor="password_confirm"
        >
          Confirm Password
        </label>
        <input
          type="password"
          id="password_confirm"
          className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-900 focus:outline-none"
          placeholder="********"
          {...register("password_confirm", {
            required: "The confirm password field is required",
            validate: (value, formValues) =>
              value === formValues.password || "The passwords do not match",
          })}
        />

        {errors.password_confirm && (
          <ErrorAlert>{errors.password_confirm.message}</ErrorAlert>
        )}
      </fieldset>
    </>
  );
}
