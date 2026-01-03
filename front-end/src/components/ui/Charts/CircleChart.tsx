import { getActualSales } from "@/api/DashboardAPI";
import { useQuery } from "@tanstack/react-query";
import Chart from "react-apexcharts";

export default function CircleChart() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["actual-sales"],
    queryFn: getActualSales,
    refetchOnWindowFocus: false,
    retry: false,
    staleTime: 5 * 60 * 1000,
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError || !data) return <div>Error loading chart</div>;

  const target = data.series[0];
  const revenue = data.series[1];

  const percentage =
    target > 0 ? Math.round((revenue / target) * 100) : 0;

  const options: ApexCharts.ApexOptions = {
    chart: {
      type: "radialBar",
      sparkline: { enabled: true },
    },
    plotOptions: {
      radialBar: {
        startAngle: -90,
        endAngle: 90,
        hollow: {
          size: "65%",
        },
        track: {
          background: "#e5e7eb",
          strokeWidth: "100%",
        },
        dataLabels: {
          name: { show: false },
          value: {
            offsetY: -5,
            fontSize: "32px",
            fontWeight: 700,
            color: "#1e3a8a",
            formatter: () => `${percentage}%`,
          },
        },
      },
    },
    fill: {
      colors: ["#1e3a8a"]
    },
    stroke: {
      lineCap: "round",
    },
  };

  return (
    <div className="bg-white rounded-xl p-5 shadow-sm w-full max-w-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-800">Monthly Sales</h3>
      </div>

      <Chart
        options={options}
        series={[percentage]}
        type="radialBar"
        height={220}
      />

      <div className="text-center mt-4">
        <p className="font-semibold text-gray-800">Great Progress! 🎉</p>
        <p className="text-sm text-gray-500">
          Let’s reach 100% next month
        </p>
      </div>

      <div className="grid grid-cols-2 mt-14 text-center bg-blue-50 rounded-lg overflow-hidden">
        <div className="py-3">
          <p className="text-xs text-gray-500">Target</p>
          <p className="font-bold text-blue-900">
            ${target.toLocaleString()}
          </p>
        </div>
        <div className="py-3 border-l">
          <p className="text-xs text-gray-500">Revenue</p>
          <p className="font-bold text-blue-900">
            ${revenue.toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
}
