import SaveAddressForm from "../forms/SaveAddressForm";
import { useShoppingStore } from "@/stores/shopping";
import {
  MoveRight,
  X,
  ChevronRight
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import DetailsPaymentForm from "../forms/DetailsPaymentForm";
import { useForm } from "react-hook-form";
import type { CardSet, PaymentMethods, ShoppingCart } from "@/types/index";
import { useMutation } from "@tanstack/react-query";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { shopCart } from "@/api/ShopAPI";
import { toast } from "react-toastify";
import { useState } from "react";
import { getPaymentDefault } from "@/api/AuthAPI";
import { useUser } from "@/hooks/user";
import SecondLegend from "../ui/text/SecondLegend";
import SecondSpan from "../ui/text/SecondSpan";

export default function Checkout() {
  const { data: user } = useUser();
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const { cart } = useShoppingStore();
  const total_amount = useShoppingStore((state) => state.totalAmount());

  const [defaultCard, setDefaultCard] = useState<
    CardSet["card"][number] | null
  >(null);
  const handlePaymentMethodChange = async (method: PaymentMethods) => {
  if (method === "credit card" || method === "debit card") {
    const response = await getPaymentDefault(method);
    if (response) {
      setDefaultCard(response.card as CardSet["card"][number]);
    } else {
      setDefaultCard(null);
    }
    if (!response) {
      toast.error("Error al obtener la tarjeta por defecto");
    }
  } else {
    setDefaultCard(null);
  }
};

  const { mutate } = useMutation({
    mutationFn: shopCart,
    onSuccess: (data) => {
      toast.success(data);
      navigate("/dashboard/settings");
      reset();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const initialValues: ShoppingCart = {
    products: [],
    total_amount: 0,
    is_payment: false,
    payment_method: "cash",
    cardInfo: {
      payment_method_id: "",
      customer_id: "",
    },
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<ShoppingCart>({
    defaultValues: initialValues,
  });

  const handleSendOrder = async (data: ShoppingCart) => {
    let paymentMethodId = "";

    if (defaultCard) {
      paymentMethodId = defaultCard.payment_method_id!;
    } else if (data.payment_method !== "cash") {
      if (!stripe || !elements) {
        toast.error("Stripe no está listo");
        return;
      }

      const cardElement = elements.getElement(CardElement);

      if (!cardElement) {
        toast.error("No card element");
        return;
      }

      const { paymentMethod, error } = await stripe.createPaymentMethod({
        type: "card",
        card: cardElement,
      });

      if (error) {
        toast.error(error.message);
        return;
      }

      paymentMethodId = paymentMethod.id;
    }

    const formData: ShoppingCart = {
      products: cart.map((item) => ({
        product: item._id,
        quantity: item.quantity,
        price: item.price,
      })),
      total_amount,
      is_payment: !!paymentMethodId,
      payment_method: data.payment_method,
      cardInfo: {
        payment_method_id: paymentMethodId,
        customer_id: user!.stripeCustomerId || "",
      },
    };

    mutate(formData);
  };

  return (
    <div className="px-36">
      <section className="flex text-blue-900 font-bold capitaLize items-center pt-7">
        <Link to="/" className="">
          Home
        </Link>
        <ChevronRight className="w-5 h-5" />
        Shopping Cart
        <ChevronRight className="w-5 h-5" />
        Checkout
      </section>

      {/* Address information */}
      <section className="pb-5 pt-10">
        <SecondLegend>shipping address</SecondLegend>

        <SaveAddressForm />
      </section>

      {/* Delivery Options */}
      <section className="py-5">
        <SecondLegend>delivery option</SecondLegend>

        <div className="border border-gray-300 shadow-xs rounded-xs mt-4 p-10 space-y-3">
          <p className="text-xl text-gray-900 font-bold">Free delivery</p>
          <SecondSpan>Delivery time: 2-3 days</SecondSpan>
        </div>
      </section>

      {/* Payment Options */}
      <section className="py-5">
        <SecondLegend>payment method</SecondLegend>

        <div className="mt-4 space-y-3">
          <div className="py-10">
            <form
              noValidate
              className="space-y-6"
              onSubmit={handleSubmit(handleSendOrder)}
            >
              {/* Render default card */}
              {defaultCard ? (
                <div className="mt-4 p-4 border-2 border-blue-900 rounded-lg bg-gray-100">
                  <div className="flex justify-between items-center">
                    <p className="text-gray-900 capitalize font-bold">
                      {defaultCard.type_target}
                    </p>
                    <button
                      type="button"
                      onClick={() => setDefaultCard(null)}
                      className="cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div>
                    <p>**** **** **** {defaultCard.lastNumbers}</p>
                    <div className="w-2 h-2 rounded-full bg-blue-900"></div>
                  </div>
                </div>
              ) : (
                <DetailsPaymentForm
                  register={register}
                  errors={errors}
                  onPaymentChange={handlePaymentMethodChange}
                  setValue={setValue}
                />
              )}

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-gray-900 text-white px-4 py-2 rounded-md cursor-pointer hover:bg-gray-950 transition duration-300 font-semibold"
                >
                  Checkout{" "}
                  <MoveRight className="inline-block w-4 h-4 ml-2 mb-1" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
