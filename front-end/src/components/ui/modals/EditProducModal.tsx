import { motion, AnimatePresence } from "framer-motion";
import CreateProductForm from "../../forms/CreateProductForm";
import { useForm } from "react-hook-form";
import type { Product, ProductFormData } from "@/types/index";
import {
  getCategories,
  getProductById,
  updateProduct,
} from "@/api/ProductsAPI";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { CloudCheck } from "lucide-react";
import { toast } from "react-toastify";
type EditProducModalProps = {
  id: Product[number]["_id"];
  isModalOpen: boolean;
  setIsModalOpen: (value: null | "delete" | "edit" | "view") => void;
};
export default function EditProducModal({
  id,
  isModalOpen,
  setIsModalOpen,
}: EditProducModalProps) {
  const queryClient = useQueryClient();
  const {
    data: product,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["product"],
    queryFn: () => getProductById(id),
    enabled: !!isModalOpen && !!id,
    refetchOnWindowFocus: false,
    retry: false,
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProductFormData>();

  const { mutate } = useMutation({
    mutationFn: updateProduct,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success(data);
      setIsModalOpen(null);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  useEffect(() => {
    if (product) {
      reset({
        name: product.name,
        description: product.description,
        price: product.price,
        brand: product.brand,
        category: product.category._id,
        countInStock: product.countInStock,
      });
    }
  }, [product, reset]);

  //** Get Categories */
  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
    refetchOnWindowFocus: false,
    retry: false,
  });

  const handleUpdateProduct = async (formData: ProductFormData) => {
    const data = {
      id,
      formData,
    };
    mutate(data);
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;

  if (categories && product)
    return (
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsModalOpen(null)}
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              initial={{ y: 50, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 50, opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="bg-white shadow-lg rounded-xl p-5 w-[90%] max-w-xl border border-gray-200"
            >
              <form noValidate onSubmit={handleSubmit(handleUpdateProduct)}>
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                  Edit Product
                </h2>
                <p className="text-gray-500 text-sm mb-4">
                  Update or correct any incorrect information about your product
                  without losing existing information.
                </p>

                <CreateProductForm
                  register={register}
                  errors={errors}
                  categories={categories}
                />

                <button
                  type="submit"
                  className="bg-blue-900 text-white px-4 py-2 rounded-md flex items-center gap-2 cursor-pointer"
                >
                  <CloudCheck className="w-4 h-4 font-bold text-white" />
                  Update Product
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    );
}
