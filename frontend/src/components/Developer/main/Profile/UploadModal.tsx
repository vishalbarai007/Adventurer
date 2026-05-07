import { useState, useRef } from "react"
import { X, Upload, FileText, Image, Video, Loader2 } from "lucide-react"
import type { Post } from "../../../../types/posts"
import httpClient from "../../../../services/httpClient"

interface UploadModalProps {
  onClose: () => void
  onUpload: (post: Post) => void
  contentType: "blog" | "image" | "video"
}

const UploadModal = ({ onClose, onUpload, contentType }: UploadModalProps) => {
  const [title, setTitle] = useState("")
  const [caption, setCaption] = useState("")
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    let finalImgUrl = previewUrl || getDefaultImageForType(contentType)
    let finalPublicId = null

    const file = fileInputRef.current?.files?.[0]
    
    if (file) {
      setUploading(true)
      setUploadProgress(0)

      const formData = new FormData()
      formData.append('file', file)

      try {
        const response = await httpClient.post('/api/upload', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
          onUploadProgress: (progressEvent) => {
            if (progressEvent.total) {
              const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
              setUploadProgress(percentCompleted)
            }
          }
        })
        
        finalImgUrl = response.data.url
        finalPublicId = response.data.public_id
      } catch (error) {
        console.error("Upload failed", error)
        setUploading(false)
        alert("Upload failed. Please try again.")
        return
      }
      setUploading(false)
    }
    
    const newPost: any = {
      id: Date.now().toString(),
      imageUrl: finalImgUrl,
      public_id: finalPublicId,
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
          <button onClick={onClose} disabled={uploading} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
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
              disabled={uploading}
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Caption</label>
            <textarea
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 min-h-20"
              required
              disabled={uploading}
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              {contentType === "blog" ? "Cover Image" : contentType === "video" ? "Video" : "Image"}
            </label>
            <div 
              className={`border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-md p-4 text-center ${uploading ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
              onClick={() => !uploading && fileInputRef.current?.click()}
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
                disabled={uploading}
              />
            </div>
          </div>

          {/* Progress Bar UI */}
          {uploading && (
            <div className="mb-4">
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-blue-700 dark:text-white">Uploading...</span>
                <span className="text-sm font-medium text-blue-700 dark:text-white">{uploadProgress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                <div className="bg-blue-600 h-2.5 rounded-full transition-all duration-300" style={{ width: `${uploadProgress}%` }}></div>
              </div>
            </div>
          )}
          
          <div className="flex justify-end">
            <button 
              type="button" 
              onClick={onClose}
              className="px-4 py-2 mr-2 text-gray-600 dark:text-gray-400"
              disabled={uploading}
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 flex items-center justify-center min-w-[80px]"
              disabled={uploading}
            >
              {uploading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Post'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default UploadModal