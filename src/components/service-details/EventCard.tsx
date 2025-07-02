import {
  CheckCircledIcon,
  ExclamationTriangleIcon,
  InfoCircledIcon,
  GearIcon,
} from "@radix-ui/react-icons";

type EventType = "success" | "warning" | "error" | "info";

type EventCardProps = {
  type: EventType;
  title: string;
  description: string;
  metadata: string;
  time: string;
};

const iconMap: Record<EventType, JSX.Element> = {
  success: <CheckCircledIcon className="text-green-500 w-5 h-5" />,
  warning: <GearIcon className="text-yellow-500 w-5 h-5" />,
  error: <ExclamationTriangleIcon className="text-red-500 w-5 h-5" />,
  info: <InfoCircledIcon className="text-blue-500 w-5 h-5" />,
};

const EventCard = ({
  type,
  title,
  description,
  metadata,
  time,
}: EventCardProps) => {
  return (
    <div className="flex justify-between items-start py-4 border-b">
      <div className="flex gap-3">
        <div className="pt-1">{iconMap[type]}</div>
        <div>
          <div className="font-semibold text-gray-900">{title}</div>
          <div className="text-sm text-gray-600">{description}</div>
          <div className="text-sm text-gray-500 mt-1">{metadata}</div>
        </div>
      </div>
      <div className="text-sm text-gray-400 whitespace-nowrap">{time}</div>
    </div>
  );
};

export default EventCard;
