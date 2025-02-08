import { ChevronRight } from "lucide-react"
// import Image from "next/image"

export function Suggestions() {
  return (
    <div className="min-h-screen w-[100%] bg-[#edf2f7] border-l-2 *:border-[#012c18] p-4">
      <div className="rounded-xl p-5 bg-[#012c18]">
      <div className="flex items-center text-white">
        <h2 className="text-sm font-medium">Suggestions</h2>
        <ChevronRight className="h-4 w-4" />
      </div>
      <div className="mt-4">
        <img src="/assets/sanctuary/andheri.jpg" alt="Suggestion" width={200} height={200} className="rounded-lg w-full border-4 object-cover" />
      </div>
      </div>
    </div>
  )
}

