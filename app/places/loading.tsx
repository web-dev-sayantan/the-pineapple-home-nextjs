export default function Loading() {
  return (
    <div className="grid w-full h-full gap-2 p-8">
      <div className="w-full h-32 bg-gray-300 rounded-md opacity-10 animate-skeletonLoading"></div>
      <div className="w-full h-32 bg-gray-300 rounded-md opacity-10 animate-skeletonLoading"></div>
      <div className="w-full h-32 bg-gray-300 rounded-md opacity-10 animate-skeletonLoading"></div>
      <div className="w-full h-32 bg-gray-300 rounded-md opacity-10 animate-skeletonLoading"></div>
    </div>
  );
}
