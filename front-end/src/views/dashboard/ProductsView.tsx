import { ClockArrowDown } from "lucide-react";
import ProductTable from "@/components/ui/tables/ProductTable";
import CreateProductModal from "@/components/ui/modals/CreateProductModal";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "@/api/ProductsAPI";
import Title from "@/components/ui/text/Title";
import Subtitle from "@/components/ui/text/Subtitle";
import OrderOptionsHeader from "@/components/ui/headers/OrderOptionsHeader";

export default function ProductsView() {
  const [isEnable, setIsEnable] = useState(false);

  const {
    data: products,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
    refetchOnWindowFocus: false,
    retry: false,
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;

  if (products)
    return (
      <>
        <section className="flex flex-col pt-7">
          <div className="flex items-center justify-between">
            <span className="text-blue-900 font-bold capitalize flex items-center gap-2">
              {" "}
              <ClockArrowDown className="w-5 h-5" /> / Order List
            </span>
            <OrderOptionsHeader />
          </div>
          <Title>Products list</Title>
          <Subtitle>Here you can find all of your Products</Subtitle>
        </section>

        {products.length > 0 ? (
          <ProductTable products={products} />
        ) : (
          <p className="text-center font-bold text-xl">Products is empty</p>
        )}

        <CreateProductModal isEnable={isEnable} setIsEnable={setIsEnable} />
      </>
    );
}
