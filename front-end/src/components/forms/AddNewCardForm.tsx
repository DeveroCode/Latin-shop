import AlertLabel from "../ui/AlertLabel";
import { selectableMethods, type AddCard } from "@/types/index";
import type { FieldErrors, UseFormRegister } from "react-hook-form";

type AddNewCardFormProps = {
  errors: FieldErrors<AddCard>;
  register: UseFormRegister<AddCard>;
  cardImage: string;
};

export default function AddNewCardForm({
  register,
  errors,
  cardImage,
}: AddNewCardFormProps) {
  return (
    <div className="space-y-5">
      <div className="flex justify-between gap-5 items-center">
        <fieldset className="w-1/2">
          <label
            className="block text-gray-700 text-sm mb-1 text-start"
            htmlFor="lastNumbers"
          >
            Card Number
          </label>

          <div className="relative w-full">
            <input
              type="text"
              id="lastNumbers"
              className="w-full border border-gray-300 rounded-md p-2 pr-12 focus:ring-2 focus:ring-blue-900 focus:outline-none"
              placeholder="1234 5678 9012 3456"
              {...register("lastNumbers", {
                required: "The card number field is required",
              })}
            />
            {cardImage && (
              <img
                src={cardImage}
                alt="card type"
                className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-auto opacity-80"
              />
            )}
          </div>

          {errors.lastNumbers && (
            <AlertLabel>{errors.lastNumbers.message}</AlertLabel>
          )}
        </fieldset>

        <fieldset className="w-1/2">
          <label
            className="block text-gray-700 text-sm mb-1 text-start"
            htmlFor="cvv"
          >
            CVV
          </label>
          <input
            type="text"
            id="cvv"
            className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-900 focus:outline-none"
            placeholder="***"
            {...register("cvv", {
              required: "The card number field is required",
            })}
          />

          {errors.cvv && <AlertLabel>{errors.cvv.message}</AlertLabel>}
        </fieldset>
      </div>

      <div className="flex justify-between gap-5 items-center">
        <fieldset className="w-1/2">
          <label
            className="block text-gray-700 text-sm mb-1 text-start"
            htmlFor="user"
          >
            Name on Card
          </label>
          <input
            type="text"
            id="user"
            className="border w-full border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-900 focus:outline-none"
            placeholder="John Doe"
            {...register("user", {
              required: "The name on card field is required",
            })}
          />

          {errors.user && <AlertLabel>{errors.user.message}</AlertLabel>}
        </fieldset>

        <fieldset className="w-1/2">
          <label
            className="block text-gray-700 text-sm mb-1 text-start"
            htmlFor="expirationDate"
          >
            Expiration Date
          </label>
          <input
            type="text"
            id="expirationDate"
            className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-900 focus:outline-none"
            placeholder="06/24"
            {...register("expirationDate", {
              required: "The expiration date field is required",
            })}
          />

          {errors.expirationDate && (
            <AlertLabel>{errors.expirationDate.message}</AlertLabel>
          )}
        </fieldset>
        <fieldset className="w-1/2">
          <label
            className="block text-gray-700 text-sm mb-1 text-start"
            htmlFor="type_target"
          >
            Type Target
          </label>
          <select
            className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-900 focus:outline-none"
            {...register("type_target", {
              required: "The type target field is required",
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
    </div>
  );
}
