"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { User, Mail, Lock } from "lucide-react";
import { signUpSchema, TSignUpSchema } from "@/lib/type";
import GlobalAPI from "@/app/_utils/GlobalAPI";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TSignUpSchema>({
    resolver: zodResolver(signUpSchema),
  });

  const router = useRouter();

  const onSubmit = async (data: TSignUpSchema) => {
    try {
      await GlobalAPI.registerUser(
        data.username,
        data.email,
        data.password
      ).then((res) => {
        sessionStorage.setItem("user", JSON.stringify(res.data.user));
        sessionStorage.setItem("token", res.data.jwt);
        toast.success("Welcome! Your account has been created successfully.");
        router.push("/");
      });
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.error?.message ||
        "An error occurred while creating your account. Please try again.";
      toast.error(errorMessage);
    }
    reset();
  };

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      router.push("/");
    }
  }, []);

  return (
    <div className="flex items-baseline justify-center my-20 px-4">
      <div className="flex flex-col items-center justify-center p-6 sm:p-10 bg-slate-100 border border-gray-200 w-full max-w-md rounded-lg">
        <div className="text-3xl font-bold text-gray-800 pb-5">
          <Link href="/">MITRA KHAJA GHAR</Link>
        </div>
        <h1 className="text-xl font-semibold text-gray-900">
          Create an Account
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Enter your details below to create your account
        </p>
        <div className="w-full">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full flex flex-col gap-5 mt-7"
          >
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
              <Input
                className="pl-10 w-full"
                placeholder="Username"
                {...register("username")}
              />
              {errors.username && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.username.message}
                </p>
              )}
            </div>

            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
              <Input
                className="pl-10 w-full"
                placeholder="example@gmail.com"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
              <Input
                className="pl-10 w-full"
                placeholder="Password"
                type="password"
                autoComplete="cc-number"
                {...register("password")}
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
              <Input
                className="pl-10 w-full"
                placeholder="Confirm password"
                type="password"
                autoComplete="cc-number"
                {...register("confirmPassword")}
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            <Button
              className="w-full"
              aria-disabled={isSubmitting}
              type="submit"
            >
              Create an Account
            </Button>
          </form>
          <div className="text-center mt-4">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link
                href="/sign-in"
                className="font-medium hover:underline text-blue-500"
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
