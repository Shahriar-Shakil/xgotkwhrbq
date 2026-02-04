import { Spinner } from "@/src/components/ui/spinner";

export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-black via-zinc-900 to-black">
      <div className="flex flex-col items-center gap-6">
        {/* Large Spinner */}
        <Spinner className="size-16 text-red-500" />

        {/* Optional: Loading text */}
        <div className="text-center space-y-2">
          <h2 className="text-xl font-bold bg-gradient-to-r from-red-500 via-pink-500 to-purple-500 bg-clip-text text-transparent">
            Loading
          </h2>
          <p className="text-white/60 text-sm">Please wait...</p>
        </div>
      </div>
    </div>
  );
}
