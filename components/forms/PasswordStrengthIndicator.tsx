interface PasswordStrengthProps {
  password: string;
}

interface PasswordChecks {
  length: boolean;
  lowercase: boolean;
  uppercase: boolean;
  number: boolean;
  special: boolean;
}

interface PasswordStrength {
  score: number;
  checks: PasswordChecks;
  strength: "weak" | "medium" | "strong";
}

const getPasswordStrength = (password: string): PasswordStrength => {
  const checks: PasswordChecks = {
    length: password.length >= 6,
    lowercase: /[a-z]/.test(password),
    uppercase: /[A-Z]/.test(password),
    number: /\d/.test(password),
    special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
  };

  const score = Object.values(checks).filter(Boolean).length;

  return {
    score,
    checks,
    strength: score < 2 ? "weak" : score < 4 ? "medium" : "strong",
  };
};

const StrengthIndicator = ({ strength }: { strength: "weak" | "medium" | "strong" }) => {
  const getBarColor = () => {
    switch (strength) {
      case "weak": return "w-1/3 bg-red-500";
      case "medium": return "w-2/3 bg-yellow-500";
      case "strong": return "w-full bg-green-500";
    }
  };

  const getTextColor = () => {
    switch (strength) {
      case "weak": return "text-red-600";
      case "medium": return "text-yellow-600";
      case "strong": return "text-green-600";
    }
  };

  return (
    <div className="mb-2 flex items-center space-x-2">
      <div className="h-2 flex-1 rounded-full bg-gray-200">
        <div className={`h-2 rounded-full transition-all duration-300 ${getBarColor()}`} />
      </div>
      <span className={`text-xs font-medium ${getTextColor()}`}>
        {strength.charAt(0).toUpperCase() + strength.slice(1)}
      </span>
    </div>
  );
};

const CheckItem = ({ checked, children }: { checked: boolean; children: React.ReactNode }) => (
  <div className={`flex items-center ${checked ? "text-green-600" : "text-gray-500"}`}>
    {checked ? "✓" : "○"} {children}
  </div>
);

export function PasswordStrengthIndicator({ password }: PasswordStrengthProps) {
  if (!password) return null;

  const passwordStrength = getPasswordStrength(password);

  return (
    <div className="mt-2">
      <StrengthIndicator strength={passwordStrength.strength} />
      <div className="space-y-1 text-xs text-gray-600">
        <CheckItem checked={passwordStrength.checks.length}>
          At least 6 characters
        </CheckItem>
        <CheckItem checked={passwordStrength.checks.uppercase}>
          One uppercase letter
        </CheckItem>
        <CheckItem checked={passwordStrength.checks.lowercase}>
          One lowercase letter
        </CheckItem>
        <CheckItem checked={passwordStrength.checks.number}>
          One number
        </CheckItem>
      </div>
    </div>
  );
}