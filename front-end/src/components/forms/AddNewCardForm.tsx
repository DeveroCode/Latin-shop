import AlertLabel from "../ui/Alerts/AlertLabel";
import { selectableMethods, type AddCard } from "@/types/index";
import type { FieldErrors, UseFormRegister } from "react-hook-form";
import { CardElement } from "@stripe/react-stripe-js";

type AddNewCardFormProps = {
  errors: FieldErrors<AddCard>;
  register: UseFormRegister<AddCard>;
};

export default function AddNewCardForm({
  register,
  errors,
}: AddNewCardFormProps) {
  return (
    <div className="space-y-5">
      {/* Stripe Card Element */}
      <fieldset>
        <label className="block text-gray-700 text-sm mb-1">
          Card Information
        </label>

        <div className="border rounded-md p-3 focus-within:ring-2 focus-within:ring-blue-900">
          <CardElement
            options={{
              hidePostalCode: true,
            }}
          />
        </div>
      </fieldset>

      {/* Name */}
      <fieldset>
        <label className="block text-gray-700 text-sm mb-1">
          Name on Card
        </label>
        <input
          className="w-full border rounded-md p-2"
          {...register("user", {
            required: "Name is required",
          })}
        />
        {errors.user && <AlertLabel>{errors.user.message}</AlertLabel>}
      </fieldset>

      {/* Card Type */}
      <fieldset>
        <label className="block text-gray-700 text-sm mb-1">
          Type Target
        </label>
        <select
          className="w-full border rounded-md p-2"
          {...register("type_target", {
            required: "Type is required",
          })}
        >
          {selectableMethods.map((method) => (
            <option key={method} value={method}>
              {method}
            </option>
          ))}
        </select>

        {errors.type_target && (
          <AlertLabel>{errors.type_target.message}</AlertLabel>
        )}
      </fieldset>
    </div>
  );
}
