import { addToFavorites } from "@/api/ProductsAPI";
import type { Product } from "@/types/index";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Heart } from "lucide-react";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";

type FavoriteHeartBtnProps = {
  id: Product[number]["_id"];
};
export default function FavoriteHeartBtn({ id }: FavoriteHeartBtnProps) {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: addToFavorites,
    onSuccess: (data) => {
      toast.success(data);
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const { pathname } = useLocation();
  const cart = pathname.includes("/shop/my-cart");
  const handleAddToFavorites = (id: Product[number]["_id"]) =>
    mutate({ productId: id });
  return (
    <button
      className={`${
        cart
          ? "text-gray-600 cursor-pointer hover:text-red-500"
          : "absolute top-2 right-2 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-110 z-30"
      }`}
      aria-label="Add to favorites"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        handleAddToFavorites(id);
      }}
    >
      <Heart className="w-5 h-5" />
    </button>
  );
}
