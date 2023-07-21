"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useStore } from "../../../../../store";

export default function BookingButton() {
  const { selectedRoomRates } = useStore();
  const pathname = usePathname();
  return (
    <>
      {selectedRoomRates.length ? (
        <Link
          href={{
            pathname: `${pathname}/booking`,
          }}
          className="flex items-center justify-center w-full px-4 py-2 rounded-sm bg-destructive text-primary"
        >
          <div className="fixed bottom-0 w-full">
            <button className="flex items-center justify-center w-full p-4 font-bold tracking-wider uppercase bg-accent text-secondary">
              SHOW ME THE MONEY!
            </button>
          </div>
        </Link>
      ) : null}
    </>
  );
}
