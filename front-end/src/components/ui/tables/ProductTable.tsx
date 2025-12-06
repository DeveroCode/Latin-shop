import type { Product } from "@/types/index";
import { formatCurrency } from "@/utils/index";
import MenuOptions from "../MenuOptions";

type ProductTableProps = {
  products: Product;
};

export default function ProductTable({ products }: ProductTableProps) {
  return (
    <div className="overflow-x-auto rounded-md shadow border border-gray-200">
      <table className="w-full bg-white text-sm">
        <thead className="bg-gray-50 text-gray-700 text-left border-b border-gray-200">
          <tr>
            <th className="py-3 px-4 font-semibold">Product Name</th>
            <th className="py-3 px-4 font-semibold">Image</th>
            <th className="py-3 px-4 font-semibold">Sale Price</th>
            <th className="py-3 px-4 font-semibold">Status</th>
            <th className="py-3 px-4 font-semibold">Inventory</th>
            <th className="py-3 px-4 font-semibold">SKU</th>
            <th className="py-3 px-4 font-semibold text-right">Actions</th>
          </tr>
        </thead>

        <tbody className="divide-y">
          {products.map((product) => (
            <tr className="hover:bg-gray-50 border-b border-gray-200 last:border-b-0">
              <td className="py-3 px-4 font-medium text-gray-900 capitalize">
                {product.name}
              </td>
              <td className="py-3 px-4">
                <img
                  src={product.images[0]}
                  alt="Product"
                  className="w-10 h-10 rounded-full object-cover"
                />
              </td>
              <td className="py-3 px-4 text-gray-700">{formatCurrency(product.price)}</td>
              <td className="py-3 px-4">
                <label className="inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    defaultChecked
                  />
                  <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-purple-500 transition"></div>
                  <span className="ml-2 text-sm text-gray-700">Active</span>
                </label>
              </td>
              <td className="py-3 px-4 text-gray-700">{product.countInStock} in stock</td>
              <td className="py-3 px-4 text-gray-700">IN3245DTU</td>
              <td className="py-3 px-4">
                <MenuOptions
                  key={product._id}
                  id={product._id}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
