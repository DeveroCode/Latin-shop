import { ShoppingCart, Store } from "lucide-react";
import Rating from "@/components/ui/Rating";
import { formatCurrency } from "@/utils/index";
import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import { searchProducts } from "@/api/ShopAPI";
import { useShoppingStore } from "@/stores/shopping";
export default function RenderSearchProducts() {
  const { setToCart } = useShoppingStore();
  const { word } = useParams();
  const { data, isError } = useQuery({
    queryKey: ["products-search", word],
    queryFn: () => searchProducts(word!),
    enabled: !!word,
    refetchOnWindowFocus: false,
    retry: false,
    staleTime: 0,
    gcTime: 1000 * 60 * 1,
  });

  if (isError) return <div>Error</div>;

  if (data)
    return (
      <div className="flex-1 w-[80%] flex flex-col gap-6">
        {data.map((product) => (
          <Link
            to={`/shop/product/${product._id}`}
            key={product._id}
            className="w-full border-gray-200 p-4 flex gap-6 border-y last-of-type:border-0"
          >
            {/* IMAGE */}
            <div className="relative w-44 h-44 bg-gray-100 rounded-lg flex items-center justify-center">

              <img
                src={product.images[2]}
                alt={`image of ${product.name}`}
                className="object-contain w-32 h-32"
              />
            </div>

            {/* INFO */}
            <div className="flex-1 flex flex-col gap-2">
              <p className="font-semibold text-gray-900 text-base line-clamp-2 capitalize">
                {product.name}
              </p>

              {/* PRICE */}
              <div className="flex items-center gap-2">
                <span className="text-blue-900 font-bold text-xl">
                  {formatCurrency(product.price)}
                </span>
                <span className="text-sm line-through text-gray-400">
                  {formatCurrency(product.price * 1.3)}
                </span>
                <span className="text-sm text-red-500 font-semibold">-30%</span>
              </div>

              {/* RATING */}
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Rating />
                <span>4.5</span>
                <span>·</span>
                <span>154 orders this week</span>
              </div>

              {/* SELLER */}
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Store className="w-4 h-4" />
                <span>Seller:</span>
                <span className="font-medium text-gray-700">
                  {product.brand}
                </span>
              </div>
            </div>

            {/* ACTIONS */}
            <div className="flex flex-col gap-3 min-w-[180px]">
              <Link
                to="/shop/my-cart"
                onClick={() => setToCart(product)}
                className="bg-blue-900 hover:bg-blue-700 transition text-white py-2 rounded-lg flex items-center justify-center gap-2 font-semibold"
              >
                <ShoppingCart className="w-5 h-5" />
                Add to cart
              </Link>

              <button className="border border-gray-300 hover:bg-gray-100 transition text-gray-700 py-2 rounded-lg font-medium">
                Add to wishlist
              </button>
            </div>
          </Link>
        ))}
      </div>
    );
}
