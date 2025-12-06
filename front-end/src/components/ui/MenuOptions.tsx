import { useState } from "react";
import { Trash, Pencil, Eye, Image } from "lucide-react";
import type { Product } from "@/types/index";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProduct } from "@/api/ProductsAPI";
import { toast } from "react-toastify";
import DeleteProductModal from "./modals/DeleteProductModal";
import EditProducModal from "./modals/EditProducModal";
import UploadImageProductModal from "./modals/UploadImageProductModal";

type MenuOptionsProps = {
  id: Product[number]["_id"];
};

export default function MenuOptions({ id }: MenuOptionsProps) {
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState<
    null | "delete" | "edit" | "view" | "image"
  >(null);

  /** Actions */
  const { mutate } = useMutation({
    mutationFn: deleteProduct,
    onSuccess: (data) => {
      toast.success(data);
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  /** Handlers */
  const handleDeleteProduct = () => mutate(id);

  return (
    <>
      <div className="flex items-center justify-end gap-5">
        <button className="text-orange-600 hover:text-orange-800 cursor-pointer" onClick={() => setIsModalOpen("image")}>
          <Image className="w-4 h-4" />
        </button>
        <button className="text-green-600 hover:text-green-800 cursor-pointer">
          <Eye className="w-4 h-4" />
        </button>
        <button
          className="text-blue-600 hover:text-blue-800 cursor-pointer"
          onClick={() => setIsModalOpen("edit")}
        >
          <Pencil className="w-4 h-4" />
        </button>
        <button
          className="text-red-600 hover:text-red-800 cursor-pointer"
          onClick={() => {
            setIsModalOpen("delete");
          }}
        >
          <Trash className="w-4 h-4" />
        </button>
      </div>

      <DeleteProductModal
        isModalOpen={isModalOpen === "delete"}
        setIsModalOpen={setIsModalOpen}
        handleDeleteProduct={handleDeleteProduct}
      />

      <EditProducModal
        id={id}
        isModalOpen={isModalOpen === "edit"}
        setIsModalOpen={setIsModalOpen}
      />

      <UploadImageProductModal
        setImageEnable={setIsModalOpen}
        id={id}
        isModalOpen={isModalOpen === "image"}
      />
    </>
  );
}
