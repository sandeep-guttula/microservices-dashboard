export type ServiceType = "API" | "Database" | "Queue" | "Cache" | "Gateway" | "Other";
export type ServiceStatus = "Online" | "Degraded" | "Offline" | "Restart";

export type Service = {
  name: string;
  id: string;
  type: ServiceType;
  status: ServiceStatus;
  version?: string;
  description?: string;
  lastCheck: string;
};

export type ServiceEvent = {
  id: string;
  serviceId: string;
  timestamp: string;
  type: "online" | "offline" | "degraded" | "maintenance" | "error" | "restart";
  message: string;
};

export type ServiceMetrics = {
  uptime: string;
  latency: string;
  errorRate: string;
};

export type ServicesListProps = {
  services: Service[];
};

export interface NavbarProps {
  logo?: {
    url: string;
    src: string;
    alt: string;
    title: string;
  };
  user?: {
    name: string;
    avatarUrl?: string;
  };
}

export type ServiceCardProps = {
  title: string;
  status: "Online" | "Offline" | "Degraded";
  type: string;
  id: string;
  description: string;
};

export type ServiceEventType = ServiceEvent['type'];
