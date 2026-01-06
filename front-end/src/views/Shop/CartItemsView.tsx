import OrderSummary from "@/components/shop/OrderSummary";
import Card_item_details from "@/components/ui/Cards/Card_item_details";
import { useShoppingStore } from "@/stores/shopping";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function CartItemsView() {
  const { cart } = useShoppingStore();
  return (
    <div className="px-36">
      <div className="flex text-blue-900 font-bold capitaLize items-center pt-7">
        <Link to="/" className="">
          Home
        </Link>
        <ChevronRight className="w-5 h-5" />
        Shopping Cart
      </div>

      {cart.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-500 mb-4">Your cart is currently empty.</p>
        </div>
      ) : (
         <section className="flex gap-2 justify-between">
        {/* Table */}
        <div className="py-10 w-[70%]">
          <p className="text-lg text-gray-700 border-b border-gray-200 pb-2">
            Your cart{" "}
            {cart.length > 1
              ? `(${cart.length} items) `
              : `(${cart.length} item)`}
          </p>

          <div className="py-10">
            <div className="grid grid-cols-12 gap-4 border-b border-gray-200 pb-3 text-sm text-gray-500 font-semibold">
              <div className="col-span-6">Product</div>
              <div className="col-span-2 text-center">Unit Price</div>
              <div className="col-span-2 text-center">Quantity</div>
              <div className="col-span-2 text-right">Subtotal</div>
            </div>

            {cart.map((item) => (
              <div className="py-7">
                <Card_item_details key={item._id} item={item} />
              </div>
            ))}
          </div>
        </div>

        {/* Summary */}
        <div className="py-10 w-[25%]">
          <OrderSummary />
        </div>
      </section>
      )}
    </div>
  );
}
