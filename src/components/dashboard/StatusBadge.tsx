import { cn } from "@/lib/utils";

const statusStyles: { [key: string]: string } = {
  Online: "bg-green-100 text-green-800",
  Offline: "bg-red-100 text-red-800",
  Warning: "bg-yellow-100 text-yellow-800",
};

export function StatusBadge({ status }: { status: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
        statusStyles[status] ?? "bg-gray-100 text-gray-800"
      )}
    >
      {status}
    </span>
  );
}
