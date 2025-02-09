import { z } from "zod";

export const registerSchema = z.object({
  firstname: z.string({
    required_error: "First name is required",
  }),
  lastname: z.string({
    required_error: "Last name is required",
  }),
  username: z.string({
    required_error: "Username is required",
  }),
  email: z
    .string({
      required_error: "Email is required",
    })
    .email({
      message: "El correo ta mal desgraciao",
    }),
  password: z
    .string({
      required_error: "Password is required",
    })
    .min(8, {
      message: "Password must be more than 8 characters",
    }),
  img: z.string().optional(),
});
export const loginSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
    })
    .email({
      message: "El correo no es valido",
    }),
  password: z
    .string({
      required_error: "password is required",
    })
    .min(6, {
      message: "Password must be more than 6",
    }),
});

export const profileSchema = z.object({
  firstname: z.string({
    required_error: "First name is required",
  }),
  lastname: z.string({
    required_error: "Last name is required",
  }),
  username: z.string({
    required_error: "Username is required",
  }),
  email: z
    .string({
      required_error: "Email is required",
    })
    .email({
      message: "El correo ta mal desgraciao",
    }),
  password: z
    .string({
      required_error: "Password is required",
    })
    .min(8, {
      message: "Password must be more than 8 characters",
    })
    .optional(),
});
