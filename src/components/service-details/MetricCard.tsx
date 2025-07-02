type MetricCardProps = {
  title: string;
  value: string;
  icon?: React.ReactNode;
  change?: string;
  changeColor?: "green" | "red" | "gray";
  subtext?: string;
};

const MetricCard = ({
  title,
  value,
  icon,
  change,
  changeColor = "gray",
  subtext,
}: MetricCardProps) => {
  const colorMap = {
    green: "text-green-600",
    red: "text-red-600",
    gray: "text-gray-500",
  };

  return (
    <div className="bg-white rounded-xl border px-4 py-3 w-full sm:w-auto flex flex-col gap-1 shadow-sm">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-gray-600">{title}</span>
        {icon}
      </div>
      <div className="text-xl font-bold text-gray-900">{value}</div>
      {change && (
        <div className={`text-sm ${colorMap[changeColor]}`}>{change}</div>
      )}
      {subtext && <div className="text-sm text-gray-500">{subtext}</div>}
    </div>
  );
};

export default MetricCard;
