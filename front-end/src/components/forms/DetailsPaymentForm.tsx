import { payments } from "@/utils/payments";
import type { PaymentMethods, ShoppingCart } from "@/types/index";
import { useState } from "react";
import type { FieldErrors, UseFormRegister, UseFormSetValue } from "react-hook-form";

type DetailsPaymentFormProps = {
  register: UseFormRegister<ShoppingCart>;
  errors: FieldErrors<ShoppingCart>;
  onPaymentChange: (method: PaymentMethods) => void;
  setValue: UseFormSetValue<ShoppingCart>;
};

export default function DetailsPaymentForm({
  register,
  errors,
  onPaymentChange,
  setValue,
}: DetailsPaymentFormProps) {
  const [selectedPayment, isSelectedPayment] = useState<PaymentMethods>("cash");

  const handleChange = (value: PaymentMethods) => {
    isSelectedPayment(value);
    setValue("payment_method", value, { shouldValidate: true });
    onPaymentChange(value);
  };
  return (
    <div className="space-y-2">
      <section className="flex items-center gap-3 flex-wrap">
        {payments.map((payment) => (
          <label
            key={payment.method}
            htmlFor={payment.method}
            className={`
              flex items-center gap-2 cursor-pointer border px-4 py-2 rounded-lg text-xs
              transition-all duration-200 font-medium w-24
              ${
                selectedPayment === payment.method
                  ? "bg-gray-900 text-white"
                  : "text-gray-600"
              }
            `}
          >
            <input
              type="radio"
              id={payment.method}
              value={payment.method}
              className="hidden"
              {...register("payment_method", {
                required: "Please select a payment method",
              })}
              checked={payment.method === selectedPayment}
              onChange={() => handleChange(payment.method)}
            />

            <img
              src={payment.image}
              alt={payment.name}
              className={`w-7 h-7 object-contain ${
                selectedPayment === payment.method ? "invert" : "grayscale"
              }`}
            />

            {payment.name}
          </label>
        ))}
      </section>

      {errors.payment_method && (
        <p className="text-red-500 text-xs">{errors.payment_method.message}</p>
      )}
    </div>
  );
}
