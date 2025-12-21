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
    </>
  );
}
