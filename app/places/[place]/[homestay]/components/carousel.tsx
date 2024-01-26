export default function Carousel({ title }: { title: string }) {
  return (
    <div className="relative">
      <div className="absolute top-0 flex-wrap p-4 text-6xl tracking-wide text-purple-200 capitalize">
        {title}
      </div>
    </div>
  );
}
