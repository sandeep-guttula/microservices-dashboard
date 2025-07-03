export type Service = {
  name: string;
  id: string;
  type: "API" | "Database" | "Queue";
  status: "Online" | "Degraded" | "Offline";
  version?: string;
  description?: string;
  lastCheck: string;
};

export type ServiceStatus = "Online" | "Degraded" | "Offline";

export type ServiceEvent = {
  id: string;
  serviceId: string;
  timestamp: string;
  type: string;
  message: string;
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
