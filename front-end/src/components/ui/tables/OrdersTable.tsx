import Th from "../text/Th";
import Td from "../text/Td";
import type { Order, Orders } from "@/types/index";
import { formatCurrency } from "@/utils/index";
import { ChevronDown, Ellipsis } from "lucide-react";
import { useState } from "react";

interface OrdersTableProps {
  orders: Orders;
}

export default function OrdersTable({ orders }: OrdersTableProps) {
  const [openRow, setOpenRow] = useState<string | null>(null);

  return (
    <table className="w-full py-5 my-18">
      <caption className="text-start text-xl -tracking-tight uppercase text-blue-900 font-montserrat">
        Active now
      </caption>

      <thead>
        <tr className="border-b border-gray-300">
          <Th>#</Th>
          <Th>Created</Th>
          <Th>Order ID</Th>
          <Th>Customer</Th>
          <Th>Status</Th>
          <Th>Total</Th>
          <Th>Products</Th>
        </tr>
      </thead>

      <tbody>
        {orders.map((order: Order) => {
          const isOpen = openRow === order._id;
          return (
            <>
              <tr
                key={order._id}
                className={`h-12 text-center
      ${
        isOpen
          ? "border-l border-r border-t border-gray-400 bg-white"
          : "border-b border-gray-300"
      }
    `}
              >
                <Td>
                  <input type="checkbox" />
                </Td>
                <Td>2023-01-01</Td>
                <Td>{order._id.slice(0, 8)}</Td>
                <Td>{order.user.name + " " + order.user.last_name}</Td>
                <Td>{order.is_payment ? "paid" : "process"}</Td>
                <Td>{formatCurrency(order.total_amount)}</Td>

                <Td>
                  <button
                    className="px-2 rounded-full border border-gray-500 cursor-pointer"
                    onClick={() => setOpenRow(isOpen ? null : order._id)}
                  >
                    <ChevronDown
                      className={`w-5 h-5 text-gray-500 transition-transform ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                </Td>
              </tr>

              {isOpen && (
                <tr className="border-l border-r border-b border-gray-400">
                  <td colSpan={7} className="p-0">
                    <div className="px-10 py-1 bg-white space-y-4">
                      <table className="w-full">
                        <thead className="border-b border-gray-300">
                          <tr>
                            <Th>#</Th>
                            <Th>brand</Th>
                            <Th>name</Th>
                            <Th>price</Th>
                            <Th>qty</Th>
                            <Th>More</Th>
                          </tr>
                        </thead>

                        <tbody>
                          {order.products.map((item) => (
                            <tr key={item._id} className="h-14">
                              <Td>
                                <img
                                  src={item.product.images[0]}
                                  className="w-10 h-10 object-cover rounded"
                                />
                              </Td>

                              <Td>{item.product.brand}</Td>
                              <Td>{item.product.name}</Td>
                              <Td>{formatCurrency(item.price)}</Td>
                              <Td>{item.quantity}</Td>

                              <Td>
                                <button className="px-2 rounded-full border border-gray-500 cursor-pointer">
                                  <Ellipsis className="w-5 h-5 text-gray-500" />
                                </button>
                              </Td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </td>
                </tr>
              )}
            </>
          );
        })}
      </tbody>
    </table>
  );
}
