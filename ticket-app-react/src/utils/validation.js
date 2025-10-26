import { z } from "zod";

export const ticketSchema = z.object({
  title: z.string().min(3, "Title is required").max(120),
  status: z.enum(["open", "in_progress", "closed"], "Invalid status"),
  description: z.string().max(1000).optional(),
  priority: z.number().min(1).max(5).optional(),
});
