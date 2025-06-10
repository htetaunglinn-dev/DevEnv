import { RegisterRequest, LoginRequest, CreateAdminRequest } from "../types";

export const validateRegisterInput = (
  input: RegisterRequest
): string | null => {
  const { name, email, password } = input;

  if (!name || !email || !password) {
    return "All fields are required";
  }

  if (name.length < 2 || name.length > 50) {
    return "Name must be between 2 and 50 characters";
  }

  const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  if (!emailRegex.test(email)) {
    return "Please enter a valid email address";
  }

  if (password.length < 6) {
    return "Password must be at least 6 characters";
  }

  return null;
};

export const validateLoginInput = (input: LoginRequest): string | null => {
  const { email, password } = input;

  if (!email || !password) {
    return "Email and password are required";
  }

  return null;
};

export const validateCreateAdminInput = (
  input: CreateAdminRequest
): string | null => {
  return validateRegisterInput(input);
};
