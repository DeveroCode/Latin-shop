import { getOrders } from "@/api/OrderAPI";
import MoreOptionsOrder from "@/components/ui/headers/MoreOptionsOrder";
import OrderOptionsHeader from "@/components/ui/headers/OrderOptionsHeader";
import Subtitle from "@/components/ui/text/Subtitle";
import OrdersTable from "@/components/ui/tables/OrdersTable";
import Title from "@/components/ui/text/Title";
import { useOrderStore } from "@/stores/order";
import { useQuery } from "@tanstack/react-query";
import { House } from "lucide-react";
import KPIsOrders from "@/components/ui/Cards/KPIsOrders";

export default function OrdersView() {
  const isSelectedId = useOrderStore(state => state.selectedIds.length > 0);
  const { data, isLoading, isError } = useQuery({
    queryKey: ["orders"],
    queryFn: getOrders,
    refetchOnWindowFocus: false,
    retry: false,
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;

  if (data)
    return (
      <>
        <section className="flex flex-col pt-7">
          <div className="flex items-center justify-between">
            <span className="text-blue-900 font-bold capitalize flex items-center gap-2">
              {" "}
              <House className="w-5 h-5" /> / Order List
            </span>

             <OrderOptionsHeader />
          </div>
          <Title>Order list</Title>
          <Subtitle>Here you can find all of your Orders</Subtitle>
        </section>

        <KPIsOrders />

        {data.length > 0 ? <OrdersTable orders={data} /> : (
          <p className="text-center text-gray-500 py-24 font-montserrat text-2xl">You have no orders</p>
        ) }
        {isSelectedId && <MoreOptionsOrder />}
      </>
    );
}
