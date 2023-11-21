"use client";
import { useRouter } from "next/navigation";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { ChevronLeftIcon, HamburgerMenuIcon } from "@radix-ui/react-icons";

export default function NavBar({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  return (
    <nav className="flex items-center justify-between w-full p-4">
      <Button variant="outline" size="icon" onClick={() => router.back()}>
        <ChevronLeftIcon />
      </Button>
      <h1 className="text-xl tracking-wider">{children}</h1>
      <div className="flex items-center gap-4">
        <div className="hidden md:block">
          <ModeToggle size={1.2}></ModeToggle>
        </div>
        <div className="fixed bottom-4 md:hidden">
          <ModeToggle size={2.4}></ModeToggle>
        </div>
        <Button variant="outline" size="icon">
          <HamburgerMenuIcon />
        </Button>
      </div>
    </nav>
  );
}
