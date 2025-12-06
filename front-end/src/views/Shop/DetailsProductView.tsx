import "../../web-components/product-gallery.ts";
import type { Product } from "@/types/index";
import type { ProductGallery } from "../../web-components/product-gallery.ts";
import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import { useEffect, useRef } from "react";
import { formatCurrency } from "@/utils/index.ts";
import { getProductById } from "@/api/ProductsAPI";
import { Shield, ShoppingCart } from "lucide-react";
import { useShoppingStore } from "@/stores/shopping.ts";

export default function DetailsProductView() {
  const params = useParams<{ id: Product[number]["_id"] }>();
  const galleryRef = useRef<ProductGallery>(null);
  const { setToCart } = useShoppingStore();

  const {
    data: product,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["product", params.id],
    queryFn: () => getProductById(params.id!),
    enabled: !!params.id,
    refetchOnWindowFocus: false,
    retry: false,
  });

  useEffect(() => {
    if (galleryRef.current && product) {
      galleryRef.current.images = product.images;
    }
  }, [product]);

  if (isLoading) return <div>Loading...</div>;
  if (isError || !product) return <div>Error loading product.</div>;

  return (
    <div className="px-4 md:px-14 lg:px-20 xl:px-32 py-10 flex flex-col md:flex-row gap-10">
      <div className="flex flex-col md:flex-row gap-10 w-full">
        <div className="w-full md:w-1/2">
          <product-gallery ref={galleryRef}></product-gallery>
        </div>

        <div className="w-full md:w-1/3 space-y-5">
          <div className="border-b border-gray-200 pb-3">
            <p className="gap-3 text-gray-500">
              <span className="text-blue-700 mr-2">Brand:</span>
              {product.brand}
            </p>
            <h1 className="font-semibold font-montserrat text-3xl capitalize text-gray-600">
              {product.name}
            </h1>
          </div>

          <div>
            <p className="font-bold text-3xl">
              {formatCurrency(product.price)}
            </p>

            {/* Payment options */}
            <section className="mt-4">
              <p className="text-xs">Payment Options</p>

              <ul className="flex items-center gap-4 mt-5">
                <img
                  src="/payments/credit_card.png"
                  alt="payment option credit card"
                  className="w-8"
                  loading="lazy"
                />
                <img
                  src="/payments/debit_card.png"
                  alt="payment option debit card"
                  className="w-8"
                  loading="lazy"
                />
                <img
                  src="/payments/oxxo_payment.png"
                  alt="payment option oxxo payment"
                  className="w-8"
                  loading="lazy"
                />
              </ul>
            </section>

            {/* Stock */}
            <div className="pt-5">
              <p className="text-base font-bold">
                Stock available{" "}
                <span className="font-normal text-xs">
                  Stored and shipped by Latin-Shop MX
                </span>
              </p>
              <span className="font-semibold text-green-600">
                {product.countInStock} in stock
              </span>
            </div>
          </div>

          {/* Descripción */}
          <div className="mt-5">
            <h2 className="font-semibold text-lg mb-2">Product Details</h2>
            <p className="text-gray-700">{product.description}</p>
          </div>
        </div>

        {/* Information of the product */}
        <div className="p-5 border border-gray-200 rounded-md w-full md:w-1/4 h-fit self-start">
          <div>
            <p className="font-semibold text-blue-600">
              Get it free on{" "}
              <span className="font-normal text-sm text-gray-800">
                Wednesday
              </span>
            </p>
            <span className="text-xs text-gray-600">
              More details and delivery methods
            </span>
          </div>

          <div className="py-5">
            <p className="text-xl font-bold font-montserrat text-gray-600">
              Free 30-day return
            </p>
            <span className="text-xs block mt-1 text-blue-600">
              You have 30 business days to return the product from the date you
              receive it
            </span>
          </div>

          {/* Shop buttons */}
          <div className="mt-5">
            <div className="flex items-center">
              <label htmlFor="quantity">Quantity:</label>
              <select name="quantity" id="quantity" className="border-none">
                {[
                  ...Array(
                    Math.min(product.countInStock, product.countInStock)
                  ).keys(),
                ].map((x) => (
                  <option key={x + 1} value={x + 1}>
                    {x + 1 > 1 ? `${x + 1} units` : `${x + 1} unit`}
                  </option>
                ))}
              </select>
              <span className="text-xs text-gray-600 ml-2 block">
                ({product.countInStock} available)
              </span>
            </div>

            <button className="w-full py-2 px-3 text-white bg-gray-900 rounded-md mt-5 font-bold cursor-pointer">
              Shop Now!
            </button>
            <Link
              to="/shop/my-cart"
              onClick={() => setToCart(product)}
              className="w-full py-2 px-3 text-gray-900 bg-gray-900/20 rounded-md mt-1 font-bold flex items-center gap-2 justify-center cursor-pointer"
            >
              <ShoppingCart className="w-5 h-5" />
              Add to Cart
            </Link>
          </div>

          <div className="mt-7 flex gap-2">
            <Shield className="w-8 h-8 text-blue-900" />
            <p className="text-xs text-gray-800 mt-1">
              <span className="text-blue-900">Secure purchase</span>. Receive
              the product you expected or we will refund your money.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
