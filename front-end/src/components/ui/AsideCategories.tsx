import { useCategories } from "@/hooks/categories";
import { Link } from "react-router-dom";

export default function AsideCategories() {
  const { data: categories } = useCategories();
  return (
    <aside className="space-y-5 w-[240px]">
      <ul>
        <h2 className="font-bold text-gray-800 mb-2">Category</h2>
        {categories?.map((cat) => (
          <li key={cat._id}>
            <Link
              to={`/category/${cat._id}`}
              className="capitalize text-gray-500 text-sm hover:text-gray-700"
            >
              {cat.name}
            </Link>
          </li>
        ))}
      </ul>

      <ul>
        <h2 className="font-bold text-gray-800 my-2">Gender</h2>
        <li>
          <Link
            to={`/category/men`}
            className="capitalize text-gray-500 text-sm hover:text-gray-700"
          >
            men
          </Link>
        </li>
        <li>
          <Link
            to={`/category/women`}
            className="capitalize text-gray-500 text-sm hover:text-gray-700"
          >
            women
          </Link>
        </li>
      </ul>
    </aside>
  );
}
