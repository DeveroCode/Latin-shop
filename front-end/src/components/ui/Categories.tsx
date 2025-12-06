import { Funnel } from "lucide-react";
type CategoriesProps = {
  totalProducts: number;
}
export default function Categories({ totalProducts }: CategoriesProps) {
  return (
    <>
      <div className="w-1/2 gap-2 flex items-center">
        <span className="text-xl font-bold">{totalProducts } Products </span>
        <span className="font-extralight">Showing 1-20 of 200</span>
      </div>
      <div className="flex gap-4 w-1/2 justify-end">
        <button className="flex items-center gap-2 border border-gray-200 rounded-md p-2 bg-white text-gray-700">
          <Funnel className="w-5 h-5" />
          <span>Filter</span>
        </button>
        <input
          type="text"
          placeholder="Search"
          className="border border-gray-200 w-1/3 rounded-md p-2 bg-white text-gray-700"
        />
      </div>
    </>
  );
}
