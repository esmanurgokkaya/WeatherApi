// zod ile validate et
import z from "zod";
import { de } from "zod/locales";
// register data zod
const registerSchema = z.object({
  name: z.string().min(2),
  lastName: z.string().min(2),
  email: z.string().email().min(5).max(100),
  password: z.string()
    .min(6)
    .regex(/[A-Z]/, "Must contain at least 1 uppercase letter")
    .regex(/[a-z]/, "Must contain at least 1 lowercase letter")
    .regex(/[0-9]/, "Must contain at least 1 number")
    .regex(/[!@#$%^&*]/, "Must contain at least 1 special character"),
});

export default {
    registerSchema,
}