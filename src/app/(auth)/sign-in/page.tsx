"use client";
import GlobalAPI from "@/app/_utils/GlobalAPI";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signInSchema, TSignInSchema } from "@/lib/type";
import { zodResolver } from "@hookform/resolvers/zod";
import { Lock, Mail } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TSignInSchema>({
    resolver: zodResolver(signInSchema),
  });

  const router = useRouter();

  const onSubmit = async (data: TSignInSchema) => {
    try {
      await GlobalAPI.loginUser(data.email, data.password).then((res) => {
        sessionStorage.setItem("user", JSON.stringify(res.data.user));
        sessionStorage.setItem("token", res.data.jwt);
        toast.success("Successfully signed in!");
        router.push("/");
      });
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.error?.message ||
        "An error occurred while signing in to your account. Please try again.";
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
          Sign In To Your Account
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Enter your email and password to access your account
        </p>
        <div className="w-full">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full flex flex-col gap-5 mt-7"
          >
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

            <Button
              className="w-full"
              aria-disabled={isSubmitting}
              type="submit"
            >
              Sign In
            </Button>
          </form>
          <div className="text-center mt-4">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <Link
                href="/sign-up"
                className="font-medium hover:underline text-blue-500"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
