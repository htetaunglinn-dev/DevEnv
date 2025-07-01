interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function LoadingSpinner({ size = "md", className = "" }: LoadingSpinnerProps) {
  const getSizeClasses = () => {
    switch (size) {
      case "sm": return "h-4 w-4";
      case "md": return "h-12 w-12";
      case "lg": return "h-16 w-16";
    }
  };

  return (
    <div className={`animate-spin rounded-full border-b-2 border-emerald-600 ${getSizeClasses()} ${className}`} />
  );
}

interface LoadingScreenProps {
  message?: string;
}

export function LoadingScreen({ message = "Loading..." }: LoadingScreenProps) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100">
      <div className="text-center">
        <LoadingSpinner size="lg" />
        <p className="mt-4 text-gray-600">{message}</p>
      </div>
    </div>
  );
}