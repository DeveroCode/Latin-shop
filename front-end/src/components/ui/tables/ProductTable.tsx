import type { Product } from "@/types/index";
import { formatCurrency } from "@/utils/index";
import MenuOptions from "../MenuOptions";
import Td from "../text/Td";

type ProductTableProps = {
  products: Product;
};

export default function ProductTable({ products }: ProductTableProps) {
  return (
    <div className="w-full mt-6">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100 h-11 text-left text-sm px-10">
            <th className="text-gray-800 capitalize text-sm px-5">
              product name
            </th>
            <th className="text-gray-800 capitalize text-sm px-5">image</th>
            <th className="text-gray-800 capitalize text-sm px-5">price</th>
            <th className="text-gray-800 capitalize text-sm px-5">status</th>
            <th className="text-gray-800 capitalize text-sm px-5">inventory</th>
            <th className="text-gray-800 uppercase text-sm px-5 text-center">
              sku
            </th>
            <th className="text-gray-800 capitalize text-sm px-5">actions</th>
          </tr>
        </thead>

        <tbody>
          {products.map((product: Product[number]) => {
            return (
              <tr
                key={product._id}
                className="h-12 border-b border-gray-200 text-sm hover:bg-gray-50 transition cursor-pointer"
              >
                <td
                  title={product.name}
                  className="font-semibold text-gray-800 capitalize px-5 text-left max-w-[450px] truncate cursor-help"
                >
                  {product.name}
                </td>
                <td className="px-5 text-left">
                  <div className="flex items-center gap-2">
                    <img
                      src={product.images[0]}
                      alt=""
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  </div>
                </td>
                <td className="font-semibold text-gray-800 capitalize px-5 text-left">
                  {formatCurrency(product.price)}
                </td>
                <td className="font-semibold text-gray-800 capitalize px-5 text-left">
                  <span
                    className={`
                    px-3 py-1 rounded-full text-xs font-semibold
                    bg-green-100 text-green-700
                  `}
                  >
                    Pending
                  </span>
                </td>
                <td className="font-semibold text-gray-800 capitalize px-5 text-center">
                  {product.countInStock}
                </td>
                <td className="font-semibold text-gray-800 capitalize px-5 text-center">
                  {product.brand}
                </td>
                <Td>
                  <MenuOptions id={product._id} key={product._id} />
                </Td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
