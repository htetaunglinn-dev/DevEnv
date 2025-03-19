"use client";

import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";

export default function Login() {
  const { data: session, status } = useSession();

  // Redirect if already logged in
  useEffect(() => {
    if (status === "authenticated") {
      window.location.href = "/";
    }
  }, [status]);

  const handleGitHubLogin = () => {
    signIn("github", { callbackUrl: "/" });
  };

  if (status === "loading") return <p>Loading...</p>;

  return (
    <div className="fixed left-0 top-0 flex h-screen w-screen items-center justify-center bg-blue-600">
      <h1>Login</h1>
      <p>Sign in with your GitHub account</p>
      <button onClick={handleGitHubLogin}>Login with GitHub</button>
    </div>
  );
}
