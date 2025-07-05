import { Skeleton } from "@/components/ui/skeleton";

type ServiceItemProps = {
  icon: React.ReactNode;
  label: string;
  value: number | string;
  className?: string;
  isLoading?: boolean;
};

export function ServiceItem({
  icon,
  label,
  value,
  className = "",
  isLoading = false,
}: ServiceItemProps) {
  return (
    <div
      className={`flex items-center gap-4 p-4 rounded-lg shadow-sm border bg-card w-full sm:w-auto ${className}`}
    >
      <div className="text-2xl text-muted-foreground">{icon}</div>
      <div className="flex flex-col">
        <span className="text-sm text-muted-foreground">{label}</span>
        {isLoading ? (
          <Skeleton className="h-6 w-10 mt-1" />
        ) : (
          <span className="text-xl font-semibold text-card-foreground">{value}</span>
        )}
      </div>
    </div>
  );
}
