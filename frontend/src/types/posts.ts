export interface Post {
    id: string
    imageUrl: string
    caption: string
    likes: number
    comments: number
    title?: string
  }

  
  export interface Story {
    id: string
    imageUrl: string
    title: string
  }
  
  export interface ProfileData {
    username: string
    fullName: string
    bio: string[]
    postsCount: number
    followersCount: number
    followingCount: number
    profilePicture: string
    isVerified: boolean
    highlights: Story[]
  }
  
  