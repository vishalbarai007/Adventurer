"use client"

import { useState, useEffect } from "react"
import Sidebar from "../components/Developer/main/Profile/Sidebar"
import MobileNavbar from "../components/Developer/main/Profile/MobileNavbar"
import ProfileHeader from "../components/Developer/main/Profile/ProfileHeader"
import ProfileTabs from "../components/Developer/main/Profile/ProfileTabs"
import PostGrid from "../components/Developer/main/Profile/PostGrid"
import UploadModal from "../components/Developer/main/Profile/UploadModal"
import type { Post } from "../types/posts"

const Profile = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)
  const [darkMode, setDarkMode] = useState(false)
  const [activeTab, setActiveTab] = useState("posts")
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [posts, setPosts] = useState<Post[]>([
    {
      id: "1",
      imageUrl: "/assets/Developers/Vishal.png",
      caption: "Definition: A chudail is an individual who fuses elements of both gothic and grunge fashion styles.",
      likes: 245,
      comments: 32,
      title: "CHUDAIL",
    },
    {
      id: "2",
      imageUrl: "/assets/Developers/Yug.png",
      caption: "Definition: A person who embraces a fashion style characterized by practicality, durability.",
      likes: 189,
      comments: 17,
      title: "FAQIR",
    },
    {
      id: "3",
      imageUrl: "/assets/Developers/Rahul.png",
      caption: "A Brief Journey Through 90s Counterculture",
      likes: 320,
      comments: 45,
      title: "GRUNGE",
    },
    {
      id: "4",
      imageUrl: "/assets/Developers/Vishal.png",
      caption: "Dark aesthetics combined with laid-back vibes",
      likes: 178,
      comments: 23,
      title: "GOTHIC",
    },
  
  ])

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    if (!darkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }

  const handleUpload = (newPost: Post) => {
    setPosts([newPost, ...posts])
    setShowUploadModal(false)
  }

  return (
    <div className={`${darkMode ? "dark" : ""} min-h-screen`}>
      <div className="flex flex-col md:flex-row bg-white dark:bg-black text-black dark:text-white min-h-screen">
        {!isMobile && <Sidebar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />}

        <div className="flex-1 md:ml-[300px]">
          <ProfileHeader isMobile={isMobile} darkMode={darkMode} />

          <ProfileTabs activeTab={activeTab} setActiveTab={setActiveTab} isMobile={isMobile} />

          <PostGrid posts={posts} isMobile={isMobile} />
        </div>

        {isMobile && <MobileNavbar setShowUploadModal={setShowUploadModal} darkMode={darkMode} />}

        {showUploadModal && <UploadModal onClose={() => setShowUploadModal(false)} onUpload={handleUpload} />}
      </div>
    </div>
  )
}

export default Profile

