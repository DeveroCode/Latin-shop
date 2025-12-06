import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { Plus } from "lucide-react";
import CreateProductForm from "../../forms/CreateProductForm";
import type { ProductFormData } from "@/types/index";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createProduct, getCategories } from "@/api/ProductsAPI";
import { toast } from "react-toastify";
import { useUser } from "@/hooks/user";

type CreateProductModalProps = {
  isEnable: boolean;
  setIsEnable: (isEnable: boolean) => void;
};
export default function CreateProductModal({
  isEnable,
  setIsEnable,
}: CreateProductModalProps) {
  const { data: user } = useUser();
  const queryClient = useQueryClient();
  const initialValue: ProductFormData = {
    name: "",
    description: "",
    price: 0,
    brand: "",
    category: "",
    countInStock: 0,
    user: "",
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProductFormData>({
    defaultValues: initialValue,
  });

  const { mutate } = useMutation({
    mutationFn: createProduct,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(data);
      queryClient.invalidateQueries({ queryKey: ["products"] });
      setIsEnable(false);
      reset();
    },
  });

  //** Get Categories */
  const {
    data: categories,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
    refetchOnWindowFocus: false,
    retry: false,
  });

  const handleSubmitForm = async (data: ProductFormData) => {
    const formData = {
      ...data,
      user: user!._id,
    };
    mutate(formData);
  };

  if (isError) return <p>Error loading categories.</p>;
  if (isLoading) return <p>Loading categories...</p>;

  if (categories)
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
            <motion.form
              noValidate
              onSubmit={handleSubmit(handleSubmitForm)}
              onClick={(e) => e.stopPropagation()}
              className="bg-white p-10 w-[90%] max-w-xl rounded-md shadow-md py-5"
              initial={{ y: 50, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 50, opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              <legend className="text-2xl font-bold mb-2">
                Register Your Product
              </legend>
              <span className="text-gray-600 mb-6 block">
                Please complete the form below to register your new product and
                start selling.
              </span>

              <CreateProductForm
                register={register}
                errors={errors}
                categories={categories}
              />

              <button
                type="submit"
                className="bg-blue-900 text-white px-4 py-2 rounded-md flex items-center gap-2 cursor-pointer"
              >
                <Plus className="w-4 h-4 font-bold text-white" />
                Create
              </button>
            </motion.form>
          </motion.div>
        )}
      </AnimatePresence>
    );
}
