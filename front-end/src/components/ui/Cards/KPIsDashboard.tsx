import Legend from "../text/Legend";
import P from "../text/P";
import Span from "../text/Span";
import type { Stats, Stat } from "@/types/index";
import { formatCurrency } from "@/utils/index";


type KPIsDashboardProps = {
  data: Stats
};
export default function KPIsDashboard({ data }: KPIsDashboardProps) {
  return (
    <div className="w-full py-6 border-b border-gray-200 my-3">
      <div className="grid grid-cols-4 w-full">
       {data.map((stat: Stat) => (
         <div className="px-6 border-r border-gray-200 last-of-type:border-0">
          <Legend>{stat.title}</Legend>
          <P>{`${stat.title === 'Total Revenues' ? formatCurrency(stat.count) : stat.count}`}</P>
          <Span>{stat.description}</Span>
        </div>
       ))}
      </div>
    </div>
  );
}
