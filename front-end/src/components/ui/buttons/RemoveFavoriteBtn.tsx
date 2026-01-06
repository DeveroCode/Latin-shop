import { removeFromFavorites } from "@/api/ProductsAPI";
import type { Product } from "@/types/index";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Trash2 } from "lucide-react";
import { toast } from "react-toastify";

type RemoveFavoriteBtnProps = {
  id: Product[number]["_id"];
};
export default function RemoveFavoriteBtn({ id }: RemoveFavoriteBtnProps) {
    const queryClient = useQueryClient();
    const {mutate} = useMutation({
        mutationFn: removeFromFavorites,
        onSuccess: (data) => {
            toast.success(data);
            queryClient.invalidateQueries({ queryKey: ["favorites"] });
        },
        onError: (error) => {
            toast.error(error.message);
        }
    })

    const removeItem = (id: Product[number]["_id"]) => mutate({ productId: id });
  return (
    <div className="flex items-center gap-3 mt-2 text-gray-500">
      <button
        onClick={() => removeItem(id)}
        className="flex items-center gap-1 hover:text-red-500 transition"
      >
        <Trash2 className="w-4 h-4" />
        Remove
      </button>
    </div>
  );
}
