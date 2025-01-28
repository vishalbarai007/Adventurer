import { Camera, Mic, Search, Video } from "lucide-react"
// import Image from "next/image"

export function SearchBar() {
  return (
    <div className="mx-4 flex items-center gap-4 rounded-xl bg-[#012c18] p-4">
      <div className="flex items-center gap-3">
        <img src="/placeholder.svg" alt="User" width={32} height={32} className="rounded-full" />
        <input className="flex-1 bg-transparent text-white placeholder-white/60" placeholder="Search here..." />
      </div>
      <div className="flex items-center gap-3">
        <button className="rounded-lg p-2 hover:bg-white/10">
          <Camera className="h-5 w-5 text-white" />
        </button>
        <button className="rounded-lg p-2 hover:bg-white/10">
          <Mic className="h-5 w-5 text-white" />
        </button>
        <button className="rounded-lg p-2 hover:bg-white/10">
          <Video className="h-5 w-5 text-white" />
        </button>
        <button className="rounded-lg bg-[#18cb2a] p-2 text-white hover:bg-[#18cb2a]/90">
          <Search className="h-5 w-5" />
        </button>
      </div>
    </div>
  )
}

