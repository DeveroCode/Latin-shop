import Chart from "react-apexcharts";

type Props = {
  data: {
    labels: string[];
    series: {
      revenue: number[];
      orders: number[];
    };
  };
};

export default function ChartsRevenue({ data }: Props) {
  const options: ApexCharts.ApexOptions = {
    chart: {
      type: "area",
      toolbar: { show: false },
      zoom: { enabled: false },
    },
    stroke: {
      curve: "smooth",
      width: 3,
      dashArray: [0, 6],
    },
    colors: ["#1e3a8a", "#60a5fa"],
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.15,
        opacityTo: 0,
      },
    },
    dataLabels: { enabled: false },
    grid: {
      borderColor: "#e5e7eb",
      strokeDashArray: 4,
    },
    xaxis: {
      categories: data.labels,
      axisBorder: { show: false },
      axisTicks: { show: false },
      labels: {
        style: { colors: "#6b7280", fontSize: "12px" },
      },
    },
    yaxis: {
      labels: {
        style: { colors: "#6b7280", fontSize: "12px" },
        formatter: (val) => `${Math.round(val / 1000)}k`,
      },
    },
    tooltip: {
      shared: true,
      intersect: false,
      theme: "light",
    },
    legend: { show: false },
  };

  const series = [
    {
      name: "Revenue",
      data: data.series.revenue,
    },
    {
      name: "Order",
      data: data.series.orders,
    },
  ];

  return (
    <Chart
      options={options}
      series={series}
      type="area"
      height={300}
    />
  );
}
