import { useSession, signOut } from "next-auth/react";
import Login from "./login/page";
import LoadingScreen from "@/components/loading/LoadingScreen";
import { redirect } from "next/navigation";

export default function Home() {
  const { data: session, status } = useSession();

  if (status === "loading")
    return (
      <div className="fixed left-0 top-0 h-screen w-full bg-black">
        <LoadingScreen />
      </div>
    );

  if (!session) {
    return <Login />;
  }

  redirect("/popular");
}
