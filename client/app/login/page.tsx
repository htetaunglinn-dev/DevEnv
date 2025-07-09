"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/contexts/AuthContext";
import { loginSchema, type LoginFormData } from "@/lib/validations/auth";
import { Eye, EyeOff, Mail, Lock, LogIn, AlertCircle } from "lucide-react";
import LoadingScreen from "@/components/loading/LoadingScreen";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const { login, loading, isAuthenticated } = useAuth();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Watch for form changes to clear submit error
  const watchedFields = watch();
  useEffect(() => {
    if (submitError) {
      setSubmitError(null);
    }
  }, [watchedFields.email, watchedFields.password, submitError]);

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, router]);

  const onSubmit = async (data: LoginFormData) => {
    setSubmitError(null);

    try {
      await login(data);
      reset(); // Clear form
      // Don't redirect immediately, let the useEffect handle it
    } catch (error: any) {
      setSubmitError(error.message || "Login failed. Please try again.");
    }
  };

  // Fill demo credentials
  const fillDemoCredentials = (type: "admin" | "user") => {
    if (type === "admin") {
      reset({
        email: "admin@devenv.com",
        password: "admin123456",
      });
    }
    // For user demo, you could add a test user or let them create one
  };

  // Show loading state during initial auth check
  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 px-4 dark:from-gray-900 dark:to-gray-800">
      <div className="w-full max-w-md space-y-8">
        <div className="rounded-2xl bg-white p-8 shadow-xl dark:bg-gray-800 dark:shadow-2xl">
          {/* Header */}
          <div className="text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600">
              <LogIn className="h-6 w-6 text-white" />
            </div>
            <h2 className="mt-6 text-3xl font-bold text-gray-900 dark:text-white">
              Welcome back
            </h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
              Don`t have an account?{" "}
              <Link
                href="/signup"
                className="font-medium text-blue-600 transition-colors hover:text-blue-500"
              >
                Sign up
              </Link>
            </p>
          </div>

          {/* Form */}
          <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
            {/* Submit Error */}
            {submitError && (
              <div className="flex items-center rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-800 dark:bg-red-900/50 dark:text-red-300">
                <AlertCircle className="mr-2 h-4 w-4 flex-shrink-0" />
                {submitError}
              </div>
            )}

            <div className="space-y-4">
              {/* Email Field */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Email address
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <Mail className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                  </div>
                  <input
                    {...register("email")}
                    id="email"
                    type="email"
                    autoComplete="email"
                    className={`block w-full rounded-lg border py-3 pl-10 pr-3 transition-colors focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 ${
                      errors.email
                        ? "border-red-300 focus:ring-red-500 dark:border-red-600"
                        : "border-gray-300 dark:border-gray-600"
                    }`}
                    placeholder="Enter your email"
                    disabled={isSubmitting}
                  />
                </div>
                {errors.email && (
                  <p className="mt-1 flex items-center text-sm text-red-600 dark:text-red-400">
                    <AlertCircle className="mr-1 h-4 w-4" />
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password Field */}
              <div>
                <label
                  htmlFor="password"
                  className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Password
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <Lock className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                  </div>
                  <input
                    {...register("password")}
                    id="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    className={`block w-full rounded-lg border py-3 pl-10 pr-10 transition-colors focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 ${
                      errors.password
                        ? "border-red-300 focus:ring-red-500 dark:border-red-600"
                        : "border-gray-300 dark:border-gray-600"
                    }`}
                    placeholder="Enter your password"
                    disabled={isSubmitting}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 flex items-center pr-3"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isSubmitting}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400 transition-colors hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400 transition-colors hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-1 flex items-center text-sm text-red-600 dark:text-red-400">
                    <AlertCircle className="mr-1 h-4 w-4" />
                    {errors.password.message}
                  </p>
                )}
              </div>
            </div>

            {/* Forgot Password Link */}
            <div className="flex items-center justify-end">
              <Link
                href="/forgot-password"
                className="text-sm text-blue-600 transition-colors hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
              >
                Forgot your password?
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="group relative flex w-full justify-center rounded-lg border border-transparent bg-blue-600 px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSubmitting ? (
                <div className="flex items-center">
                  <div className="mr-2 h-4 w-4 animate-spin rounded-full border-b-2 border-white"></div>
                  Signing in...
                </div>
              ) : (
                "Sign in"
              )}
            </button>

            {/* Demo Credentials */}
            <div className="mt-6 rounded-lg border bg-gray-50 p-4 dark:border-gray-600 dark:bg-gray-700">
              <h3 className="mb-3 text-sm font-medium text-gray-700 dark:text-gray-300">
                Demo Credentials:
              </h3>
              <div className="space-y-2">
                <button
                  type="button"
                  onClick={() => fillDemoCredentials("admin")}
                  className="w-full rounded-md border border-purple-200 bg-purple-50 px-3 py-2 text-left text-xs transition-colors hover:bg-purple-100 dark:border-purple-700 dark:bg-purple-900/30 dark:hover:bg-purple-900/50"
                  disabled={isSubmitting}
                >
                  <div className="font-medium text-purple-800 dark:text-purple-300">
                    Admin Account
                  </div>
                  <div className="text-purple-600 dark:text-purple-400">
                    admin@devenv.com / admin123456
                  </div>
                </button>
                <div className="rounded-md bg-gray-100 px-3 py-2 text-xs text-gray-600 dark:bg-gray-600 dark:text-gray-300">
                  <div className="font-medium text-gray-700 dark:text-gray-200">
                    User Account
                  </div>
                  <div>Create a new account via signup →</div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
