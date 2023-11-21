"use client";

export default function PersonsIcon({ headCount }: { headCount: number }) {
  return Array.from(Array(headCount)).map((item, index) => (
    <i className="material-symbol-outlined text-primary" key={index}>
      person
    </i>
  ));
}
