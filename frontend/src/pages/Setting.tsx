"use client"

import { useState } from "react"
import { Settings, Image, User, Shield, HelpCircle, Upload, Bell } from "lucide-react"
import ChangeDisplayModal from "../components/Developer/main/PostLoginComponents/Setting/ChangeDisplay"
import LanguageSwitcher from "../components/Developer/support/LanguageSwitcher"

export default function SettingsPage() {
  const [isDisplayModalOpen, setIsDisplayModalOpen] = useState(false)
  const [isProfileSection, setIsProfileSection] = useState(true)
  const [isDisplaySection, setIsDisplaySection] = useState(false)
  const [isGeneralSection, setIsGeneralSection] = useState(false)
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [selectedAvatar, setSelectedAvatar] = useState<number | null>(null)
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    pushNotifications: false,
    marketingEmails: true,
    activityDigest: false
  })
  const [languagePreference, setLanguagePreference] = useState("english")
  const [timeZone, setTimeZone] = useState("UTC")

  const avatars = [
  "https://avatars.dicebear.com/api/bottts/robot1.svg",
  "https://avatars.dicebear.com/api/identicon/animal42.svg",
  "https://api.dicebear.com/7.x/adventurer/svg?seed=TigerBot",
  "https://api.dicebear.com/7.x/lorelei/svg?seed=FoxMage",
  "https://api.dicebear.com/7.x/pixel-art/svg?seed=CyberCat",
  "https://api.dicebear.com/7.x/big-ears-neutral/svg?seed=MonkeyMind"
];


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
    setIsGeneralSection(false)
  }

  const showDisplaySection = () => {
    setIsProfileSection(false)
    setIsDisplaySection(true)
    setIsGeneralSection(false)
  }

  const showGeneralSection = () => {
    setIsProfileSection(false)
    setIsDisplaySection(false)
    setIsGeneralSection(true)
  }

  const toggleNotificationSetting = (setting: keyof typeof notificationSettings) => {
    setNotificationSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }))
  }

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguagePreference(e.target.value)
  }

  const handleTimeZoneChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTimeZone(e.target.value)
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
              <li
                className={`p-2 rounded-md cursor-pointer flex items-center gap-2 ${isGeneralSection ? 'bg-gray-100 text-blue-600' : 'hover:bg-gray-100'}`}
                onClick={showGeneralSection}
              >
                <Bell className="h-4 w-4" />
                General
              </li>
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

          {isGeneralSection && (
            <div className="bg-gray-50 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">General Settings</h2>
              
              <div className="mb-8">
                <h3 className="text-lg font-medium mb-4">Notification Preferences</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Email Notifications</p>
                      <p className="text-sm text-gray-500">Receive notifications via email</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="sr-only peer" 
                        checked={notificationSettings.emailNotifications}
                        onChange={() => toggleNotificationSetting('emailNotifications')}
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Push Notifications</p>
                      <p className="text-sm text-gray-500">Receive push notifications in your browser</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="sr-only peer" 
                        checked={notificationSettings.pushNotifications}
                        onChange={() => toggleNotificationSetting('pushNotifications')}
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Marketing Emails</p>
                      <p className="text-sm text-gray-500">Receive marketing and newsletter emails</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="sr-only peer" 
                        checked={notificationSettings.marketingEmails}
                        onChange={() => toggleNotificationSetting('marketingEmails')}
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Activity Digest</p>
                      <p className="text-sm text-gray-500">Receive weekly digest of your account activity</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="sr-only peer" 
                        checked={notificationSettings.activityDigest}
                        onChange={() => toggleNotificationSetting('activityDigest')}
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>
              </div>
              
              <div className="mb-8">
                <h3 className="text-lg font-medium mb-4">Language & Region</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Language</label>
                    <LanguageSwitcher/>
                    <select 
                      className="w-full p-2 border border-gray-300 rounded-md bg-white"
                      value={languagePreference}
                      onChange={handleLanguageChange}
                    >
                    
                      <option value="english">English</option>
                      <option value="spanish">Spanish</option>
                      <option value="french">French</option>
                      <option value="german">German</option>
                      <option value="japanese">Japanese</option>
                      <option value="chinese">Chinese</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Time Zone</label>
                    <select 
                      className="w-full p-2 border border-gray-300 rounded-md bg-white"
                      value={timeZone}
                      onChange={handleTimeZoneChange}
                    >
                      <option value="UTC">UTC (Coordinated Universal Time)</option>
                      <option value="EST">EST (Eastern Standard Time)</option>
                      <option value="CST">CST (Central Standard Time)</option>
                      <option value="MST">MST (Mountain Standard Time)</option>
                      <option value="PST">PST (Pacific Standard Time)</option>
                      <option value="GMT">GMT (Greenwich Mean Time)</option>
                      <option value="IST">IST (India Standard Time)</option>
                      <option value="JST">JST (Japan Standard Time)</option>
                    </select>
                  </div>
                </div>
              </div>
              
              <div className="mb-8">
                <h3 className="text-lg font-medium mb-4">Session Settings</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Auto-logout after inactivity</label>
                    <select className="w-full p-2 border border-gray-300 rounded-md bg-white">
                      <option value="15">15 minutes</option>
                      <option value="30">30 minutes</option>
                      <option value="60">1 hour</option>
                      <option value="120">2 hours</option>
                      <option value="never">Never</option>
                    </select>
                  </div>
                </div>
              </div>
              
              <div className="pt-4">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                  Save General Settings
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