import {
  Home,
  Search,
  Compass,
  Film,
  LayoutDashboard,
  User,
  Bot,
  Sun,
  Moon,
} from "lucide-react"
// import { Avatar, AvatarFallback, AvatarImage } from "../../../Shadcn/support/PostLoginHome/ui/avatar"

interface SidebarProps {
  darkMode: boolean
  toggleDarkMode: () => void
}

const Sidebar = ({ darkMode, toggleDarkMode }: SidebarProps) => {
  return (
    <div className="fixed left-0 top-0 h-full w-[280px] border-r-2 border-[#012c18] dark:border-gray-800 bg-white dark:bg-black p-4 flex flex-col">
      <div className="mb-10 mt-4">
        <h1 className="text-2xl font-cursive font-bold">Adventurer</h1>
      </div>

      <nav className="flex-1">
        <ul className="space-y-4">
          <li>
            <a href="/post-login-homepage" className="flex items-center gap-3 p-2 hover:bg-gray-100 dark:hover:bg-gray-900 rounded-md">
              <Home className="w-6 h-6" />
              <span>Home</span>
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center gap-3 p-2 hover:bg-gray-100 dark:hover:bg-gray-900 rounded-md">
              <Search className="w-6 h-6" />
              <span>Search</span>
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center gap-3 p-2 hover:bg-gray-100 dark:hover:bg-gray-900 rounded-md">
              <Compass className="w-6 h-6" />
              <span>Explore</span>
            </a>
          </li>
          <li>
            <a href="/blogs" className="flex items-center gap-3 p-2 hover:bg-gray-100 dark:hover:bg-gray-900 rounded-md">
              <Film className="w-6 h-6" />
              <span>Blogs</span>
            </a>
          </li>
          {/* <li>
              <a href="#" className="flex items-center gap-3 p-2 hover:bg-gray-100 dark:hover:bg-gray-900 rounded-md">
                <MessageCircle className="w-6 h-6" />
                <span>Messages</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center gap-3 p-2 hover:bg-gray-100 dark:hover:bg-gray-900 rounded-md">
                <Heart className="w-6 h-6" />
                <span>Notifications</span>
              </a>
            </li> */}
          {/* <li>
              <a href="#" className="flex items-center gap-3 p-2 hover:bg-gray-100 dark:hover:bg-gray-900 rounded-md">
                <PlusSquare className="w-6 h-6" />
                <span>Create</span>
              </a>
            </li> */}
          <li>
            <a href="#" className="flex items-center gap-3 p-2 hover:bg-gray-100 dark:hover:bg-gray-900 rounded-md">
              <LayoutDashboard className="w-6 h-6" />
              <span>Dashboard</span>
            </a>
          </li>
          <li>
            <a href="/profile" className="flex items-center gap-3 p-2 bg-gray-100 dark:bg-gray-900 rounded-md">
              <User className="w-6 h-6" />
              <span>Profile</span>
            </a>
          </li>
          <li>
            <a href="/chatbot" className="flex items-center gap-3 p-2 hover:bg-gray-100 dark:hover:bg-gray-900 rounded-md">
              <Bot className="w-6 h-6" />
              <span>Ask Trekky!</span>
            </a>
          </li>
          {/* <li>
              <a href="#" className="flex items-center gap-3 p-2 hover:bg-gray-100 dark:hover:bg-gray-900 rounded-md">
                <Hash className="w-6 h-6" />
                <span>Threads</span>
              </a>
            </li> */}
        </ul>
      </nav>

      <div className="mt-auto">
        <button
          onClick={toggleDarkMode}
          className="flex items-center gap-3 p-2 hover:bg-gray-100 dark:hover:bg-gray-900 rounded-md w-full"
        >
          {darkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
          <span>{darkMode ? "Light Mode" : "Dark Mode"}</span>
        </button>

        {/* <button className="flex items-center gap-3 p-2 hover:bg-gray-100 dark:hover:bg-gray-900 rounded-md mt-2 w-full">
            <MoreHorizontal className="w-6 h-6" />
            <span>More</span>
          </button> */}
        {/* <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar> */}
      </div>
    </div>
  )
}

export default Sidebar

