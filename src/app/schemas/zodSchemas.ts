import { z } from "zod";

export const signUpSchema = z.object({
    name: z.string().min(1, "Name is required"),
    orgName: z.string().min(1, "Organization name is required"),
    email: z.string()
        .min(1, "Email is required")
        .email("Invalid email address"),
    password: z.string()
        .min(8, "Password must be at least 8 characters")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/[a-z]/, "Password must contain at least one lowercase letter")
        .regex(/[0-9]/, "Password must contain at least one number"),
    confirmPassword: z.string()
        .min(1, "Please confirm your password"),
    phone: z.string()
        .min(1, "Phone number is required")
        .regex(/^\+?[1-9]\d{1,14}$/, "Invalid phone number format")
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"]
});


export const loginWithPasswordSchema = z.object({
  email: z.string()
    .min(1, "Email is required")
    .email("Invalid email address"),
  password: z.string()
    .min(8, "Password must be at least 8 characters")
})

export const loginWithOTPSchema = z.object({
  email: z.string()
    .min(1, "Email is required")
    .email("Invalid email address"),
  otp: z.string()
    .length(6, "OTP must be 6 digits")
    .regex(/^\d+$/, "OTP must contain only numbers")
})