import { z } from "zod";

export const createTaskSchema = z.object({
  title: z.string({
    required_error: "Title is required",
  }),
  description: z.string({
    required_error: "Description must be a string",
  }),
  date: z.string().datetime().optional(),
  status: z.string().optional(),
  priority: z.string({
    required_error: "Priority is required",
  }).optional(),
  img: z.string().optional().refine((val) => {
    return val === "" || /^data:image\/[a-zA-Z]+;base64,/.test(val);
  }, {
    message: "Image must be in base64 format",
  })
});
