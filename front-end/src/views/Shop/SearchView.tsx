import RenderSearchProducts from "@/components/Main/RenderSearchProducts";
import AsideCategories from "@/components/ui/AsideCategories";
import type { Product } from "@/types/index";
import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
export default function SearchView() {
  const { word } = useParams();
  const QY = useQueryClient();
  const producst = QY.getQueryData(["products-search", word]) as Product[];
  return (
    <div className="px-4 md:px-14 lg:px-20 xl:px-32 py-5">
      <section>
        <legend className="font-montserrat capitalize text-xl">
          find product by {word}
        </legend>
        <span className="text-gray-600 text-xs  capitalize">{`${producst?.length > 1 ? 'products' : 'product'} found ${producst?.length}`}</span>
      </section>
      <section className="flex flex-col md:flex-row gap-10 py-10">
        <AsideCategories />
        <RenderSearchProducts />
      </section>
    </div>
  );
}
