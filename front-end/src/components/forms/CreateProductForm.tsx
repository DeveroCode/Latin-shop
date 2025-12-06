import type { Category, ProductFormData } from "@/types/index";
import type { FieldErrors, UseFormRegister } from "react-hook-form";

type CreateProductFormProps = {
  register: UseFormRegister<ProductFormData>;
  errors: FieldErrors<ProductFormData>;
  categories: Category;
};

export default function CreateProductForm({
  register,
  errors,
  categories
}: CreateProductFormProps) {
  return (
    <>
      <fieldset>
        <label htmlFor="name" className="text-gray-600 text-xs">
          Name Product
        </label>
        <input
          type="text"
          id="name"
          placeholder="Enter product name"
          className="w-full p-2 border border-gray-300 rounded-md mt-1 mb-4"
          {...register("name", { required: "Name is required" })}
        />
        {errors.name && (
          <p className="text-red-500 text-xs mb-2">{errors.name.message}</p>
        )}
      </fieldset>

      <fieldset className="mb-4">
        <label htmlFor="category" className="text-gray-600 text-xs block mb-1">
          Category
        </label>
        <select
          id="category"
          className="w-full p-2 border border-gray-300 rounded-md"
          {...register("category", { required: "Category is required" })}
        >
          <option value="">-- Select a Category --</option>

          {/* Categories */}
          {categories.map((category) => (
            <option
              className="capitalize"
              key={category._id}
              value={category._id}
            >
              {category.name}
            </option>
          ))}
        </select>
        {errors.category && (
          <p className="text-red-500 text-xs mt-2">{errors.category.message}</p>
        )}
      </fieldset>
      <div className="flex gap-4 justify-between">
        <fieldset>
          <label htmlFor="brand" className="text-gray-600 text-xs">
            Brand Product
          </label>
          <input
            type="text"
            id="brand"
            placeholder="Enter product brand"
            className="w-full p-2 border border-gray-300 rounded-md mt-1 mb-4"
            {...register("brand", { required: "Brand is required" })}
          />
          {errors.brand && (
            <p className="text-red-500 text-xs mb-2">{errors.brand.message}</p>
          )}
        </fieldset>
        <fieldset>
          <label htmlFor="price" className="text-gray-600 text-xs">
            Price
          </label>
          <input
            type="number"
            id="price"
            placeholder="Enter product price"
            className="w-full p-2 border border-gray-300 rounded-md mt-1 mb-4"
            {...register("price", { required: "Price is required" })}
          />
          {errors.price && (
            <p className="text-red-500 text-xs mb-2">{errors.price.message}</p>
          )}
        </fieldset>
        <fieldset>
          <label htmlFor="countInStock" className="text-gray-600 text-xs">
            Count In Stock
          </label>
          <input
            type="number"
            id="countInStock"
            placeholder="Enter Count In Stock"
            className="w-full p-2 border border-gray-300 rounded-md mt-1 mb-4"
            {...register("countInStock", {
              required: "Count in stock is required",
            })}
          />
          {errors.countInStock && (
            <p className="text-red-500 text-xs mb-2">
              {errors.countInStock.message}
            </p>
          )}
        </fieldset>
      </div>

      <fieldset>
        <label htmlFor="description" className="text-gray-600 text-xs">
          Description
        </label>
        <textarea
          id="description"
          placeholder="Enter product description"
          cols={10}
          rows={5}
          className="w-full p-2 border border-gray-300 rounded-md mt-1 mb-4"
          {...register("description", { required: "Description is required" })}
        />
        {errors.description && (
          <p className="text-red-500 text-xs mb-2">
            {errors.description.message}
          </p>
        )}
      </fieldset>
    </>
  );
}
