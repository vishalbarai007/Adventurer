"use client"

import { useState, type ChangeEvent } from "react"
import { X, Upload, Film, Image } from "lucide-react"
import type { Post } from "../../../../types/posts"

interface UploadModalProps {
  onClose: () => void
  onUpload: (post: Post) => void
}

const UploadModal = ({ onClose, onUpload }: UploadModalProps) => {
  const [activeTab, setActiveTab] = useState<"post" | "video">("post")
  const [caption, setCaption] = useState("")
  const [title, setTitle] = useState("")
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    if (file) {
      setSelectedFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleUpload = () => {
    if (!previewUrl) {
      // Use placeholder if no file selected
      const placeholderUrl = "/placeholder.svg?height=300&width=300"
      const newPost: Post = {
        id: Date.now().toString(),
        imageUrl: placeholderUrl,
        caption,
        title,
        likes: 0,
        comments: 0,
      }
      onUpload(newPost)
    } else {
      const newPost: Post = {
        id: Date.now().toString(),
        imageUrl: previewUrl,
        caption,
        title,
        likes: 0,
        comments: 0,
      }
      onUpload(newPost)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-900 rounded-lg w-full max-w-lg overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <button
              className={`mr-4 ${activeTab === "post" ? "text-black dark:text-white" : "text-gray-500 dark:text-gray-400"}`}
              onClick={() => setActiveTab("post")}
            >
              <Image className="w-6 h-6 inline mr-1" />
              Post
            </button>
            <button
              className={`${activeTab === "video" ? "text-black dark:text-white" : "text-gray-500 dark:text-gray-400"}`}
              onClick={() => setActiveTab("video")}
            >
              <Film className="w-6 h-6 inline mr-1" />
              Video
            </button>
          </div>
          <button onClick={onClose}>
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-4">
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              {activeTab === "post" ? "Upload Image" : "Upload Video"}
            </label>
            <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-4 text-center">
              {previewUrl ? (
                <div className="relative">
                  <img src={previewUrl || "/placeholder.svg"} alt="Preview" className="max-h-48 mx-auto" />
                  <button
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"
                    onClick={() => {
                      setPreviewUrl(null)
                      setSelectedFile(null)
                    }}
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div>
                  <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                  <p className="text-sm text-gray-500 dark:text-gray-400">Drag and drop or click to upload</p>
                  <input
                    type="file"
                    accept={activeTab === "post" ? "image/*" : "video/*"}
                    className="hidden"
                    id="file-upload"
                    onChange={handleFileChange}
                  />
                  <label
                    htmlFor="file-upload"
                    className="mt-2 inline-block bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer"
                  >
                    Select File
                  </label>
                </div>
              )}
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Title</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800"
              placeholder="Add a title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Caption</label>
            <textarea
              className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800"
              rows={4}
              placeholder="Write a caption..."
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
            />
          </div>

          <button className="w-full bg-blue-500 text-white py-2 rounded-md font-medium" onClick={handleUpload}>
            {activeTab === "post" ? "Share Post" : "Share Video"}
          </button>
        </div>
      </div>
    </div>
  )
}

export default UploadModal

