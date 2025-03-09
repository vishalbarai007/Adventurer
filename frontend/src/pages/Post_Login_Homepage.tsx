import { lazy, Suspense } from "react"
import Sidebar from "../components/Developer/main/PostLoginComponents/sidebar"
import { useBackgroundStore } from "../components/Developer/support/background-store"

// Lazy loading components
const PostHeader = lazy(() => import("../components/Developer/main/PostLoginComponents/Header"))
const ProfileCards = lazy(() =>
  import("../components/Developer/main/PostLoginComponents/profile-cards").then((module) => ({
    default: module.ProfileCards,
  })),
)
const Suggestions = lazy(() =>
  import("../components/Developer/main/PostLoginComponents/suggestions").then((module) => ({
    default: module.Suggestions,
  })),
)

export default function PostLoginPage() {
  const { currentBackground } = useBackgroundStore()

  return (
    <div
      className="post min-h-screen w-full grid md:grid-cols-[15%,70%,15%] grid-cols-[20%,80%] sm:grid-cols-1 bg-[#e2e4e6]"
      style={{
        backgroundImage: `url('${currentBackground}')`,
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      {/* Left Sidebar */}
      <div className="postlogincomponents w-full border-1 *:border-[#012c18]">
        <Suspense fallback={<div>Loading Sidebar...</div>}>
          <Sidebar />
        </Suspense>
      </div>

      {/* Main Content */}
      <div className="postlogincomponents w-full border-1 *:border-[#012c18]">
        <Suspense fallback={<div>Loading Header...</div>}>
          <PostHeader />
        </Suspense>
        <Suspense fallback={<div>Loading Profile Cards...</div>}>
          <ProfileCards />
        </Suspense>
      </div>

      {/* Right Suggestions Section */}
      <div className="postlogincomponents w-full border-1 *:border-[#012c18]">
        <Suspense fallback={<div>Loading Suggestions...</div>}>
          <Suggestions />
        </Suspense>
      </div>
    </div>
  )
}

