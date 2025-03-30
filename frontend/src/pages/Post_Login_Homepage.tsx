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

        <div className="mt-6 px-4">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1 max-h-[600px] overflow-y-auto">
              <h2 className="text-xl font-semibold mb-4">Your Feed</h2>
              <Suspense fallback={<div>Loading Posts...</div>}>
                <Posts />
              </Suspense>
            </div>

            <div className="flex-1 md:block hidden max-h-[500px] overflow-y-auto">
              <h2 className="text-xl font-semibold mb-4">Your Friends</h2>
              <div className="bg-white rounded-lg shadow p-4">
                <p className="text-gray-500 text-sm">Your friends' activity will appear here</p>
              </div>
            </div>
          </div>

      </div>

      <Suspense fallback={<div></div>}>
        <CreatePostButton />
      </Suspense>
    </div>

  <div className="postlogincomponents w-full border-1 *:border-[#012c18]">
    <Suspense fallback={<div>Loading Suggestions...</div>}>
      <Suggestions />
    </Suspense>
  </div>
    </div >
  )
}