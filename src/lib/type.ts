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

export const signInSchema = z.object({
    email: z.string().email(),
    password: z.string().min(4,"Password must be at least 4 characters."),
});

export type TSignUpSchema = z.infer<typeof signUpSchema>
export type TSignInSchema = z.infer<typeof signInSchema>

export const billingSchema = z.object({
    name: z.string().min(2, { message: "Name must be at least 2 characters" }),
    email: z.string().email({ message: "Invalid email address" }),
    address: z
      .string()
      .min(5, { message: "Address must be at least 5 characters" }),
    phoneNo: z
      .string()
      .regex(/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/, {
        message: "Invalid phone number",
      }),
  });

 export type BillingDetails = z.infer<typeof billingSchema>;