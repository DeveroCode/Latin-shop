import { getFavorites } from "@/api/ProductsAPI";
import CardFavorite from "@/components/ui/Cards/CardFavorite";
import { useQuery } from "@tanstack/react-query";
import { ChevronRight, HeartCrack } from "lucide-react";
import { Link } from "react-router-dom";

export default function FavoriteView() {
  const { isLoading, isError, data } = useQuery({
    queryKey: ["favorites"],
    queryFn: getFavorites,
    refetchOnWindowFocus: false,
    retry: false,
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;

  if (data)
    return (
      <div className="px-32">
        <section className="flex text-blue-900 font-bold capitaLize items-center pt-7">
          <Link to="/" className="">
            Home
          </Link>
          <ChevronRight className="w-5 h-5" />
          My Favorites
        </section>

        {data.length === 0 ? (
          <div className="text-center py-64 text-gray-500">
            <HeartCrack className="w-20 h-20 mx-auto" />
            <p className="mb-4">Your favorite list is currently empty.</p>
          </div>
        ) : (
          <section className="flex gap-2 justify-between">
            {/* Table */}
            <div className="py-10 w-full">
              <p className="text-lg text-gray-700 border-b border-gray-200 pb-2">
                Your Favorites{" "}
                {data.length > 1
                  ? `(${data.length} items) `
                  : `(${data.length} item)`}
              </p>

              <div className="py-10">
                <div className="grid grid-cols-12 gap-4 border-b border-gray-200 pb-3 text-sm text-gray-500 font-semibold">
                  <div className="col-span-6">Product</div>
                  <div className="col-span-2 text-center">Unit Price</div>
                  <div className="col-span-2 text-center">Stock status</div>
                  <div className="col-span-2 text-right">Subtotal</div>
                </div>
                {data.map((item) => (
                    <CardFavorite key={item._id} item={item} />
                ))}
              </div>
            </div>
          </section>
        )}
      </div>
    );
}
