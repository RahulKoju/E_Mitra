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

 export const productSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters" }),
  price: z.coerce
    .number()
    .min(0, { message: "Price must be a positive number" }),
  slug: z
    .string()
    .min(2, { message: "Slug must be at least 2 characters" })
    .regex(/^[a-z0-9-]+$/, {
      message: "Slug must be lowercase, numbers, or hyphens",
    }),
  categories: z.array(z.object({
    id: z.number(),
    documentId: z.string(),
    name: z.string(),
    slug: z.string(),
  })).optional().default([]),
  images: z.object({
    id: z.number(),
    url: z.string().optional(),
    documentId: z.string().optional(),
  }).optional(),
});

export type ProductFormInputs = z.infer<typeof productSchema>;

export type CartData = {
  data: {
    quantity: number;
    amount: number;
    products: string;
    users_permissions_user: number;
    userId: number;
  };
};

export type Category = {
  id: number;
  documentId: string;
  name: string;
  slug: string;
};

export type ProductImage = {
  id: number;
  documentId: string;
  url: string;
};

export type Product = {
  id: number;
  documentId: string;
  name: string;
  description: string;
  slug: string;
  price: number;
  images: ProductImage[];
  categories: Category[];
};

export type ProductPayload = {
  data: {
    name: string;
    price: number;
    description: string;
    categories: string[];
    images?: { id: number }[];
    slug: string;
  };
};

export type CartItemResponse = {
  id: number;
  documentId: string;
  quantity: number;
  amount: number;
  products: Product[];
};

export type CartItemViewModel = {
  name: string;
  quantity: number;
  amount: number;
  image: string;
  actualPrice: number;
  id: string;
  product: string;
};

export type OrderItem = {
  amount: number;
  quantity: number;
  product: string;
};

export type OrderPayload = {
  data: {
    username: string;
    email: string;
    address: string;
    phone_no: number;
    totalOrderAmount: number;
    userId: number;
    orderItemList: OrderItem[];
  };
};

export type OrderItemDetails = {
  id: number;
  quantity: number;
  amount: number;
  product: Product;
};

export type Order = {
  id: number;
  address: string;
  createdAt: string;
  documentId: string;
  email: string;
  orderItemList: OrderItemDetails[];
  phone_no: string;
  totalOrderAmount: number;
  userId: number;
  username: string;
  orderStatus: string;
};

export type MyOrder = {
  id: string;
  totalOrderAmount: number;
  createdAt: string;
  orderItemList: OrderItemDetails[];
  orderStatus: string;
};

export type MyOrderResponse = {
  documentId: string;
  totalOrderAmount: number;
  createdAt: string;
  orderItemList: OrderItemDetails[];
  orderStatus: string;
};