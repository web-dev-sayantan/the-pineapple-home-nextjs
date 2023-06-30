export default function NavBar({ children }: { children: React.ReactNode }) {
  return (
    <nav className="flex items-center justify-between w-full p-4">
      <h1 className="text-xl tracking-wider">{children}</h1>
      <button className="actions">
        <span className="material-symbols-outlined">menu</span>
      </button>
    </nav>
  );
}
