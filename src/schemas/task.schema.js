import { z } from "zod";

export const createTaskSchema = z.object({
  title: z.string({
    required_error: "Title is required",
  }),
  description: z.string({
    required_error: "Description must be a string",
  }),
  date: z.string().datetime().optional(),
  status: z.string({
      required_error: "Status is required",
  }).nonempty("Status cannot be empty"),
  priority: z.string({
      required_error: "Priority is required",
    })
    .nonempty("Priority cannot be empty"),
});
