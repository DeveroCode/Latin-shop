import { Minus, Plus, Trash2, Bookmark } from "lucide-react";
import type { ProductCartItem } from "@/types/index";
import { useShoppingStore } from "@/stores/shopping";
import { formatCurrency } from "@/utils/index";
import { Link } from "react-router-dom";

type Card_item_detailsProps = {
  item: ProductCartItem;
};

export default function Card_item_details({ item }: Card_item_detailsProps) {
  const MAX_QUANTITY = item.countInStock;
  const MIN_QUANTITY = 1;
  const { decreasePiece, increasePiece, removeItem } = useShoppingStore();

  return (
    <div className="grid grid-cols-12 gap-4 py-5 border-b border-gray-200 items-center">
      {/* PRODUCT */}
      <div className="col-span-6 flex items-center gap-4">
        <div className="w-20 h-20 rounde-md border border-gray-200">
          <img
            src={item.images[1]}
            alt={item.name}
            className="w-full h-full object-contain rounded-md"
          />
        </div>

        <div>
          <Link to={`/shop/product/${item._id}`} target="_blank" rel="noreferrer" className="font-semibold text-gray-800 line-clamp-2 hover:underline hover:text-blue-900 capitalize">
            {item.name}
          </Link>

          <div className="flex items-center gap-3 mt-2 text-gray-500">
            <button
              onClick={() => removeItem(item._id)}
              className="flex items-center gap-1 hover:text-red-500 transition"
            >
              <Trash2 className="w-4 h-4" />
              Remove
            </button>

            <button className="hover:text-gray-700 transition cursor-pointer">
              <Bookmark className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* UNIT PRICE */}
      <div className="col-span-2 text-center text-gray-700">
        {formatCurrency(item.price)}
      </div>

      {/* QUANTITY */}
      <div className="col-span-2 flex justify-center items-center gap-2">
        <button
          className={`w-8 h-8 ${
            item.quantity === MIN_QUANTITY && "opacity-50"
          }`}
          disabled={item.quantity === MIN_QUANTITY}
          onClick={() => decreasePiece(item._id)}
        >
          <Minus className="w-4 h-4 mx-auto" />
        </button>

        <span className="font-semibold text-gray-700">
          {item.quantity}
        </span>

        <button
          className={`w-8 h-8 ${
            item.quantity === MAX_QUANTITY && "opacity-50"
          }`}
          disabled={item.quantity === MAX_QUANTITY}
          onClick={() => increasePiece(item._id)}
        >
          <Plus className="w-4 h-4 mx-auto" />
        </button>
      </div>

      {/* SUBTOTAL */}
      <div className="col-span-2 text-right font-semibold text-gray-800">
        {formatCurrency(item.price * item.quantity)}
      </div>
    </div>
  );
}
