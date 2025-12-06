import RenderSearchProducts from "@/components/Main/RenderSearchProducts";
import AsideCategories from "@/components/ui/AsideCategories";
export default function SearchView() {
  return (
    <div className="px-4 md:px-14 lg:px-20 xl:px-32 py-10 flex flex-col md:flex-row gap-10 max-w-7xl">
      <AsideCategories />

      <RenderSearchProducts/>
    </div>
  );
}
