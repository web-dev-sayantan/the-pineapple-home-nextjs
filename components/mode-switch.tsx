"use client";

import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";

export function ModeSwitch({ size }: { size: number }) {
  const { theme, setTheme } = useTheme();
  const sizeClassName = `text-[${size}rem]`;
  return (
    <>
      <input
        type="checkbox"
        name="mode"
        id="mode"
        className="absolute opacity-0"
        onChange={() => {
          setTheme(theme === "dark" ? "light" : "dark");
        }}
      />
      <label
        htmlFor="mode"
        className="flex items-center justify-between cursor-pointer"
      >
        <i
          className={cn(
            "material-symbol-outlined rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0",
            sizeClassName
          )}
        >
          light_mode
        </i>
        <i
          className={cn(
            "material-symbol-outlined absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100",
            sizeClassName
          )}
        >
          dark_mode
        </i>
      </label>
    </>
  );
}
