// ProfileContext.tsx
"use client";
import { createContext, useContext, useState, ReactNode } from "react";

interface ProfileContextType {
  profilePhoto: string | null;
  setProfilePhoto: (photo: string | null) => void;
}

const ProfileContext = createContext<ProfileContextType>({
  profilePhoto: null,
  setProfilePhoto: () => {},
});

export const useProfile = () => useContext(ProfileContext);

export const ProfileProvider = ({ children }: { children: ReactNode }) => {
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);

  return (
    <ProfileContext.Provider value={{ profilePhoto, setProfilePhoto }}>
      {children}
    </ProfileContext.Provider>
  );
};
