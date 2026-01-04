import SaveAddressForm from "../forms/SaveAddressForm";
import { useShoppingStore } from "@/stores/shopping";
import { formatCurrency } from "@/utils/index";
import { Package, BrickWallFire, House, MoveRight, X } from "lucide-react";
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
export default function OrderSummary() {
  const {data: user} = useUser();
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const { cart } = useShoppingStore();
  const total_amount = useShoppingStore((state) => state.totalAmount());
  const totalPieces = useShoppingStore((state) => state.totalPieces());

  const [defaultCard, setDefaultCard] = useState<CardSet["card"][number] | null>(null);
  const handlePaymentMethodChange = async (method: PaymentMethods) => {
    if (method === "credit card" || method === "debit card") {
      const response = await getPaymentDefault(method);
      if (response) {
        setDefaultCard(response.card);
      } else {
        setDefaultCard(null);
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
    }

    else if (data.payment_method !== "cash") {
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
    <div className="w-1/3 bg-white rounde-md shadow-xl p-8 border border-gray-100">
      <h2 className="text-xl font-bold font-montserrat">Order summary</h2>

      <div className="py-5 space-y-2">
        <div className="flex justify-between">
          <p className="text-gray-600">
            <Package className="inline-block mr-2 mb-1 bg-gray-300 p-1 rounded-md text-black" />
            Subtotal
          </p>
          <span className="text-gray-600 font-semibold">
            {formatCurrency(total_amount)}
          </span>
        </div>
        <div className="flex justify-between">
          <p className="text-gray-600">
            <BrickWallFire className="inline-block mr-2 mb-1 bg-gray-300 p-1 rounded-md text-black" />
            Total Pieces
          </p>
          <span className="text-gray-600 font-semibold">{totalPieces}</span>
        </div>
      </div>

      <div className="flex justify-between text-gray-800 font-bold">
        <p className="text-xl font-montserrat">Total</p>
        <span>{formatCurrency(total_amount)}</span>
      </div>

      <div className="py-10">
        <form
          noValidate
          className="space-y-6"
          onSubmit={handleSubmit(handleSendOrder)}
        >
          <SaveAddressForm />

          <Link
            to={"/"}
            className="bg-gray-900 text-white py-2 px-5 rounded-md text-sm flex items-center justify-center gap-2 font-bold uppercase"
          >
            <House className="w-4 h-4" />
            Save Addres
          </Link>

          {/* Render defualt card */}
          {defaultCard ? (
            <div className="mt-4 p-4 border-2 border-blue-900 rounded-lg bg-gray-100">
              <div className="flex justify-between items-center">
                <p className="text-gray-900 capitalize font-bold">
                  {defaultCard.type_target}
                </p>
                <button
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
            <>
              {/* Payment Methods - To be implemented */}
              <DetailsPaymentForm
                register={register}
                errors={errors}
                onPaymentChange={handlePaymentMethodChange}
                setValue={setValue}
              />
            </>
          )}

          <button
            type="submit"
            className="bg-gray-900 text-white px-4 py-2 rounded-md cursor-pointer hover:bg-gray-950 transition duration-300 font-semibold w-full"
          >
            Checkout <MoveRight className="inline-block w-4 h-4 ml-2 mb-1" />
          </button>
        </form>

        <Link
          to={""}
          className="block mt-5 w-full text-gray-600 text-center font-montserrat"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}
