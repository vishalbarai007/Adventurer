import { lazy, Suspense, useState, useEffect } from "react"
import Sidebar from "../components/Developer/main/PostLoginComponents/sidebar"
import { useBackgroundStore } from "../components/Developer/support/background-store"
// import GoogleTranslate from "../components/Developer/support/LanguageSwitcher"
import LargeSuccessLoader from "../components/Developer/support/Loader"

// Lazy loading components
const PostHeader = lazy(() => import("../components/Developer/main/PostLoginComponents/Header"))
const ProfileCards = lazy(() =>
  import("../components/Developer/main/PostLoginComponents/profile-cards").then((module) => ({
    default: module.ProfileCards,
  })),
)
const Suggestions = lazy(() => import("../components/Developer/main/PostLoginComponents/suggestions"))
const Posts = lazy(() =>
  import("../components/Developer/main/PostLoginComponents/Posts").then((module) => ({
    default: module.Posts,
  })),
)
const CreatePostButton = lazy(() =>
  import("../components/Developer/main/PostLoginComponents/Posts").then((module) => ({
    default: module.CreatePostButton,
  })),
)

export default function PostLoginPage() {
  const { currentBackground } = useBackgroundStore()
  const [rightSidebarOpen, setRightSidebarOpen] = useState(false)

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    if (token) {
      localStorage.setItem('jwt_token', token);
      // Clean up the URL
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  return (
    <div
      className="relative flex h-screen w-full overflow-hidden bg-[#e2e4e6]"
      style={{
        backgroundImage: `url('${currentBackground}')`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      {/* Google Translate */}
      {/* <div className="absolute top-4 right-16 z-50">
        <GoogleTranslate />
      </div> */}

      {/* Left Sidebar (statically visible on desktop, toggleable on mobile) */}
      <Suspense fallback={<div><LargeSuccessLoader /></div>}>
        <Sidebar />
      </Suspense>

      {/* Right Sidebar (overlay, toggleable) */}
      <Suspense fallback={<div><LargeSuccessLoader /></div>}>
        <Suggestions
          isOpen={rightSidebarOpen}
          onToggle={() => setRightSidebarOpen(!rightSidebarOpen)}
        />
      </Suspense>

      {/* Main Content — takes full width, locked to 100vh */}
      <div className="flex h-full w-full flex-col">
        {/* Header — fixed at top, never scrolls */}
        <div className="flex-shrink-0">
          <Suspense fallback={<div className="p-8"><LargeSuccessLoader /></div>}>
            <PostHeader />
          </Suspense>
        </div>

        {/* Stories section — pinned below header, never scrolls */}
        <div className="flex-shrink-0 border-b border-[#012c18]/10">
          <Suspense fallback={<div className="p-4"><LargeSuccessLoader /></div>}>
            <ProfileCards />
          </Suspense>
        </div>

        {/* Feed section — only this scrolls */}
        <div className="flex-1 overflow-y-auto custom-scrollbar px-4 py-4">
          <h2 className="text-xl font-semibold mb-4 text-[#012c18]">Your Feed</h2>
          <Suspense fallback={<div><LargeSuccessLoader /></div>}>
            <Posts />
          </Suspense>
        </div>
      </div>

      {/* Create Post FAB */}
      <Suspense fallback={<div></div>}>
        <CreatePostButton />
      </Suspense>
    </div>
  )
}