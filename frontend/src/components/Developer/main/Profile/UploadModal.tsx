import { useState, useRef } from "react"
import { X, Upload, FileText, Image, Video } from "lucide-react"
import type { Post } from "../../../../types/posts"

interface UploadModalProps {
  onClose: () => void
  onUpload: (post: Post) => void
  contentType: "blog" | "image" | "video"
}

const UploadModal = ({ onClose, onUpload, contentType }: UploadModalProps) => {
  const [title, setTitle] = useState("")
  const [caption, setCaption] = useState("")
  // Removed unused selectedFile state
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    if (file) {
      // Removed setSelectedFile as selectedFile is no longer used
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // For demo purposes, we'll use a placeholder if no image is uploaded
    const imgUrl = previewUrl || getDefaultImageForType(contentType)
    
    const newPost: Post = {
      id: Date.now().toString(),
      imageUrl: imgUrl,
      title: title,
      caption: caption,
      likes: 0,
      comments: 0,
      contentType: contentType
    }
    
    onUpload(newPost)
  }
  
  const getDefaultImageForType = (type: string) => {
    switch(type) {
      case "blog":
        return "/assets/placeholders/blog-placeholder.jpg"
      case "video":
        return "/assets/placeholders/video-placeholder.jpg"
      default:
        return "/placeholder.svg"
    }
  }
  
  const getModalTitle = () => {
    switch(contentType) {
      case "blog":
        return "Create Blog Post"
      case "image":
        return "Upload Image"
      case "video":
        return "Upload Video"
      default:
        return "Create New Post"
    }
  }
  
  const getIcon = () => {
    switch(contentType) {
      case "blog":
        return <FileText className="w-6 h-6 text-blue-500" />
      case "image":
        return <Image className="w-6 h-6 text-green-500" />
      case "video":
        return <Video className="w-6 h-6 text-red-500" />
      default:
        return <Upload className="w-6 h-6" />
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-900 rounded-lg w-full max-w-md overflow-hidden">
        <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            {getIcon()}
            <h3 className="text-lg font-semibold ml-2">{getModalTitle()}</h3>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-4">
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800"
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Caption</label>
            <textarea
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 min-h-20"
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              {contentType === "blog" ? "Cover Image" : contentType === "video" ? "Video" : "Image"}
            </label>
            <div 
              className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-md p-4 text-center cursor-pointer"
              onClick={() => fileInputRef.current?.click()}
            >
              {previewUrl ? (
                <div className="relative">
                  <img 
                    src={previewUrl} 
                    alt="Preview" 
                    className="max-h-40 mx-auto"
                  />
                  <p className="mt-2 text-sm text-gray-500">Click to change file</p>
                </div>
              ) : (
                <div className="py-4">
                  <Upload className="w-8 h-8 mx-auto text-gray-400" />
                  <p className="mt-2 text-sm text-gray-500">Click to select a file</p>
                </div>
              )}
              <input
                ref={fileInputRef}
                type="file"
                onChange={handleFileChange}
                accept={contentType === "image" ? "image/*" : contentType === "video" ? "video/*" : "image/*"}
                className="hidden"
              />
            </div>
          </div>
          
          <div className="flex justify-end">
            <button 
              type="button" 
              onClick={onClose}
              className="px-4 py-2 mr-2 text-gray-600 dark:text-gray-400"
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Post
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default UploadModal