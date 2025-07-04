import { z } from "zod";

export const serviceSchema = z.object({
  name: z.string().min(1, "Service name is required"),
  type: z.union([z.literal("API"), z.literal("Database"), z.literal("Queue")]),
  status: z.union([z.literal("Online"), z.literal("Degraded"), z.literal("Offline")]),
  lastCheck: z.string().optional(),
});

export type ServiceFormValues = z.infer<typeof serviceSchema>;
