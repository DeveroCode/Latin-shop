import { useQuery } from "@tanstack/react-query";
import Legend from "../text/Legend";
import P from "../text/P";
import Span from "../text/Span";
import { getStats } from "@/api/OrderAPI";
import type { Stat } from "@/types/index";

export default function Card_status_orders() {
  const { data, isLoading, isError } = useQuery<Stat[]>({
    queryKey: ["stats"],
    queryFn: getStats,
    refetchOnWindowFocus: false,
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading stats</div>;
  if (!data) return null;

  const stats = data.reduce((acc, item) => {
    acc[item.name] = item.value;
    return acc;
  }, {} as Record<string, number>);

  console.log(stats);
  

  return (
    <div className="w-full py-6 border-b border-gray-200 my-3">
      <div className="grid grid-cols-4 w-full">

        <div className="px-6 border-r">
          <Legend>Total Orders</Legend>
          <P>{stats["Total orders"] ?? 0}</P>
          <Span>Total Orders last 365 days</Span>
        </div>

        <div className="px-6 border-r">
          <Legend>New Orders</Legend>
          <P>{stats["New orders"] ?? 0}</P>
          <Span>New Orders last 7 days</Span>
        </div>

        <div className="px-6 border-r">
          <Legend>Completed Orders</Legend>
          <P>{stats["Completed orders"] ?? 0}</P>
          <Span>Completed Orders</Span>
        </div>

        <div className="px-6">
          <Legend>Total Amount</Legend>
          <P>${stats["Total amount"]?.toLocaleString() ?? 0}</P>
          <Span>Total revenue</Span>
        </div>

      </div>
    </div>
  );
}
