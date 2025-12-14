import type { Order } from "@/types/index";
import { formatCurrency, transformDate } from "@/utils/index";
import { motion, AnimatePresence } from "framer-motion";

type OrderProductModalProps = {
  isEnable: boolean;
  setIsEnable: (isEnable: boolean) => void;
  order: Order;
};

export default function OrderProductModal({
  isEnable,
  setIsEnable,
  order,
}: OrderProductModalProps) {

  return (
    <AnimatePresence>
      {isEnable && (
        <motion.div
          className="fixed inset-0 z-50 flex items-end justify-end pb-12 pr-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsEnable(false)}
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            className="h-[500px] w-[420px]
            relative
              bg-white
              rounded-3xl
              shadow-2xl
              overflow-hidden
              flex flex-col
            "
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <div className="absolute left-0 top-[170px] -translate-x-1/2 w-8 h-8 rounded-full bg-blue-900 z-10"></div>
            <div className="absolute right-0 top-[170px] translate-x-1/2 w-8 h-8 rounded-full bg-blue-900 z-10"></div>
            <div className="absolute top-[184px] left-4 right-4 border-b-2 border-dashed border-gray-300 z-0"></div>
            <div className="p-6 pb-8 bg-white z-10">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h2 className="font-bold text-xl text-indigo-900 uppercase tracking-wider">
                    Products
                  </h2>
                  <p className="text-xs text-gray-400 font-medium tracking-widest mt-1">
                    ORDER DETAILS
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-indigo-600 font-black text-xl">
                   {formatCurrency(order.total_amount)}
                  </p>
                  <p className="text-[10px] text-gray-400 font-bold uppercase">Total Amount</p>
                </div>
              </div>

              <div className="flex justify-between items-end mt-4">
                 <div>
                    <p className="text-[10px] text-gray-400 uppercase font-bold">Date</p>
                    <p className="font-semibold text-gray-700">{transformDate(order.createdAt)}</p>
                 </div>
                 <div className="text-right">
                    <p className="text-[10px] text-gray-400 uppercase font-bold">Expected Delivery</p>
                    <p className="font-bold text-indigo-600">Jan 26, 2026</p>
                 </div>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-6 pt-8 bg-white">
              <legend className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
                Products on board
              </legend>

              <div className="space-y-4">
                {order.products.map((p) => (
                  <div key={p._id} className="flex gap-4 items-center group">
                    <div className="relative">
                        <img
                        src={p.product.images[0]}
                        alt={p.product.name}
                        className="w-14 h-14 object-cover rounded-lg border border-gray-100 shadow-sm bg-gray-50"
                        />
                        <span className="absolute -top-2 -right-2 bg-indigo-100 text-indigo-700 text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full">
                            {p.quantity}
                        </span>
                    </div>

                    <div className="flex-1">
                      <h3 className="font-bold text-sm text-gray-800 line-clamp-1 capitalize">
                        {p.product.name}
                      </h3>
                      <p className="text-xs text-gray-500 font-mono mt-0.5">
                         {formatCurrency(p.product.price)} / unit
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="p-4 bg-gray-50 border-t border-gray-100 flex flex-col items-center justify-center gap-1">
                <div className="h-8 w-full max-w-[200px] flex justify-between overflow-hidden opacity-60">
                    {[...Array(40)].map((_, i) => (
                        <div
                            key={i}
                            className={`h-full bg-black ${Math.random() > 0.5 ? 'w-[2px]' : 'w-[4px]'}`}
                        />
                    ))}
                </div>
                <p className="text-[9px] text-gray-400 tracking-[0.3em] font-mono">
                    {order._id ? order._id.toUpperCase().slice(0, 12) : 'AGL27593'}
                </p>
            </div>

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}