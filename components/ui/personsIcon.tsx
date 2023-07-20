"use client";

export default function PersonsIcon({ headCount }: { headCount: number }) {
  return Array.from(Array(headCount)).map((item) => (
    <span className="material-symbols-outlined" key={item}>
      person
    </span>
  ));
}
