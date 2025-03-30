import { FileText, Image, Video, X } from "lucide-react"

type ContentType = "blog" | "image" | "video"

interface CreateOptionsModalProps {
  onClose: () => void
  onOptionSelect: (option: ContentType) => void
}

const CreateOptionsModal = ({ onClose, onOptionSelect }: CreateOptionsModalProps) => {
  console.log("CreateOptionsModal rendered") // Debug log
  
  const handleOptionClick = (option: ContentType) => {
    console.log(`Option clicked: ${option}`) // Debug log
    onOptionSelect(option)
  }
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-900 rounded-lg w-80 overflow-hidden">
        <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold">Create New</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="p-4">
          <button 
            className="flex items-center w-full p-3 mb-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
            onClick={() => handleOptionClick("blog")}
          >
            <FileText className="w-6 h-6 mr-3 text-blue-500" />
            <span className="font-medium">Blog</span>
          </button>
          
          <button 
            className="flex items-center w-full p-3 mb-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
            onClick={() => handleOptionClick("image")}
          >
            <Image className="w-6 h-6 mr-3 text-green-500" />
            <span className="font-medium">Image</span>
          </button>
          
          <button 
            className="flex items-center w-full p-3 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
            onClick={() => handleOptionClick("video")}
          >
            <Video className="w-6 h-6 mr-3 text-red-500" />
            <span className="font-medium">Video</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default CreateOptionsModal