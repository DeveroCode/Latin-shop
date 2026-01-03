import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getMainData } from "@/api/DashboardAPI";
import ChartsRevenue from "./ChartsRevenue";
import { ChevronDown } from "lucide-react";

export default function RevenueAnalyticsChart() {
  const [days, setDays] = useState("7");

  const { data, isLoading, isError } = useQuery({
    queryKey: ["revenue-analytics", days],
    queryFn: () => getMainData(days),
    refetchOnWindowFocus: false,
    retry: false,
    staleTime: 5 * 60 * 1000
  });

  if (isLoading) return <div>Loading chart...</div>;
  if (isError) return <div>Error loading chart</div>;

  if (data) return (
    <div className="bg-white rounded-2xl p-6 shadow-sm flex-1">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            Revenue Analytics
          </h3>

          <div className="flex gap-4 text-sm mt-1">
            <span className="flex items-center gap-1 text-blue-900 font-medium">
              <span className="w-2 h-2 bg-blue-900 rounded-full" />
              Revenue
            </span>
            <span className="flex items-center gap-1 text-blue-500">
              <span className="w-2 h-2 border-2 border-blue-500 rounded-full" />
              Order
            </span>
          </div>
        </div>

        {/* Select */}
        <div className="relative">
          <select
            value={days}
            onChange={(e) => setDays(e.target.value)}
            className="appearance-none bg-blue-500 text-white text-sm font-semibold
                       px-4 py-2 pr-8 rounded-lg cursor-pointer focus:outline-none"
          >
            <option value="7">Last 7 Days</option>
            <option value="30">Last 30 Days</option>
            <option value="365">Last 365 Days</option>
          </select>

          <ChevronDown
            className="absolute right-2 top-1/2 -translate-y-1/2 text-white"
            size={16}
          />
        </div>
      </div>

      {/* Chart */}
      <ChartsRevenue data={data} />
    </div>
  );
}
