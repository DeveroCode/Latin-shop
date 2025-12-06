import { motion, AnimatePresence } from "framer-motion";
import { useUser } from "@/hooks/user";
import { detectedTarget } from "@/utils/Targets";
import { targets } from "../../../data/targets";
import { X, Plus } from "lucide-react";
import { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import AddNewCardForm from "@/components/forms/AddNewCardForm";
import type { AddCard } from "@/types/index";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addNewCard } from "@/api/AuthAPI";
import { toast } from "react-toastify";
import { getFourthDigit } from "@/utils/index";

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

  const initialValues: AddCard = {
    lastNumbers: "",
    cvv: "",
    expirationDate: "",
    user: "",
    type_target: "latin card",
  };
  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
    setValue,
  } = useForm({
    defaultValues: initialValues,
  });

  useEffect(() => {
    if (user?.name) {
      setValue("user", user.name + " " + user.last_name);
    }
  });

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

  const handleSubmitData = (data: AddCard) => {
    const formData = {
      ...data,
      lastNumbers: getFourthDigit(data.lastNumbers),
      user: user!._id,
    };
    mutate(formData);
  };

  const creditAccount = useWatch({ control, name: "lastNumbers" });
  const cardType = detectedTarget(creditAccount || "");
  const cardInfo = targets.find((t) => t.value === cardType);
  const cardImage = cardInfo?.image ?? "/logo_blue.png";
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
          <div className="flex flex-col justify-between gap-6 items-start mt-6 bg-white p-8 rounded-lg shadow-lg max-w-4xl w-full">
            <div className="w-full border-b border-gray-200 pb-4 flex justify-between items-center">
              <h2 className="font-montserrat text-xl text-gray-800">
                Add New Card
              </h2>

              <button
                className="p-1 rounded-full border cursor-pointer"
                onClick={() => setIsEnable(false)}
              >
                <X size={10} />
              </button>
            </div>

            <motion.form
              noValidate
              onClick={(e) => e.stopPropagation()}
              className="w-full"
              onSubmit={handleSubmit(handleSubmitData)}
            >
              <AddNewCardForm
                register={register}
                errors={errors}
                cardImage={cardImage}
              />

              <button
                type="submit"
                className="bg-blue-900 text-white px-4 my-5 py-2 rounded-md flex items-center gap-2 cursor-pointer"
              >
                <Plus className="w-4 h-4 font-bold text-white" />
                Create
              </button>
            </motion.form>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
