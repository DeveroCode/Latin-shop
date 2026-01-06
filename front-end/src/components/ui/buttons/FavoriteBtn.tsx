import { addToFavorites } from "@/api/ProductsAPI";
import type { Product } from "@/types/index";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

type FavoriteBtnProps = {
  id: Product[number]["_id"];
};
export default function FavoriteBtn({ id }: FavoriteBtnProps) {
  const { mutate } = useMutation({
    mutationFn: addToFavorites,
    onSuccess: (data) => {
      toast.success(data);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleAddToFavorites = (id: Product[number]["_id"]) =>
    mutate({ productId: id });
  return (
    <button
      className="border border-gray-300 hover:bg-gray-100 transition text-gray-700 py-2 rounded-lg font-medium cursor-pointer"
      onClick={() => handleAddToFavorites(id)}
    >
      Add to favorites
    </button>
  );
}
