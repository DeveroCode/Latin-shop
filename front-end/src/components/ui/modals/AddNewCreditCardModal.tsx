import { motion, AnimatePresence } from "framer-motion";
import { useUser } from "@/hooks/user";
import { X, Plus } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import AddNewCardForm from "@/components/forms/AddNewCardForm";
import type { AddCard } from "@/types/index";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addNewCard } from "@/api/AuthAPI";
import { toast } from "react-toastify";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";

type AddNewCreditCardModalProps = {
  isEnable: boolean;
  setIsEnable: (isEnable: boolean) => void;
};

export default function AddNewCreditCardModal({
  isEnable,
  setIsEnable,
}: AddNewCreditCardModalProps) {
  const queryClient = useQueryClient();
  const { data: user } = useUser();
  const stripe = useStripe();
  const elements = useElements();

  const initialValues: AddCard = {
    user: "",
    payment_method_id: "",
    type_target: "latin card",
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm<AddCard>({
    defaultValues: initialValues,
  });

  useEffect(() => {
    if (user?.name) {
      setValue("user", `${user.name} ${user.last_name}`);
    }
  }, [user, setValue]);

  const { mutate } = useMutation({
    mutationFn: addNewCard,
    onSuccess: (data) => {
      toast.success(data);
      setIsEnable(false);
      queryClient.invalidateQueries({ queryKey: ["cards"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleSubmitData = async (data: AddCard) => {
    if (!stripe || !elements) {
      toast.error("Stripe not loaded");
      return;
    }

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      toast.error("Card element not found");
      return;
    }

    const { paymentMethod, error } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
      billing_details: {
        name: data.user,
      },
    });

    if (error || !paymentMethod) {
      toast.error(error?.message || "Error creating payment method");
      return;
    }

    const formData = {
      user: user!._id,
      payment_method_id: paymentMethod.id,
      lastNumbers: paymentMethod.card?.last4,
      expirationDate: `${paymentMethod.card?.exp_month}/${paymentMethod.card?.exp_year}`,
      type_target: data.type_target,
    };

    mutate(formData);
  };

  return (
    <AnimatePresence>
      {isEnable && (
        <motion.div
          className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsEnable(false)}
        >
          <div
            className="flex flex-col gap-6 bg-white p-8 rounded-lg shadow-lg max-w-2xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-full border-b pb-4 flex justify-between items-center">
              <h2 className="font-montserrat text-xl text-gray-800">
                Add New Card
              </h2>

              <button
                className="p-1 rounded-full border cursor-pointer"
                onClick={() => setIsEnable(false)}
              >
                <X size={12} />
              </button>
            </div>

            <form
              noValidate
              className="w-full"
              onSubmit={handleSubmit(handleSubmitData)}
            >
              <AddNewCardForm register={register} errors={errors} />

              <button
                type="submit"
                className="bg-blue-900 text-white px-4 py-2 mt-6 rounded-md flex items-center gap-2 disabled:opacity-50"
              >
                <Plus className="w-4 h-4" />
                <span>Add Card</span>
              </button>
            </form>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
