import { ReactNode, InputHTMLAttributes, forwardRef } from "react";
import { CheckCircle } from "lucide-react";

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  hasError?: boolean;
  showSuccess?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

export const InputField = forwardRef<HTMLInputElement, InputFieldProps>(({
  hasError,
  showSuccess,
  leftIcon,
  rightIcon,
  className = "",
  ...props
}, ref) => {
  const getInputClasses = () => {
    const baseClasses =
      "block w-full rounded-lg border py-3 transition-colors focus:border-transparent focus:outline-none focus:ring-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400";
    const paddingClasses = leftIcon ? "pl-10" : "pl-3";
    const rightPadding = rightIcon ? "pr-10" : "pr-3";

    const stateClasses = hasError
      ? "border-red-300 dark:border-red-600 focus:ring-red-500"
      : showSuccess
        ? "border-green-300 dark:border-green-600"
        : "border-gray-300 dark:border-gray-600";

    const focusRingColor = hasError ? "" : "focus:ring-blue-500 dark:focus:ring-blue-400";

    return `${baseClasses} ${paddingClasses} ${rightPadding} ${stateClasses} ${focusRingColor} ${className}`;
  };

  return (
    <div className="relative">
      {leftIcon && (
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400 dark:text-gray-500">
          {leftIcon}
        </div>
      )}
      <input ref={ref} className={getInputClasses()} {...props} />
      {showSuccess && !hasError && (
        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
          <CheckCircle className="h-5 w-5 text-green-500" />
        </div>
      )}
      {rightIcon && (
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 dark:text-gray-500">
          {rightIcon}
        </div>
      )}
    </div>
  );
});

InputField.displayName = "InputField";
