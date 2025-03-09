"use client"

import { useState } from "react"
import { Settings, Image, User, Bell, Shield, HelpCircle } from "lucide-react"
import ChangeDisplayModal from "../components/Developer/main/PostLoginComponents/Setting/ChangeDisplay"

export default function SettingsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <div className="min-h-screen bg-white p-6">
      <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <Settings className="h-6 w-6" />
        Settings
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-[20%,40%,35%] gap-6">
        <div className="col-span-1 space-y-4">
          <div className="bg-gray-50 rounded-lg p-4">
            <h2 className="font-medium text-gray-900 mb-3">Settings</h2>
            <ul className="space-y-2">
              <li className="p-2 rounded-md hover:bg-gray-100 cursor-pointer flex items-center gap-2">
                <User className="h-4 w-4" />
                Profile
              </li>
              <li
                className="p-2 rounded-md bg-gray-100 text-blue-600 cursor-pointer flex items-center gap-2"
                onClick={() => setIsModalOpen(true)}
              >
                <Image className="h-4 w-4" />
                Change Display
              </li>
              <li className="p-2 rounded-md hover:bg-gray-100 cursor-pointer flex items-center gap-2">
                <Bell className="h-4 w-4" />
                Notifications
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
          <div className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Display Settings</h2>
            <p className="text-gray-600 mb-4">
              Customize your background and display preferences. Click on "Change Display" in the sidebar to modify your
              background image.
            </p>
            <div className="bg-gray-200 rounded-lg p-4 flex items-center justify-center h-48">
              <button
                onClick={() => setIsModalOpen(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Change Background
              </button>
            </div>
          </div>
        </div>
      </div>

      <ChangeDisplayModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  )
}

