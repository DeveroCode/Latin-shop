import type { Product } from "@/types/index";
import { formatCurrency } from "@/utils/index";
import { Link } from "react-router-dom";
import RemoveFavoriteBtn from "../buttons/RemoveFavoriteBtn";

type CardFavoriteProps = {
  item: Product[number];
};

export default function CardFavorite({ item }: CardFavoriteProps) {
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
          <Link
            to={`/shop/product/${item._id}`}
            target="_blank"
            rel="noreferrer"
            className="font-semibold text-gray-800 line-clamp-2 hover:underline hover:text-blue-900 capitalize"
          >
            {item.name}
          </Link>

          <RemoveFavoriteBtn id={item._id} />
        </div>
      </div>

      {/* UNIT PRICE */}
      <div className="col-span-2 text-center text-gray-700">
        {formatCurrency(item.price)}
      </div>

      {/* QUANTITY */}
      <div className="col-span-2 flex justify-center items-center gap-2">
        <span
          className={`${
            item.countInStock === 0 ? "bg-red-500" : "bg-blue-900"
          } font-semibold px-4 py-1 text-white rounded-full`}
        >
          {item.countInStock === 0 ? "Out of stock" : "In stock"}
        </span>
      </div>

      {/* SUBTOTAL */}
      <div className="col-span-2 text-right font-semibold text-gray-800">
        {formatCurrency(item.price)}
      </div>
    </div>
  );
}
