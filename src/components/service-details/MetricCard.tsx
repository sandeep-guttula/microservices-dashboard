
import { useServiceMetricsQuery } from "@/lib/queries/services";

interface MetricCardProps {
  serviceId: string;
}

export function MetricCard({ serviceId }: MetricCardProps) {
  const { data: metrics, isLoading, isError, error } = useServiceMetricsQuery(serviceId);

  if (isLoading) {
    return <div>Loading metrics...</div>;
  }

  if (isError) {
    return <div>Error loading metrics: {error.message}</div>;
  }

  if (!metrics) {
    return <div>No metrics found</div>;
  }

  return (
    <div className="bg-card rounded-lg border shadow-sm">
      <div className="px-6 py-4 border-b">
        <h3 className="text-lg font-semibold">Metrics</h3>
      </div>
      <div className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">Uptime</p>
          <p className="text-sm">{metrics.uptime}%</p>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">Response Time</p>
          <p className="text-sm">{metrics.responseTime}ms</p>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">Error Rate</p>
          <p className="text-sm">{metrics.errorRate}%</p>
        </div>
      </div>
    </div>
  );
}
