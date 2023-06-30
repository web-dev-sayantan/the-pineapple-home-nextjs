"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center w-full gap-4 p-8">
      <h2>Something went wrong!</h2>
      <button
        className="w-48 p-4 bg-red-500 rounded-lg text-slate-50"
        onClick={() => reset()}
      >
        Try again
      </button>
    </div>
  );
}
