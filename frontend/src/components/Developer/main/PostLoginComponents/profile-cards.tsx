// import Image from "next/image"

export function ProfileCards() {
  const profiles = [
    {
      color: "from-yellow-400 to-orange-500",
      image: "/assets/Developers/Vishal.png",
      profilepic: "/assets/Developers/Vishal.png"
    },
    {
      color: "from-green-400 to-green-600",
      image: "/assets/Developers/Rahul.png",
      profilepic: "/assets/Developers/Rahul.png"
    },
    {
      color: "from-blue-400 to-blue-600",
      image: "/assets/Developers/Shravani.png",
      profilepic: "/assets/Developers/Shravani.png"

    },
    {
      color: "from-pink-400 to-pink-600",
      image: "/assets/Developers/Yug.png",
      profilepic: "/assets/Developers/Yug.png"

    },
    {
      color: "from-purple-400 to-purple-600",
      image: "/assets/sanctuary/karnala1.jpg",
      profilepic: "/assets/sanctuary/karnala1.jpg"

    },
    {
      color: "from-red-400 to-red-600",
      image: "/assets/sanctuary/kalsubai.jpg",
      profilepic: "/assets/sanctuary/kalsubai.jpg"

    },
    {
      color: "from-red-400 to-red-600",
      image: "/assets/sanctuary/kalsubai.jpg",
      profilepic: "/assets/sanctuary/kalsubai.jpg"

    },
    {
      color: "from-purple-400 to-purple-600",
      image: "/assets/sanctuary/karnala1.jpg",
      profilepic: "/assets/sanctuary/karnala1.jpg"

    },
    {
      color: "from-red-400 to-red-600",
      image: "/assets/sanctuary/kalsubai.jpg",
      profilepic: "/assets/sanctuary/kalsubai.jpg"

    },
    {
      color: "from-red-400 to-red-600",
      image: "/assets/sanctuary/kalsubai.jpg",
      profilepic: "/assets/sanctuary/kalsubai.jpg"

    },
  ]

  return (
    <div className="flex gap-4 overflow-x-auto px-4 pb-5 border-b-2 *:border-[#012c18]">
      {profiles.map((profile, i) => (
        <div
          key={i}
          className={`relative min-w-[150px] border-2 overflow-hidden rounded-xl bg-transparent p-2`}           //bg-gradient-to-br ${profile.color}
        >
          <div className="absolute flex justify-center items-center rounded-full border-2 border-[#012c18] bg-white pr-3 top-5 left-5">
            <div className="h-5 w-5 rounded-full border-2 border-black p-0 bg-[#edf2f7]">
              <img src={profile.profilepic} alt="Profile" className="rounded-full h-full border-1 border-[#012c18] object-cover" />
            </div>
            <h1 className="text-black ">
              profile pic
            </h1>
            
          </div>
          <img src={profile.image} alt="Profile" className="rounded-lg h-full border-2 object-cover" />
        </div>
      ))}
    </div>
  )
}

