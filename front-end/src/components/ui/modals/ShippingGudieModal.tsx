import { generateShippingGuide } from "@/api/OrderAPI";
import ShippingGuideForm from "@/components/forms/ShippingGuideForm";
import type {
  OrdersPFD,
  ShippingGuideFormData,
  ShippingGuidePDFData,
} from "@/types/index";
import { downloadShippingGuidePDF } from "@/utils/donwloadGuidePDF";
import { formatCurrency } from "@/utils/index";
import { useMutation } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

type ShippingGuideFormFields = {
  comments: string;
  references: string;
};

type ShippingGudieModalProps = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  order: OrdersPFD[];
};

export default function ShippingGudieModal({
  isOpen,
  setIsOpen,
  order,
}: ShippingGudieModalProps) {
  const { mutate } = useMutation({
    mutationFn: generateShippingGuide,
    onSuccess: (data) => {
      toast.success(data);
      reset();
      handleDownloadPDF();
      setIsOpen(false);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const initialValues: ShippingGuideFormFields = {
    comments: "",
    references: "",
  };

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm<ShippingGuideFormFields>({
    defaultValues: initialValues,
  });

  const handleSubmitForm = async (data: ShippingGuideFormFields) => {
    const formData: ShippingGuideFormData = {
      ...data,
      buyer: order[0].user.phone_number,
      guideNumber: order[0]._id,
      totalAmount: order[0].total_amount,
    };

    mutate(formData);
  };

  const handleDownloadPDF = async () => {
    const { comments, references } = getValues();

    if (!comments || !references) {
      toast.error("Please fill all the fields");
      return;
    }

    const pdfData: ShippingGuidePDFData = {
      order: order[0],
      shippingDate: new Date().toDateString(),
      comments,
      references,
      totalAmount: order[0].total_amount,
    };

    await downloadShippingGuidePDF(pdfData);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
        >
          <motion.form
            noValidate
            onSubmit={handleSubmit(handleSubmitForm)}
            onClick={(e) => e.stopPropagation()}
            className="bg-white p-10 w-[90%] max-w-xl rounded-md shadow-md py-5 gap-2"
            initial={{ y: 50, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 50, opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            <div className="flex justify-end py-1">
              <button className="p-1 rounded-full bg-blue-900 text-white cursor-pointer">
                <Check className="w-6 h-6" />
              </button>
            </div>
            <motion.div className="border">
              <header className="flex justify-between">
                <div className="flex-1 flex border-r p-2">
                  <img
                    src="/logo_blue.png"
                    alt="logo company"
                    className="w-16"
                  />
                  <div>
                    <h1 className="text-lg uppercase font-bold">
                      Shipping Guide
                    </h1>
                    <p className="text-gray-500">latin express</p>
                  </div>
                </div>
                <div className="p-2">
                  <h2>Shipping date:</h2>
                  <p className="text-gray-500 text-xs">
                    {new Date().toDateString()}
                  </p>
                </div>
              </header>

              <ShippingGuideForm
                order={order}
                errors={errors}
                register={register}
              />

              <section className="border-t px-1 w-full">
                <legend className="font-semibold capitalize">
                  package details
                </legend>

                <div className="flex items-center justify-between gap-4 py-2">
                  <div className="w-[25%] border-r block">
                    <label htmlFor="" className="text-xs text-wrap">
                      Type package
                    </label>
                    <input type="text" value={""} className="text-xs" />
                  </div>
                  <div className="space-x-1  border-r w-[20%]">
                    <label htmlFor="" className="text-xs">
                      Size:
                    </label>
                    <input type="text" value={""} className="text-xs w-40" />
                  </div>
                  <div className="space-x-1  border-r w-[20%]">
                    <label htmlFor="" className="text-xs">
                      Count package:
                    </label>
                    <input type="text" value={""} className="text-xs" />
                  </div>
                  <div className="space-x-1 w-[30%]">
                    <label htmlFor="" className="text-xs">
                      Total amount:
                    </label>
                    <input
                      type="text"
                      value={formatCurrency(order[0].total_amount)}
                      className="text-xs w-20"
                    />
                  </div>
                </div>
              </section>
            </motion.div>

            <button className="cursor-pointer underline" onClick={handleDownloadPDF}>Download PDF</button>
          </motion.form>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
