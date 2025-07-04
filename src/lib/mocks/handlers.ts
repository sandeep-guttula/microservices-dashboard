import { http, HttpResponse } from "msw";
import { Service, ServiceEvent } from "@/types/types";

const services: Service[] = [
  {
    id: "1",
    name: "Auth Service",
    type: "API",
    status: "Online",
    version: "1.0.0",
    description: "Handles user authentication",
    lastCheck: "2025-07-01T12:00:00Z",
  },
  {
    id: "2",
    name: "Payment Service",
    type: "API",
    status: "Offline",
    version: "1.2.0",
    description: "Processes payments",
    lastCheck: "2025-07-01T11:45:00Z",
  },
  {
    id: "3",
    name: "Email Service",
    type: "API",
    status: "Online",
    version: "0.8.0",
    description: "Sends emails",
    lastCheck: "2025-07-01T11:50:00Z",
  },
  {
    id: "4",
    name: "User DB",
    type: "Database",
    status: "Online",
    version: "12.4",
    description: "Stores user records",
    lastCheck: "2025-07-01T11:55:00Z",
  },
  {
    id: "5",
    name: "Notification Queue",
    type: "Queue",
    status: "Degraded",
    version: "2.1.1",
    description: "Handles push notifications",
    lastCheck: "2025-07-01T12:01:00Z",
  },
  {
    id: "6",
    name: "Analytics Service",
    type: "API",
    status: "Online",
    version: "3.0.0",
    description: "Aggregates user behavior data",
    lastCheck: "2025-07-01T12:02:00Z",
  },
  {
    id: "7",
    name: "Product DB",
    type: "Database",
    status: "Offline",
    version: "10.5",
    description: "Stores product catalog",
    lastCheck: "2025-07-01T11:43:00Z",
  },
  {
    id: "8",
    name: "Cart Service",
    type: "API",
    status: "Degraded",
    version: "1.1.0",
    description: "Manages shopping carts",
    lastCheck: "2025-07-01T11:59:00Z",
  },
  {
    id: "9",
    name: "Order Service",
    type: "API",
    status: "Online",
    version: "1.3.2",
    description: "Handles order processing",
    lastCheck: "2025-07-01T12:04:00Z",
  },
  {
    id: "10",
    name: "Search Service",
    type: "API",
    status: "Offline",
    version: "2.0.0",
    description: "Provides search capability",
    lastCheck: "2025-07-01T11:41:00Z",
  },
  {
    id: "11",
    name: "Inventory DB",
    type: "Database",
    status: "Online",
    version: "13.2",
    description: "Tracks stock levels",
    lastCheck: "2025-07-01T12:03:00Z",
  },
  {
    id: "12",
    name: "Shipping Service",
    type: "API",
    status: "Online",
    version: "2.2.1",
    description: "Manages shipping operations",
    lastCheck: "2025-07-01T12:06:00Z",
  },
  {
    id: "13",
    name: "Support Ticket Queue",
    type: "Queue",
    status: "Degraded",
    version: "1.0.3",
    description: "Processes support tickets",
    lastCheck: "2025-07-01T12:07:00Z",
  },
  {
    id: "14",
    name: "Billing Service",
    type: "API",
    status: "Online",
    version: "1.5.0",
    description: "Manages billing and invoicing",
    lastCheck: "2025-07-01T12:05:00Z",
  },
  {
    id: "15",
    name: "Session Store",
    type: "Database",
    status: "Offline",
    version: "11.1",
    description: "Stores active sessions",
    lastCheck: "2025-07-01T11:39:00Z",
  },
  {
    id: "16",
    name: "Feedback Service",
    type: "API",
    status: "Online",
    version: "0.9.0",
    description: "Collects user feedback",
    lastCheck: "2025-07-01T12:08:00Z",
  },
  {
    id: "17",
    name: "Queue Monitor",
    type: "Queue",
    status: "Online",
    version: "3.3.3",
    description: "Monitors message queues",
    lastCheck: "2025-07-01T12:09:00Z",
  },
  {
    id: "18",
    name: "Recommendation Service",
    type: "API",
    status: "Degraded",
    version: "1.8.4",
    description: "Generates product recommendations",
    lastCheck: "2025-07-01T12:10:00Z",
  },
  {
    id: "19",
    name: "Logging DB",
    type: "Database",
    status: "Online",
    version: "14.0",
    description: "Stores application logs",
    lastCheck: "2025-07-01T12:11:00Z",
  },
  {
    id: "20",
    name: "Upload Service",
    type: "API",
    status: "Offline",
    version: "2.0.1",
    description: "Manages file uploads",
    lastCheck: "2025-07-01T11:30:00Z",
  },
];

const serviceEvents: { [key: string]: ServiceEvent[] } = {
  "1": [
    {
      id: "1",
      serviceId: "1",
      timestamp: "2025-07-01T11:30:00Z",
      type: "online",
      message: "Auth Service started",
    },
    {
      id: "2",
      serviceId: "1",
      timestamp: "2025-07-01T11:45:00Z",
      type: "offline",
      message: "Auth Service stopped",
    },
  ],
  "2": [
    {
      id: "3",
      serviceId: "2",
      timestamp: "2025-07-01T11:00:00Z",
      type: "online",
      message: "Payment Service started",
    },
    {
      id: "4",
      serviceId: "2",
      timestamp: "2025-07-01T11:20:00Z",
      type: "offline",
      message: "Payment gateway timeout",
    },
  ],
  "3": [
    {
      id: "5",
      serviceId: "3",
      timestamp: "2025-07-01T11:10:00Z",
      type: "restart",
      message: "Email Service restarted after crash",
    },
  ],
  "4": [
    {
      id: "6",
      serviceId: "4",
      timestamp: "2025-07-01T10:50:00Z",
      type: "online",
      message: "User DB initialized",
    },
  ],
  "5": [
    {
      id: "7",
      serviceId: "5",
      timestamp: "2025-07-01T10:45:00Z",
      type: "degraded",
      message: "Notification Queue latency increased",
    },
  ],
  "6": [
    {
      id: "8",
      serviceId: "6",
      timestamp: "2025-07-01T11:25:00Z",
      type: "online",
      message: "Analytics Service is up",
    },
  ],
  "7": [
    {
      id: "9",
      serviceId: "7",
      timestamp: "2025-07-01T11:15:00Z",
      type: "offline",
      message: "Product DB went down",
    },
  ],
  "8": [
    {
      id: "10",
      serviceId: "8",
      timestamp: "2025-07-01T11:40:00Z",
      type: "degraded",
      message: "Cart Service memory spike detected",
    },
  ],
  "9": [
    {
      id: "11",
      serviceId: "9",
      timestamp: "2025-07-01T12:00:00Z",
      type: "online",
      message: "Order Service deployed",
    },
  ],
  "10": [
    {
      id: "12",
      serviceId: "10",
      timestamp: "2025-07-01T11:10:00Z",
      type: "offline",
      message: "Search index error occurred",
    },
  ],
  "11": [
    {
      id: "13",
      serviceId: "11",
      timestamp: "2025-07-01T12:00:00Z",
      type: "online",
      message: "Inventory DB synced",
    },
  ],
  "12": [
    {
      id: "14",
      serviceId: "12",
      timestamp: "2025-07-01T12:01:00Z",
      type: "offline",
      message: "Shipping Service activated",
    },
  ],
  "13": [
    {
      id: "15",
      serviceId: "13",
      timestamp: "2025-07-01T11:50:00Z",
      type: "degraded",
      message: "Support Ticket Queue delay reported",
    },
  ],
  "14": [
    {
      id: "16",
      serviceId: "14",
      timestamp: "2025-07-01T11:55:00Z",
      type: "online",
      message: "Billing Service up and running",
    },
  ],
  "15": [
    {
      id: "17",
      serviceId: "15",
      timestamp: "2025-07-01T11:20:00Z",
      type: "offline",
      message: "Session Store crash detected",
    },
  ],
  "16": [
    {
      id: "18",
      serviceId: "16",
      timestamp: "2025-07-01T12:05:00Z",
      type: "online",
      message: "Feedback Service launched",
    },
  ],
  "17": [
    {
      id: "19",
      serviceId: "17",
      timestamp: "2025-07-01T11:59:00Z",
      type: "online",
      message: "Queue Monitor up",
    },
  ],
  "18": [
    {
      id: "20",
      serviceId: "18",
      timestamp: "2025-07-01T11:35:00Z",
      type: "online",
      message: "Recommendation Service returned stale data",
    },
  ],
  "19": [
    {
      id: "21",
      serviceId: "19",
      timestamp: "2025-07-01T12:10:00Z",
      type: "online",
      message: "Logging DB active",
    },
  ],
  "20": [
    {
      id: "22",
      serviceId: "20",
      timestamp: "2025-07-01T11:00:00Z",
      type: "online",
      message: "Upload Service disconnected",
    },
  ],
};

const simulateStatusChanges = () => {
  setInterval(() => {
    const randomIndex = Math.floor(Math.random() * services.length);
    const service = services[randomIndex];
    const oldStatus = service.status;

    const statuses = ["Online", "Offline", "Degraded", "Restart"];
    const newStatus = statuses[Math.floor(Math.random() * statuses.length)];

    if (oldStatus !== newStatus) {
      service.status = newStatus;

      let eventType: ServiceEvent["type"];
      let message: string;

      switch (newStatus) {
        case "Online":
          eventType = "online";
          message = `${service.name} is now Online.`;
          break;
        case "Offline":
          eventType = "offline";
          message = `${service.name} went Offline.`;
          break;
        case "Degraded":
          eventType = "degraded";
          message = `${service.name} is now Degraded.`;
          break;
        case "Restart":
          eventType = "restart";
          message = `${service.name} is restarting.`;
          break;
        default:
          eventType = "error";
          message = `${service.name} status changed to unknown.`;
      }

      const event: ServiceEvent = {
        id: Math.random().toString(36).substring(2),
        serviceId: service.id,
        timestamp: new Date().toISOString(),
        type: eventType,
        message: message,
      };

      if (!serviceEvents[service.id]) {
        serviceEvents[service.id] = [];
      }
      serviceEvents[service.id].unshift(event); // Add to the beginning to show newest first
    }
  }, 5000); // Simulate status changes every 5 seconds
};

const delay = async () => {
  const ms = 300 + Math.random() * 700;
  return new Promise((res) => setTimeout(res, ms));
};

const randomFail = () => Math.random() < 0.05;

simulateStatusChanges();

export const handlers = [
  // GET /api/services?status=Online&name_like=User&page=1&limit=10
  http.get("/api/services", async ({ request }) => {
    await delay();
    if (randomFail()) return new HttpResponse(null, { status: 500 });

    const url = new URL(request.url);
    const status = url.searchParams.get("status");
    const nameLike = url.searchParams.get("name_like");
    const page = parseInt(url.searchParams.get("page") || "1", 10);
    const limit = parseInt(url.searchParams.get("limit") || "10", 10);

    let result = [...services];

    if (status) {
      result = result.filter((s) => s.status === status);
    }

    if (nameLike) {
      result = result.filter((s) =>
        s.name.toLowerCase().includes(nameLike.toLowerCase())
      );
    }

    const start = (page - 1) * limit;
    const paginated = result.slice(start, start + limit);

    return HttpResponse.json(paginated);
  }),

  http.get("/api/services/:id", async ({ params }) => {
    await delay();
    if (randomFail()) return new HttpResponse(null, { status: 500 });

    const service = services.find((s) => s.id === params.id);
    return service
      ? HttpResponse.json(service)
      : new HttpResponse(null, { status: 404 });
  }),

  http.get("/api/services/:id/events", async ({ params, request }) => {
    await delay();
    if (randomFail()) return new HttpResponse(null, { status: 500 });

    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get("page") || "1", 10);
    const limit = parseInt(url.searchParams.get("limit") || "20", 10);

    const events = serviceEvents[params.id as string] || [];
    const start = (page - 1) * limit;
    const paginated = events.slice(start, start + limit);

    return HttpResponse.json(paginated);
  }),

  http.get("/api/services/:id/metrics", async ({ params }) => {
    await delay();
    if (randomFail()) return new HttpResponse(null, { status: 500 });

    const service = services.find((s) => s.id === params.id);
    if (!service) return new HttpResponse(null, { status: 404 });

    const metrics = {
      uptime: service.status === "Online" ? "99.9%" : "0%",
      latency: `${Math.floor(Math.random() * 100) + 20}ms`,
      errorRate: `${(Math.random() * 0.5).toFixed(2)}%`,
    };

    return HttpResponse.json(metrics);
  }),

  http.post("/api/services", async ({ request }) => {
    await delay();
    if (randomFail()) return new HttpResponse(null, { status: 500 });

    const data = (await request.json()) as Partial<Service>;
    if (!data.name || !data.type) {
      return new HttpResponse(null, { status: 400 });
    }
    const id = (services.length + 1).toString();

    const newService: Service = {
      id,
      name: data.name,
      type: data.type,
      status: "Online",
      version: "1.0.0",
      description: "Newly created service",
      lastCheck: new Date().toISOString(),
    };

    services.push(newService);
    return HttpResponse.json(newService, { status: 201 });
  }),

  http.put("/api/services/:id", async ({ params, request }) => {
    await delay();
    if (randomFail()) return new HttpResponse(null, { status: 500 });

    const updatedData = (await request.json()) as Partial<Service>;
    const index = services.findIndex((s) => s.id === params.id);

    if (index !== -1) {
      services[index] = { ...services[index], ...updatedData };
      return HttpResponse.json(services[index]);
    }

    return new HttpResponse(null, { status: 404 });
  }),

  http.delete("/api/services/:id", async ({ params }) => {
    await delay();
    if (randomFail()) return new HttpResponse(null, { status: 500 });

    const index = services.findIndex((s) => s.id === params.id);
    if (index !== -1) {
      services.splice(index, 1);
      return new HttpResponse(null, { status: 204 });
    }

    return new HttpResponse(null, { status: 404 });
  }),
];
