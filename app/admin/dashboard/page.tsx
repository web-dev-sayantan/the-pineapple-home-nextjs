'use client';
import { signOut, useSession } from "next-auth/react";
import NavBar from "../../components/navBar";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const router = useRouter();
  const session = useSession();
  console.log(session)
  function logout() {
    signOut({ redirect: false });
    router.push('/admin')
  }
  return (
    <section className="flex flex-col items-center justify-center w-full h-auto gap-4">
      <NavBar>
        <span>
          <span className="text-accent">Admin</span>&nbsp;Dashboard
        </span>
      </NavBar>
      <div>
        <h1>Hello {JSON.stringify(session.data?.user)}</h1>
      </div>
      <button onClick={logout} className="px-4 py-2 rounded-md bg-destructive/80">Logout</button>
    </section>
  );
}
