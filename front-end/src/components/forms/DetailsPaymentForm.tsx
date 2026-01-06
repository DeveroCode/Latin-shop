import { payments } from "@/utils/payments";
import type { PaymentMethods, ShoppingCart } from "@/types/index";
import { useState } from "react";
import type {
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";

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
  const [selectedPayment, setSelectedPayment] =
    useState<PaymentMethods>("cash");

  const handleChange = (value: PaymentMethods) => {
    setSelectedPayment(value);
    setValue("payment_method", value, { shouldValidate: true });
    onPaymentChange(value);
  };

  return (
    <div className="space-y-2">
      <section className="flex items-center gap-3 flex-wrap">
        {payments.map((payment) => {
          const isActive = selectedPayment === payment.method;

          return (
            <label
              key={payment.method}
              htmlFor={payment.method}
              className={`
                border px-6 py-3 flex items-center gap-3 cursor-pointer rounded-xs border-gray-300
                transition shadow-md
                ${
                  isActive
                    ? "text-gray-900"
                    : "text-gray-600"
                }
              `}
            >
              <input
                type="radio"
                id={payment.method}
                value={payment.method}
                {...register("payment_method", {
                  required: "Please select a payment method",
                })}
                checked={isActive}
                onChange={() => handleChange(payment.method)}
                className="accent-gray-900"
              />

              <img
                src={payment.image}
                alt={payment.name}
                className="w-7 h-7 object-contain"
              />

              <span className="font-medium">{payment.name}</span>
            </label>
          );
        })}
      </section>

      {errors.payment_method && (
        <p className="text-red-500 text-xs">
          {errors.payment_method.message}
        </p>
      )}
    </div>
  );
}
