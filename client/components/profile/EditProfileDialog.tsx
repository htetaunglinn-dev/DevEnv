"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { User, CheckCircle, AlertCircle, Edit } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { apiRequest } from "@/lib/api";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// Validation schema for edit profile
const editProfileSchema = z.object({
  firstName: z
    .string()
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name must be less than 50 characters")
    .regex(/^[A-Za-z\s]+$/, "First name can only contain letters and spaces"),
  lastName: z
    .string()
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name must be less than 50 characters")
    .regex(/^[A-Za-z\s]+$/, "Last name can only contain letters and spaces"),
});

type EditProfileFormData = z.infer<typeof editProfileSchema>;

interface EditProfileDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export default function EditProfileDialog({ isOpen, onClose, onSuccess }: EditProfileDialogProps) {
  const { user, refreshUser } = useAuth();
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, touchedFields },
    reset,
  } = useForm<EditProfileFormData>({
    resolver: zodResolver(editProfileSchema),
    mode: "onBlur",
    defaultValues: {
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
    },
  });

  const onSubmit = async (data: EditProfileFormData) => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      await apiRequest("/auth/profile", {
        method: "PUT",
        body: JSON.stringify(data),
      });

      // If we reach here, the request was successful
      // Refresh user data in AuthContext
      await refreshUser();
      
      // Close dialog immediately
      onClose();
      reset();
      
      // Trigger success callback (for toast)
      if (onSuccess) {
        onSuccess();
      }
      
    } catch (error: any) {
      setSubmitError(error.message || "An error occurred while updating profile");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      setSubmitError(null);
      reset();
      onClose();
    }
  };

  if (!user) return null;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Edit className="h-5 w-5" />
            Edit Profile
          </DialogTitle>
          <DialogDescription>
            Update your profile information. Only your name can be changed.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Submit Error */}
          {submitError && (
            <div className="flex items-center rounded-lg border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/50 px-4 py-3 text-sm text-red-700 dark:text-red-300">
              <AlertCircle className="mr-2 h-4 w-4 flex-shrink-0" />
              {submitError}
            </div>
          )}

          {/* First Name Field */}
          <div className="space-y-2">
            <Label htmlFor="firstName">First Name</Label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <User className="h-4 w-4 text-gray-400 dark:text-gray-500" />
              </div>
              <Input
                {...register("firstName")}
                id="firstName"
                type="text"
                placeholder="Enter your first name"
                className={`pl-10 ${
                  errors.firstName
                    ? "border-red-300 dark:border-red-600 focus:ring-red-500"
                    : touchedFields.firstName && !errors.firstName
                      ? "border-green-300 dark:border-green-600 focus:ring-blue-500"
                      : ""
                }`}
                disabled={isSubmitting}
              />
              {touchedFields.firstName && !errors.firstName && (
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                </div>
              )}
            </div>
            {errors.firstName && (
              <p className="flex items-center text-sm text-red-600 dark:text-red-400">
                <AlertCircle className="mr-1 h-4 w-4" />
                {errors.firstName.message}
              </p>
            )}
          </div>

          {/* Last Name Field */}
          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name</Label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <User className="h-4 w-4 text-gray-400 dark:text-gray-500" />
              </div>
              <Input
                {...register("lastName")}
                id="lastName"
                type="text"
                placeholder="Enter your last name"
                className={`pl-10 ${
                  errors.lastName
                    ? "border-red-300 dark:border-red-600 focus:ring-red-500"
                    : touchedFields.lastName && !errors.lastName
                      ? "border-green-300 dark:border-green-600 focus:ring-blue-500"
                      : ""
                }`}
                disabled={isSubmitting}
              />
              {touchedFields.lastName && !errors.lastName && (
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                </div>
              )}
            </div>
            {errors.lastName && (
              <p className="flex items-center text-sm text-red-600 dark:text-red-400">
                <AlertCircle className="mr-1 h-4 w-4" />
                {errors.lastName.message}
              </p>
            )}
          </div>

          {/* Email Field (Read-only) */}
          <div className="space-y-2">
            <Label htmlFor="email">Email (Cannot be changed)</Label>
            <Input
              id="email"
              type="email"
              value={user.email}
              disabled
              className="bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400"
            />
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting || !isValid}
              className="min-w-[100px]"
            >
              {isSubmitting ? (
                <div className="flex items-center">
                  <div className="mr-2 h-4 w-4 animate-spin rounded-full border-b-2 border-white"></div>
                  Saving...
                </div>
              ) : (
                "Save Changes"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}