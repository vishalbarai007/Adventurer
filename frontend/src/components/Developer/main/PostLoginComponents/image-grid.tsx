import { Heart, Share2 } from "lucide-react"
// import img from "next/img"

export function ImageGrid() {
  return (
    <div className="grid grid-cols-2 gap-4 p-4">
      <div className="space-y-4 rounded-xl bg-[#012c18] p-4">
        <img src="/placeholder.svg" alt="Cat" width={400} height={300} className="rounded-lg object-cover" />
        <div className="grid grid-cols-2 gap-4">
          <img src="/placeholder.svg" alt="Cat" width={200} height={150} className="rounded-lg object-cover" />
          <img src="/placeholder.svg" alt="Cat" width={200} height={150} className="rounded-lg object-cover" />
        </div>
        <div className="flex justify-between">
          <button className="rounded-full bg-white/10 p-2 text-white hover:bg-white/20">
            <Heart className="h-5 w-5" />
          </button>
          <button className="rounded-full bg-white/10 p-2 text-white hover:bg-white/20">
            <Share2 className="h-5 w-5" />
          </button>
        </div>
      </div>
      <div className="space-y-4 rounded-xl bg-[#012c18] p-4">
        <img src="/placeholder.svg" alt="Panda" width={400} height={300} className="rounded-lg object-cover" />
        <div className="grid grid-cols-2 gap-4">
          <img src="/placeholder.svg" alt="Panda" width={200} height={150} className="rounded-lg object-cover" />
          <img src="/placeholder.svg" alt="Panda" width={200} height={150} className="rounded-lg object-cover" />
        </div>
        <div className="flex justify-between">
          <button className="rounded-full bg-white/10 p-2 text-white hover:bg-white/20">
            <Heart className="h-5 w-5" />
          </button>
          <button className="rounded-full bg-white/10 p-2 text-white hover:bg-white/20">
            <Share2 className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  )
}

