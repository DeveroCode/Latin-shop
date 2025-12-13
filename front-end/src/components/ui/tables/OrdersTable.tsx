import Th from "../text/Th";
import Td from "../text/Td";
import type { Order, Orders } from "@/types/index";
import { formatCurrency } from "@/utils/index";
import { Ellipsis, Pencil, Trash2 } from "lucide-react";
import { useOrderStore } from "@/stores/order";
import { useEffect } from "react";

interface OrdersTableProps {
  orders: Orders;
}

export default function OrdersTable({ orders }: OrdersTableProps) {
  const {selecteAll, toggleOne, selectedIds, setToOrders} = useOrderStore();
  const ids = orders.map(order => order._id);
  const allChecked = selectedIds.length === ids.length;

   useEffect(() => {
    if (orders.length) {
      setToOrders(orders);
    }
  }, [orders, setToOrders]);

 return (
    <div className="w-full mt-6">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100 h-11">
            <Th>
              {" "}
              <input
                type="checkbox"
                className="w-4 h-4 rounded border-gray-400"
                checked={allChecked}
                onChange={() => selecteAll(ids)}
              />
            </Th>
            <Th>Order Number</Th>
            <Th>Customer Name</Th>
            <Th>Order Date</Th>
            <Th>Status</Th>
            <Th>Total Amount</Th>
            <Th>Payment Status</Th>
            <Th>Action</Th>
          </tr>
        </thead>

        <tbody>
          {orders.map((order: Order) => {
            const isChecked = selectedIds.includes(order._id);
            return (
              <tr
                key={order._id}
                className="h-12 border-b border-gray-200 text-sm hover:bg-gray-50 transition cursor-pointer"
              >
                <Td>
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-gray-400"
                    checked={isChecked}
                    onChange={() => toggleOne(order._id)}
                  />
                </Td>
                <Td>#{order._id.slice(0, 6).toUpperCase()}</Td>
                <Td>
                  <div className="flex items-center gap-2">
                    <img
                      src={order.user.image}
                      alt=""
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <span>{order.user.name + " " + order.user.last_name}</span>
                  </div>
                </Td>
                <Td>{new Date(order.createdAt).toDateString()}</Td>
                <Td>
                  <span
                    className={`
                    px-3 py-1 rounded-full text-xs font-semibold
                    bg-green-100 text-green-700
                  `}
                  >
                    Pending
                  </span>
                </Td>
                <Td>{formatCurrency(order.total_amount)}</Td>
                <Td>
                  <span
                    className={`text-sm font-semibold px-2 py-1 rounded-full
                    ${
                      order.is_payment
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {order.is_payment ? "Paid" : "Unpaid"}
                  </span>
                </Td>
                <Td>
                  <div className="flex items-center gap-3 text-gray-500">
                    <button>
                      <Pencil className="w-4 h-4 hover:text-blue-600" />
                    </button>
                    <button>
                      <Trash2 className="w-4 h-4 hover:text-red-600" />
                    </button>
                    <button>
                      <Ellipsis className="w-5 h-5 hover:text-gray-700" />
                    </button>
                  </div>
                </Td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
