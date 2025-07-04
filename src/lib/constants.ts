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

export const SERVICE_TYPES_FOR_MODAL = SERVICE_TYPES.filter(
  (type) => type !== "all"
);
export const SERVICE_STATUSES_FOR_MODAL = SERVICE_STATUSES.filter(
  (status) => status !== "all"
);

