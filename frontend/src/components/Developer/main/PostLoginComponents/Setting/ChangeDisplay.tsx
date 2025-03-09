"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { X, Upload } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../../../Shadcn/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../../Shadcn/ui/tabs"
import { useBackgroundStore } from "../../../support/background-store"

interface ChangeDisplayModalProps {
  isOpen: boolean
  onClose: () => void
}

// Sample preset backgrounds
const presetBackgrounds = [
  { id: 1, name: "Summer", url: "/assets/Seasons/Summer1.jpg" },
  { id: 2, name: "Autumn", url: "/assets/Seasons/Autumn1.jpg" },
  { id: 3, name: "Winter", url: "/assets/Seasons/Winter1.jpg" },
  { id: 4, name: "Spring", url: "/assets/Seasons/Spring1.jpg" },
  { id: 5, name: "Beach", url: "/assets/Landscapes/Beach1.jpg" },
  { id: 6, name: "Mountains", url: "/assets/Landscapes/Mountains1.jpg" },
]

export default function ChangeDisplayModal({ isOpen, onClose }: ChangeDisplayModalProps) {
  const { setBackground, currentBackground } = useBackgroundStore()
  const [selectedBackground, setSelectedBackground] = useState<string>(currentBackground)
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)

  useEffect(() => {
    // Reset selected background when modal opens
    if (isOpen) {
      setSelectedBackground(currentBackground)
    }
  }, [isOpen, currentBackground])

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        const result = event.target?.result as string
        setUploadedImage(result)
        setSelectedBackground(result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSave = () => {
    setBackground(selectedBackground)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Change Display Background</DialogTitle>
          <button
            onClick={onClose}
            className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          >
            {/* <X className="h-4 w-4" /> */} 
            {/* <span className="sr-only">Close</span> */}
          </button>
        </DialogHeader>

        <Tabs defaultValue="presets" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="presets">Preset Backgrounds</TabsTrigger>
            <TabsTrigger value="upload">Upload Image</TabsTrigger>
          </TabsList>

          <TabsContent value="presets" className="mt-4">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {presetBackgrounds.map((bg) => (
                <div
                  key={bg.id}
                  className={`relative aspect-video rounded-md overflow-hidden cursor-pointer border-2 ${selectedBackground === bg.url ? "border-blue-600" : "border-transparent"}`}
                  onClick={() => setSelectedBackground(bg.url)}
                >
                  <img src={bg.url || "/placeholder.svg"} alt={bg.name} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black bg-opacity-20 flex items-end">
                    <span className="text-white text-sm p-2">{bg.name}</span>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="upload" className="mt-4">
            <div className="flex flex-col items-center justify-center gap-4">
              <div className="w-full aspect-video bg-gray-100 rounded-md flex items-center justify-center overflow-hidden">
                {uploadedImage ? (
                  <img
                    src={uploadedImage || "/placeholder.svg"}
                    alt="Uploaded background"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-center p-6">
                    <Upload className="h-12 w-12 mx-auto text-gray-400" />
                    <p className="mt-2 text-sm text-gray-500">Upload an image to use as background</p>
                  </div>
                )}
              </div>

              <label className="w-full">
                <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                <div className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-center cursor-pointer">
                  Choose Image
                </div>
              </label>
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end gap-2 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Save Changes
          </button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

