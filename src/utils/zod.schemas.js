// Validate with zod
import z from "zod";
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

const loginSchema = z.object({
  email: z.string().email().min(5).max(100),
  password: z.string().min(6),
});

const updateUserSchema = z.object({
  name: z.string().min(2).optional(),
  lastName: z.string().min(2).optional(),
  email: z.string().email().min(5).max(100).optional(),
});

const updatePasswordSchema = z.object({
  oldPassword: z.string().min(6),
  newPassword: z.string()
    .min(6)
    .regex(/[A-Z]/, "Must contain at least 1 uppercase letter")
    .regex(/[a-z]/, "Must contain at least 1 lowercase letter")
    .regex(/[0-9]/, "Must contain at least 1 number")
    .regex(/[!@#$%^&*]/, "Must contain at least 1 special character"),
});

export default {
    registerSchema,
    loginSchema,
    updateUserSchema,
    updatePasswordSchema,
}