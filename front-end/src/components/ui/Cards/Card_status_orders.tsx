import { useQuery } from "@tanstack/react-query";
import Legend from "../text/Legend";
import P from "../text/P";
import Span from "../text/Span";
import { getStats } from "@/api/OrderAPI";
import type { Stat, Stats } from "@/types/index";
import { formatCurrency } from "@/utils/index";

export default function Card_status_orders() {
  const { data: stats, isLoading, isError } = useQuery<Stats>({
    queryKey: ["stats"],
    queryFn: getStats,
    refetchOnWindowFocus: false,
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading stats</div>;
  if (!stats) return null;
  console.log(stats);

  return (
    <div className="w-full py-6 border-b border-gray-200 my-3">
      <div className="grid grid-cols-4 w-full">
       {stats.map((stat: Stat) => (
         <div className="px-6 border-r border-gray-200 last-of-type:border-0">
          <Legend>{stat.title}</Legend>
          <P>{`${stat.title === 'Total Amount' ? formatCurrency(stat.count) : stat.count}`}</P>
          <Span>{stat.description}</Span>
        </div>
       ))}
      </div>
    </div>
  );
}
