export default function Loading() {
  return (
    <div className="flex justify-center items-center h-screen bg-black text-white">
      <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-white mr-3"></div>
      <div>Loading...</div>
    </div>
  );
}
