export const STATUS = {
  ONLINE: "Online",
  OFFLINE: "Offline",
  DEGRADED: "Degraded",
  RESTART: "Restart",
};

export const SERVICE_TYPES = [
  "all",
  "API",
  "Database",
  "Queue",
  "Cache",
  "Gateway",
  "Other",
];

export const SERVICE_STATUSES = [
  "all",
  STATUS.ONLINE,
  STATUS.OFFLINE,
  STATUS.DEGRADED,
  STATUS.RESTART,
];
