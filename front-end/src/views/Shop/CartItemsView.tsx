import OrderSummary from "@/components/shop/OrderSummary";
import Card_item_details from "@/components/ui/Cards/Card_item_details";
import PrimaryButtons from "@/components/ui/PrimaryButtons";
import Subtitle from "@/components/ui/text/Subtitle";
import { useShoppingStore } from "@/stores/shopping";
import { Link } from "react-router-dom";

export default function CartItemsView() {
  const { cart } = useShoppingStore();
  return (
    <div className="px-4 md:px-14 lg:px-20 xl:px-32 py-10 flex flex-col md:flex-row gap-10">
      <div className="bg-white rounde-md shadow-xl p-8 w-full border border-gray-100 h-fit">
        <div className="flex justify-between items-center mb-6">
          <p className="text-xs text-gray-500 py-2">
            Home {">"} <span className="text-black">Shopping Cart</span>
          </p>

          <Link
            to="/"
            className="bg-gray-300 py-2 px-5 rounded-md text-sm text-gray-600 font-bold"
          >
            &larr; Back to shop
          </Link>
        </div>

        <h1 className="text-xl font-bold font-montserrat capitalize pb-1">
          Your shopping cart
        </h1>
        <Subtitle>Make sure everithing looks right before checkout</Subtitle>

        {cart.length === 0 && (
          <div className="text-center py-10">
            <p className="text-gray-500 mb-4">Your cart is currently empty.</p>
          </div>
        )}

        {/* Render Product Cart */}
        <section className="overflow-y-auto py-5 max-h-80 mt-5">
          {cart.map((item) => (
            <Card_item_details key={item._id} item={item} />
          ))}
        </section>

        <div className="flex mt-2 justify-end">
          <PrimaryButtons>Save Cart!</PrimaryButtons>
        </div>
      </div>


      <OrderSummary/>
    </div>
  );
}
