"use client"

import { useState } from "react"
import { Settings, Image, User, Shield, HelpCircle, Upload } from "lucide-react"
import ChangeDisplayModal from "../components/Developer/main/PostLoginComponents/Setting/ChangeDisplay"

export default function SettingsPage() {
  const [isDisplayModalOpen, setIsDisplayModalOpen] = useState(false)
  const [isProfileSection, setIsProfileSection] = useState(true)
  const [isDisplaySection, setIsDisplaySection] = useState(false)
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [selectedAvatar, setSelectedAvatar] = useState<number | null>(null)

  const avatars = [
    "/api/placeholder/100/100", 
    "/api/placeholder/100/100",
    "/api/placeholder/100/100",
    "/api/placeholder/100/100",
    "/api/placeholder/100/100",
    "/api/placeholder/100/100"
  ]

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0]
      const reader = new FileReader()
      reader.onload = (e) => {
        setProfilePhoto(e.target?.result as string | null)
        setSelectedAvatar(null)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0]
      const reader = new FileReader()
      reader.onload = (e) => {
        if (e.target?.result && typeof e.target.result === 'string') {
          setProfilePhoto(e.target.result)
        }
        setSelectedAvatar(null)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleAvatarSelect = (index: number) => {
    setSelectedAvatar(index)
    setProfilePhoto(null)
  }

  const showProfileSection = () => {
    setIsProfileSection(true)
    setIsDisplaySection(false)
  }

  const showDisplaySection = () => {
    setIsProfileSection(false)
    setIsDisplaySection(true)
  }

  return (
    <div className="min-h-screen bg-white p-6">
      <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <Settings className="h-6 w-6" />
        Settings
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-[20%,40%,35%] gap-6">
        <div className="col-span-1 space-y-4">
          <div className="bg-gray-50 rounded-lg p-4">
            <ul className="space-y-2">
              <li 
                className={`p-2 rounded-md cursor-pointer flex items-center gap-2 ${isProfileSection ? 'bg-gray-100 text-blue-600' : 'hover:bg-gray-100'}`}
                onClick={showProfileSection}
              >
                <User className="h-4 w-4" />
                Profile
              </li>
              <li
                className={`p-2 rounded-md cursor-pointer flex items-center gap-2 ${isDisplaySection ? 'bg-gray-100 text-blue-600' : 'hover:bg-gray-100'}`}
                onClick={showDisplaySection}
              >
                <Image className="h-4 w-4" />
                Change Display
              </li>
              {/* <li className="p-2 rounded-md hover:bg-gray-100 cursor-pointer flex items-center gap-2">
                <Bell className="h-4 w-4" />
                Notifications
              </li> */}
              <li className="p-2 rounded-md hover:bg-gray-100 cursor-pointer flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Privacy & Security
              </li>
              <li className="p-2 rounded-md hover:bg-gray-100 cursor-pointer flex items-center gap-2">
                <HelpCircle className="h-4 w-4" />
                Help & Support
              </li>
            </ul>
          </div>
        </div>

        <div className="col-span-1 md:col-span-2">
          {isProfileSection && (
            <div className="bg-gray-50 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Profile Settings</h2>
              
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-2">Profile Photo</h3>
                <div className="flex items-start gap-8">
                  <div className="flex-shrink-0">
                    <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden border-2 border-gray-300">
                      {profilePhoto ? (
                        <img src={profilePhoto} alt="Profile" className="w-full h-full object-cover" />
                      ) : selectedAvatar !== null ? (
                        <img src={avatars[selectedAvatar]} alt="Avatar" className="w-full h-full object-cover" />
                      ) : (
                        <User className="w-16 h-16 text-gray-400" />
                      )}
                    </div>
                  </div>
                  
                  <div className="flex-grow">
                    <div 
                      className={`border-2 border-dashed rounded-lg p-6 mb-4 text-center cursor-pointer transition-colors ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:bg-gray-100'}`}
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                      onClick={() => document.getElementById('fileInput')?.click()}
                    >
                      <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                      <p className="text-gray-600">Drag and drop your photo here or click to select</p>
                      <p className="text-gray-400 text-sm mt-1">JPG, PNG or GIF (max. 5MB)</p>
                      <input 
                        type="file" 
                        id="fileInput" 
                        className="hidden" 
                        accept="image/*" 
                        onChange={handleFileChange} 
                      />
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium mb-2">Or select from pre-made avatars:</h4>
                      <div className="grid grid-cols-6 gap-2">
                        {avatars.map((avatar, index) => (
                          <div 
                            key={index} 
                            className={`w-12 h-12 rounded-full overflow-hidden cursor-pointer ${selectedAvatar === index ? 'ring-2 ring-blue-500' : 'hover:opacity-80'}`}
                            onClick={() => handleAvatarSelect(index)}
                          >
                            <img src={avatar} alt={`Avatar ${index+1}`} className="w-full h-full object-cover" />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="Enter your full name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="Enter your email"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                  <textarea
                    className="w-full p-2 border border-gray-300 rounded-md"
                    rows={3}
                    placeholder="Write a short bio about yourself"
                  ></textarea>
                </div>
                
                <div className="pt-4">
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                    Save Profile
                  </button>
                </div>
              </div>
            </div>
          )}

          {isDisplaySection && (
            <div className="bg-gray-50 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Display Settings</h2>
              <p className="text-gray-600 mb-4">
                Customize your background and display preferences. Click the button below to modify your
                background image.
              </p>
              <div className="bg-gray-200 rounded-lg p-4 flex items-center justify-center h-48">
                <button
                  onClick={() => setIsDisplayModalOpen(true)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  Change Background
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <ChangeDisplayModal isOpen={isDisplayModalOpen} onClose={() => setIsDisplayModalOpen(false)} />
    </div>
  )
}