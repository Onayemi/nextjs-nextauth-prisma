import { z } from "zod";

//  Define a schema for input validation
export const userSchema = z.object({
  name: z.string().min(3, "Name is required").max(100),
  email: z.string().min(3, "Email is required").email("Invalid email"),
  password: z
    .string()
    .min(3, "Password is required")
    .min(8, "Password must be 8 characters"),
  //   confirmPassword: z.string().min(1, "Password confirmation is required"),
});
