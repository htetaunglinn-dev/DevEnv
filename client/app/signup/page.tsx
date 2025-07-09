"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/contexts/AuthContext";
import { signupSchema, type SignupFormData } from "@/lib/validations/auth";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  UserPlus,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import LoadingScreen from "@/components/loading/LoadingScreen";

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const { signup, loading, isAuthenticated } = useAuth();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, touchedFields },
    reset,
    watch,
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    mode: "onBlur", // Validate on blur for better UX
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  // Watch password for real-time strength indicator
  const password = watch("password");
  const confirmPassword = watch("confirmPassword");

  // Watch for form changes to clear submit error
  const watchedFields = watch();
  useEffect(() => {
    if (submitError) {
      setSubmitError(null);
    }
  }, [
    watchedFields.firstName,
    watchedFields.lastName,
    watchedFields.email,
    watchedFields.password,
    submitError,
  ]);

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, router]);

  const onSubmit = async (data: SignupFormData) => {
    setSubmitError(null);

    try {
      // Remove confirmPassword before sending to API
      const { confirmPassword, ...signupData } = data;
      await signup(signupData);
      reset(); // Clear form
      // Don't redirect immediately, let the useEffect handle it
    } catch (error: any) {
      setSubmitError(error.message || "Registration failed. Please try again.");
    }
  };

  // Password strength checker
  const getPasswordStrength = (password: string) => {
    let score = 0;
    const checks = {
      length: password.length >= 6,
      lowercase: /[a-z]/.test(password),
      uppercase: /[A-Z]/.test(password),
      number: /\d/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    };

    score = Object.values(checks).filter(Boolean).length;

    return {
      score,
      checks,
      strength: score < 2 ? "weak" : score < 4 ? "medium" : "strong",
    };
  };

  const passwordStrength = password ? getPasswordStrength(password) : null;

  // Show loading state during initial auth check
  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 px-4 py-8">
      <div className="w-full max-w-md space-y-8">
        <div className="rounded-2xl bg-white dark:bg-gray-800 p-8 shadow-xl dark:shadow-2xl">
          {/* Header */}
          <div className="text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600">
              <UserPlus className="h-6 w-6 text-white" />
            </div>
            <h2 className="mt-6 text-3xl font-bold text-gray-900 dark:text-white">
              Create account
            </h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-medium text-blue-600 transition-colors hover:text-blue-500"
              >
                Sign in
              </Link>
            </p>
          </div>

          {/* Form */}
          <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
            {/* Submit Error */}
            {submitError && (
              <div className="flex items-center rounded-lg border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/50 px-4 py-3 text-sm text-red-700 dark:text-red-300">
                <AlertCircle className="mr-2 h-4 w-4 flex-shrink-0" />
                {submitError}
              </div>
            )}

            <div className="space-y-4">
              {/* First Name Field */}
              <div>
                <label
                  htmlFor="firstName"
                  className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  First name
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <User className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                  </div>
                  <input
                    {...register("firstName")}
                    id="firstName"
                    type="text"
                    autoComplete="given-name"
                    className={`block w-full rounded-lg border py-3 pl-10 pr-3 transition-colors focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 ${
                      errors.firstName
                        ? "border-red-300 dark:border-red-600 focus:ring-red-500"
                        : touchedFields.firstName && !errors.firstName
                          ? "border-green-300 dark:border-green-600 focus:ring-blue-500"
                          : "border-gray-300 dark:border-gray-600"
                    }`}
                    placeholder="Enter your first name"
                    disabled={isSubmitting}
                  />
                  {touchedFields.firstName && !errors.firstName && (
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    </div>
                  )}
                </div>
                {errors.firstName && (
                  <p className="mt-1 flex items-center text-sm text-red-600 dark:text-red-400">
                    <AlertCircle className="mr-1 h-4 w-4" />
                    {errors.firstName.message}
                  </p>
                )}
              </div>

              {/* Last Name Field */}
              <div>
                <label
                  htmlFor="lastName"
                  className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Last name
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <User className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                  </div>
                  <input
                    {...register("lastName")}
                    id="lastName"
                    type="text"
                    autoComplete="family-name"
                    className={`block w-full rounded-lg border py-3 pl-10 pr-3 transition-colors focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 ${
                      errors.lastName
                        ? "border-red-300 dark:border-red-600 focus:ring-red-500"
                        : touchedFields.lastName && !errors.lastName
                          ? "border-green-300 dark:border-green-600 focus:ring-blue-500"
                          : "border-gray-300 dark:border-gray-600"
                    }`}
                    placeholder="Enter your last name"
                    disabled={isSubmitting}
                  />
                  {touchedFields.lastName && !errors.lastName && (
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    </div>
                  )}
                </div>
                {errors.lastName && (
                  <p className="mt-1 flex items-center text-sm text-red-600 dark:text-red-400">
                    <AlertCircle className="mr-1 h-4 w-4" />
                    {errors.lastName.message}
                  </p>
                )}
              </div>

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
                        ? "border-red-300 dark:border-red-600 focus:ring-red-500"
                        : touchedFields.email && !errors.email
                          ? "border-green-300 dark:border-green-600 focus:ring-blue-500"
                          : "border-gray-300 dark:border-gray-600"
                    }`}
                    placeholder="Enter your email"
                    disabled={isSubmitting}
                  />
                  {touchedFields.email && !errors.email && (
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    </div>
                  )}
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
                    autoComplete="new-password"
                    className={`block w-full rounded-lg border py-3 pl-10 pr-10 transition-colors focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 ${
                      errors.password
                        ? "border-red-300 dark:border-red-600 focus:ring-red-500"
                        : "border-gray-300 dark:border-gray-600"
                    }`}
                    placeholder="Create a password"
                    disabled={isSubmitting}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 flex items-center pr-3"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isSubmitting}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400 dark:text-gray-500 transition-colors hover:text-gray-600 dark:hover:text-gray-300" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400 dark:text-gray-500 transition-colors hover:text-gray-600 dark:hover:text-gray-300" />
                    )}
                  </button>
                </div>

                {/* Password Strength Indicator */}
                {password && passwordStrength && (
                  <div className="mt-2">
                    <div className="mb-2 flex items-center space-x-2">
                      <div className="h-2 flex-1 rounded-full bg-gray-200">
                        <div
                          className={`h-2 rounded-full transition-all duration-300 ${
                            passwordStrength.strength === "weak"
                              ? "w-1/3 bg-red-500"
                              : passwordStrength.strength === "medium"
                                ? "w-2/3 bg-yellow-500"
                                : "w-full bg-green-500"
                          }`}
                        />
                      </div>
                      <span
                        className={`text-xs font-medium ${
                          passwordStrength.strength === "weak"
                            ? "text-red-600"
                            : passwordStrength.strength === "medium"
                              ? "text-yellow-600"
                              : "text-green-600"
                        }`}
                      >
                        {passwordStrength.strength.charAt(0).toUpperCase() +
                          passwordStrength.strength.slice(1)}
                      </span>
                    </div>
                    <div className="space-y-1 text-xs text-gray-600">
                      <div
                        className={`flex items-center ${passwordStrength.checks.length ? "text-green-600" : "text-gray-500"}`}
                      >
                        {passwordStrength.checks.length ? "✓" : "○"} At least 6
                        characters
                      </div>
                      <div
                        className={`flex items-center ${passwordStrength.checks.uppercase ? "text-green-600" : "text-gray-500"}`}
                      >
                        {passwordStrength.checks.uppercase ? "✓" : "○"} One
                        uppercase letter
                      </div>
                      <div
                        className={`flex items-center ${passwordStrength.checks.lowercase ? "text-green-600" : "text-gray-500"}`}
                      >
                        {passwordStrength.checks.lowercase ? "✓" : "○"} One
                        lowercase letter
                      </div>
                      <div
                        className={`flex items-center ${passwordStrength.checks.number ? "text-green-600" : "text-gray-500"}`}
                      >
                        {passwordStrength.checks.number ? "✓" : "○"} One number
                      </div>
                    </div>
                  </div>
                )}

                {errors.password && (
                  <p className="mt-1 flex items-center text-sm text-red-600 dark:text-red-400">
                    <AlertCircle className="mr-1 h-4 w-4" />
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Confirm Password Field */}
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Confirm password
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <Lock className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                  </div>
                  <input
                    {...register("confirmPassword")}
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    autoComplete="new-password"
                    className={`block w-full rounded-lg border py-3 pl-10 pr-10 transition-colors focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 ${
                      errors.confirmPassword
                        ? "border-red-300 dark:border-red-600 focus:ring-red-500"
                        : touchedFields.confirmPassword &&
                            !errors.confirmPassword &&
                            confirmPassword
                          ? "border-green-300 dark:border-green-600 focus:ring-blue-500"
                          : "border-gray-300 dark:border-gray-600"
                    }`}
                    placeholder="Confirm your password"
                    disabled={isSubmitting}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 flex items-center pr-3"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    disabled={isSubmitting}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400 dark:text-gray-500 transition-colors hover:text-gray-600 dark:hover:text-gray-300" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400 dark:text-gray-500 transition-colors hover:text-gray-600 dark:hover:text-gray-300" />
                    )}
                  </button>
                  {touchedFields.confirmPassword &&
                    !errors.confirmPassword &&
                    confirmPassword && (
                      <div className="absolute inset-y-0 right-8 flex items-center pr-3">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      </div>
                    )}
                </div>
                {errors.confirmPassword && (
                  <p className="mt-1 flex items-center text-sm text-red-600 dark:text-red-400">
                    <AlertCircle className="mr-1 h-4 w-4" />
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>
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
                  Creating account...
                </div>
              ) : (
                "Create account"
              )}
            </button>

            {/* Terms */}
            <p className="text-center text-xs text-gray-600 dark:text-gray-300">
              By creating an account, you agree to our{" "}
              <Link
                href="/terms"
                className="text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy"
                className="text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300"
              >
                Privacy Policy
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
