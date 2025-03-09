import { Home, Search, PlusSquare, Heart, User } from "lucide-react"

interface MobileNavbarProps {
  setShowUploadModal: (show: boolean) => void
  darkMode: boolean
}

const MobileNavbar = ({ setShowUploadModal, darkMode }: MobileNavbarProps) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-black border-t border-gray-200 dark:border-gray-800 py-3 px-4 md:hidden">
      <div className="flex justify-between items-center">
        <button className="flex flex-col items-center">
          <Home className="w-6 h-6" />
        </button>
        <button className="flex flex-col items-center">
          <Search className="w-6 h-6" />
        </button>
        <button className="flex flex-col items-center" onClick={() => setShowUploadModal(true)}>
          <PlusSquare className="w-6 h-6" />
        </button>
        <button className="flex flex-col items-center">
          <Heart className="w-6 h-6" />
        </button>
        <button className="flex flex-col items-center">
          <User className="w-6 h-6" />
        </button>
      </div>
    </div>
  )
}

export default MobileNavbar

