import OrderOptionsHeader from "@/components/ui/headers/OrderOptionsHeader";
import { MonitorCheck } from "lucide-react";
import Title from "@/components/ui/text/Title";
import Subtitle from "@/components/ui/text/Subtitle";
import KPIsDashboard from "@/components/ui/Cards/KPIsDashboard";
import CircleChart from "@/components/ui/Charts/CircleChart";
import { useQuery } from "@tanstack/react-query";
import { KPIDashboard } from "@/api/DashboardAPI";
import type { Stats } from "@/types/index";
import RevenueAnalyticsChart from "@/components/ui/Charts/RevenueAnalyticsChart";

export default function Index() {
  const { isLoading, isError, data } = useQuery<Stats>({
    queryKey: ["KPIsDashboard"],
    queryFn: KPIDashboard,
    refetchOnWindowFocus: false,
    retry: false,
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading stats</div>;
  if (data)
    return (
      <>
        <section className="flex flex-col pt-7">
          <div className="flex items-center justify-between">
            <span className="text-blue-900 font-bold capitalize flex items-center gap-2">
              {" "}
              <MonitorCheck className="w-5 h-5" /> / index
            </span>
            <OrderOptionsHeader />
          </div>
          <Title>Dashborad analytics</Title>
          <Subtitle>
            Here you can view key metrics, performance insights, and an overview
            of your products and activity.
          </Subtitle>
        </section>

        <KPIsDashboard data={data} />
        <div className="flex justify-between gap-24 py-12">
          <RevenueAnalyticsChart />
          <CircleChart />
        </div>
      </>
    );
}
