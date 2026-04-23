import { ChevronRight, ChevronLeft, X } from "lucide-react"

type RightSidebarProps = {
  isOpen: boolean;
  onToggle: () => void;
};

export default function Suggestions({ isOpen, onToggle }: RightSidebarProps) {
  return (
    <>
      {/* Toggle button — always visible, sits on the right edge */}
      <button
        onClick={onToggle}
        className={`fixed top-5 z-[60] flex items-center justify-center rounded-full bg-[#012c18] p-2.5 text-white shadow-lg transition-all duration-300 ease-in-out hover:bg-[#024d2b] hover:scale-110 active:scale-95 ${
          isOpen ? "right-[255px] md:right-[255px]" : "right-4"
        }`}
        aria-label="Toggle suggestions"
      >
        {isOpen ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
      </button>

      {/* Backdrop overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={onToggle}
      />

      {/* Right sidebar panel */}
      <div
        className={`fixed top-0 right-0 z-50 h-full w-[270px] transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } border-l-2 border-[#012c18]/20 bg-[#edf2f7] text-[#012c18] shadow-2xl`}
      >
        {/* Close button */}
        <button
          onClick={onToggle}
          className="absolute top-4 left-4 rounded-full p-1.5 text-[#012c18]/60 transition-colors hover:bg-[#012c18]/10 hover:text-[#012c18]"
          aria-label="Close suggestions"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="flex h-full flex-col overflow-y-auto custom-scrollbar p-6 pt-14">
          <div className="rounded-xl p-5 bg-[#012c18]">
            <div className="flex items-center text-white">
              <h2 className="text-sm font-medium">Suggestions</h2>
              <ChevronRight className="h-4 w-4 ml-1" />
            </div>
            <div className="mt-4">
              <img
                src="/assets/sanctuary/andheri.jpg"
                alt="Suggestion"
                width={200}
                height={200}
                className="rounded-lg w-full border-4 object-cover"
              />
            </div>
          </div>

          {/* Add more suggestion cards */}
          <div className="mt-4 rounded-xl p-5 bg-[#012c18]/10">
            <h3 className="text-sm font-semibold text-[#012c18] mb-2">Popular Destinations</h3>
            <p className="text-xs text-[#012c18]/60">Discover trending travel spots near you</p>
          </div>

          <div className="mt-4 rounded-xl p-5 bg-[#012c18]/10">
            <h3 className="text-sm font-semibold text-[#012c18] mb-2">Travel Buddies</h3>
            <p className="text-xs text-[#012c18]/60">Connect with fellow adventurers</p>
          </div>
        </div>
      </div>
    </>
  );
}

