import { Heart } from "lucide-react";
import Rating from "@/components/ui/Rating";
import { formatCurrency } from "@/utils/index";
import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import { searchProducts } from "@/api/ShopAPI";
export default function RenderSearchProducts() {
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

  if (data) return (
    <div className="flex-1 flex gap-6">
      {data.map((product) => (
        <Link to={`/shop/product/${product._id}`}
          key={product._id}
          className="
          relative group border border-gray-200 shadow bg-gray-50
          w-[160px] lg:w-[140px] xl:w-[200px]
          h-[230px] sm:h-[300px] md:h-[280px]
          flex flex-col items-center justify-between
          rounded-lg hover:shadow-md transition-all duration-300 cursor-pointer
          hover:scale-[1.03]
        "
        >
          <button
            className="
            absolute top-2 right-2 text-gray-400 hover:text-red-500
            opacity-0 group-hover:opacity-100 transition-all duration-300
            transform group-hover:scale-110
          "
            aria-label="Add to favorites"
          >
            <Heart className="w-5 h-5" />
          </button>

          <picture className="w-full h-32 sm:h-36 md:h-40 flex items-center justify-center">
            <img
              src={product.images[2]}
              alt={product.name}
              loading="lazy"
              className="w-full h-full object-contain p-3 transition-transform duration-300 group-hover:scale-105"
            />
          </picture>

          <div className="w-full mt-2 h-full bg-white p-3 rounded-b-lg">
            <div className="flex gap-3">
              <Rating />
            </div>
            <p
              className="font-semibold text-gray-700 text-xs sm:text-sm truncate capitalize mt-2"
              title={product.name}
            >
              {product.name}
            </p>
            <p className="text-gray-600 text-xs sm:text-sm">
              {formatCurrency(product.price)}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}
