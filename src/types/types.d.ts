export type Service = {
  name: string;
  id: string;
  type: "API" | "Database" | "Queue";
  status: "Online" | "Degraded" | "Offline";
  lastCheck: string;
};

type ServiceStatus = "Online" | "Degraded" | "Offline";

type Service = {
  name: string;
  id: string;
  type: "API" | "Database" | "Queue";
  status: ServiceStatus;
  lastCheck: string;
};

type ServicesListProps = {
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

type ServiceCardProps = {
  title: string;
  status: "Online" | "Offline" | "Degraded";
  type: string;
  id: string;
  description: string;
};