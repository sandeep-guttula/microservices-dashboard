import { z } from "zod";
import { SERVICE_TYPES, SERVICE_STATUSES } from "@/lib/constants";

const serviceTypes = SERVICE_TYPES.filter((type) => type !== "all");
const serviceStatuses = SERVICE_STATUSES.filter((status) => status !== "all");

export const serviceSchema = z.object({
  name: z.string().min(1, "Service name is required"),
  type: z.enum(serviceTypes as [string, ...string[]]),
  status: z.enum(serviceStatuses as [string, ...string[]]),
  lastCheck: z.string().optional(),
});

export type ServiceFormValues = z.infer<typeof serviceSchema>;
