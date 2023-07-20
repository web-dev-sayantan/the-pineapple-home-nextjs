"use client";
import { useRouter } from "next/navigation";

export default function NavBar({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  return (
    <nav className="flex items-center justify-between w-full p-4">
      <button className="flex items-center" onClick={() => router.back()}>
        <span className="material-symbols-outlined">arrow_back_ios_new</span>
      </button>
      <h1 className="text-xl tracking-wider">{children}</h1>
      <button className="flex items-center">
        <span className="material-symbols-outlined">menu</span>
      </button>
    </nav>
  );
}
