import { z } from "zod";
import { SERVICE_TYPES, SERVICE_STATUSES } from "@/lib/constants";

const serviceTypes = SERVICE_TYPES.filter((type) => type !== "all") as [string, ...string[]];
const serviceStatuses = SERVICE_STATUSES.filter((status) => status !== "all") as [string, ...string[]];

export const serviceSchema = z.object({
  name: z.string().min(1, "Service name is required"),
  type: z.enum(serviceTypes),
  status: z.enum(serviceStatuses),
  lastCheck: z.string().optional(),
});

export type ServiceFormValues = z.infer<typeof serviceSchema>;
