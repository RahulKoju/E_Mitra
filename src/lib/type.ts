import { z } from "zod";

export const signUpSchema = z.object({
    username: z.string().min(3,"Username must be at least 3 characters."),
    email: z.string().email(),
    password: z.string().min(4,"Password must be at least 4 characters."),
    confirmPassword:z.string(),
}).refine(data => data.password === data.confirmPassword,{
    message:"Password must match",
    path:["confirmPassword"],
});

export type TSignUpSchema = z.infer<typeof signUpSchema>