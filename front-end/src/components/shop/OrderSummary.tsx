import { Link } from "react-router-dom";
import { formatCurrency } from "@/utils/index";
import SecondP from "../ui/text/SecondP";
import SecondSpan from "../ui/text/SecondSpan";
import { useShoppingStore } from "@/stores/shopping";

export default function OrderSummary() {
  const total_amount = useShoppingStore((state) => state.totalAmount());
  const totalPieces = useShoppingStore((state) => state.totalPieces());
  return (
    <div>
      <p className="capitalize font-bold text-lg pb-2">Cart summary</p>

      <div className="py-5 space-y-2 border-y border-gray-200">
        <div className="flex justify-between">
          <SecondP>Subtotal</SecondP>
          <SecondSpan>{formatCurrency(total_amount)}</SecondSpan>
        </div>
        <div className="flex justify-between">
          <SecondP>Total Pieces</SecondP>
          <SecondSpan>{totalPieces}</SecondSpan>
        </div>
        <div className="flex justify-between">
          <SecondP>Shipping</SecondP>
          <SecondSpan>Free</SecondSpan>
        </div>
      </div>

      <div className="flex justify-between text-gray-800 font-bold py-5">
        <p className="text-xl font-montserrat">Total</p>
        <span>{formatCurrency(total_amount)}</span>
      </div>

      <Link
        to={"/shop/checkout"}
        className="block mt-5 w-full text-center font-semibold bg-blue-900 py-2 border border-black rounded-xs text-white capitalize hover:bg-white hover:text-blue-900
        transition duration-300"
      >
        Proceed to checkout
      </Link>
      <Link
        to={"/"}
        className="block mt-5 w-full text-center font-semibold py-2 border rounded-xs bg-white capitalize"
      >
        Continue Shopping
      </Link>
    </div>
  );
}
