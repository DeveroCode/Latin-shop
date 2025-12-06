import { getOrders } from "@/api/OrderAPI";
import Card_status_orders from "@/components/ui/Cards/Card_status_orders";
import Subtitle from "@/components/ui/Subtitle";
import OrdersTable from "@/components/ui/tables/OrdersTable";
import Title from "@/components/ui/Title";
import { useQuery } from "@tanstack/react-query";
import { House } from "lucide-react";

export default function OrdersView() {
  const {
    data,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["orders"],
    queryFn: getOrders,
    refetchOnWindowFocus: false,
    retry: false,
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;

  if (data) return (
    <>
        <section>
           <span className="text-blue-900 font-bold capitalize flex items-center gap-2 pb-7"> <House className="w-5 h-5" /> / Order List</span>
           <Title>Order list</Title>
           <Subtitle>Here you can find all of your Orders</Subtitle>
        </section>


        <Card_status_orders />

        <OrdersTable orders={data} />
    </>
  );
}
