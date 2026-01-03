import Chart from "react-apexcharts";

export default function CircleChart() {
  const options = {
    chart: {
      type: "radialBar",
    },
    plotOptions: {
      radialBar: {
        hollow: { size: "60%" },
        track: { background: "#f1f1f1" },
        dataLabels: { show: false },
      },
    },
    colors: ["#34d399", "#9ca3af"],
    labels: ["Monthly Target", "Daily Target"],
  };
  const series = [44, 55];
  return (
    <div className="w-2/7">
      <Chart options={options} series={series} type="radialBar" />
    </div>
  );
}
