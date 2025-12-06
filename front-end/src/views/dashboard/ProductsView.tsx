import { Plus, Upload, Download } from "lucide-react";
import Categories from "@/components/ui/Categories";
import ProductTable from "@/components/ui/tables/ProductTable";
import CreateProductModal from "@/components/ui/modals/CreateProductModal";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "@/api/ProductsAPI";
import Title from "@/components/ui/Title";
import Subtitle from "@/components/ui/Subtitle";

export default function ProductsView() {
  const [isEnable, setIsEnable] = useState(false);

  const {data: products, isLoading, isError} = useQuery({
    queryKey: ['products'],
    queryFn: getProducts,
    refetchOnWindowFocus: false,
    retry: false,
  })

  const totalProducts = products ? products.length : 0;

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error</div>

  if (products) return (
    <div>
      <section className="flex items-center justify-between mb-10">
        <div>
         <Title>Products</Title>
         <Subtitle>Manage your products here</Subtitle>
        </div>
        <ul className="flex gap-4">
          <button className="border border-blue-900 text-blue-900 px-4 py-2 rounded-md flex items-center gap-2 cursor-pointer"><Upload className="w-4 h-4 text-blue-900 bg-white" />Export</button>
          <button className="border bg-white border-blue-900 text-blue-900 px-4 py-2 rounded-md flex items-center gap-2  cursor-pointer"><Download className="w-4 h-4 text-blue-900" />Import</button>
          <button className="bg-blue-900 text-white px-4 py-2 rounded-md flex items-center gap-2 cursor-pointer" onClick={() => setIsEnable(true)}><Plus className="w-4 h-4" />Add Product</button>
        </ul>
      </section>

      <div className="bg-white p-10 my-15 shadow-xs border border-gray-200/50 rounded-md">
        <div className="flex items-center justify-between mb-6 w-full">
          <Categories totalProducts={totalProducts} />
        </div>

        {products.length > 0 ?  <ProductTable products={products} /> : <p className="text-center font-bold text-xl">Products is empty</p>}
      </div>


      <CreateProductModal isEnable={isEnable} setIsEnable={setIsEnable}  />
    </div>
  );
}
