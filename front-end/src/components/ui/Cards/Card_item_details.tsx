import { Minus, Plus, Trash2, Bookmark } from "lucide-react";
import type { ProductCartItem } from "@/types/index";
import { useShoppingStore } from "@/stores/shopping";
import { formatCurrency } from "@/utils/index";

type Card_item_detailsProps = {
  item: ProductCartItem;
};

export default function Card_item_details({ item }: Card_item_detailsProps) {
  const MAX_QUANTITY = item.countInStock;
  const MIN_QUANTITY = 1;
  const { decreasePiece, increasePiece, removeItem } = useShoppingStore();
  return (
    <div className="bg-white shadow-md rounded-md border border-gray-100 py-5 px-10 flex gap-5 mb-4 w-full">
      <div className="w-28 h-28 p-3 border border-gray-200 shadow-md rounded-md">
        <img src={item.images[0]} alt={item.name} className="object-contain" />
      </div>

      <div className="w-full">
        <div className="flex justify-between">
          <p className="font-bold font-montserrat text-lg capitalize text-gray-700">
            {item.name}
          </p>
          <span>{formatCurrency(item.price)}</span>
        </div>

        <div className="flex gap-3 items-center">
          <div className="flex gap-5 items-center mt-3">
            <button
              className={`${
                MIN_QUANTITY === item.quantity && "opacity-50"
              } bg-gray-300 p-2 rounded-md text-gray-900 cursor-pointer`}
              disabled={item.quantity === MIN_QUANTITY}
              onClick={() => decreasePiece(item._id)}
            >
              <Minus className="w-4 h-4" />
            </button>
            <p className="text-gray-500">{item.quantity}</p>
            <button
              className={`${
                MAX_QUANTITY === item.quantity && "opacity-50"
              } bg-gray-300 p-2 rounded-md text-gray-900 cursor-pointer`}
              disabled={item.quantity === MAX_QUANTITY}
              onClick={() => increasePiece(item._id)}
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          <button className="flex items-center text-gray-500 font-bold gap-1 mt-2 cursor-pointer" onClick={() => removeItem(item._id)}>
            <Trash2 className="w-4 h-4" />
            Delete
          </button>
          <button className="flex items-center text-gray-600 font-bold gap-1 mt-2 cursor-pointer">
            <Bookmark className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
}
