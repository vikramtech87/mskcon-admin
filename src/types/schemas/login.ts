import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string({ required_error: "Please provide an email address" })
    .email({ message: "Please provide a valid email address" }),
  password: z.string({ required_error: "Please provide a password" }),
});

export type LoginFormData = z.infer<typeof loginSchema>;
