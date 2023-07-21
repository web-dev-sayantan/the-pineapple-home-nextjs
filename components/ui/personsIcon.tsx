"use client";

export default function PersonsIcon({ headCount }: { headCount: number }) {
  return Array.from(Array(headCount)).map((item, index) => (
    <span className="material-symbols-outlined" key={index}>
      person
    </span>
  ));
}
