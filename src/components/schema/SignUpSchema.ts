import { z } from "zod";

export const SignUpFormSchema = z.object({
    companyName: z.string().min(2, 'Company name must be at least 2 characters'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters long'),
    confirmPassword: z.string().min(8, 'Password must be at least 8 characters long'),
    serviceState: z.string().min(1, 'Please select a state'),
    cities: z.string().min(1, 'Please enter at least one city'),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});
