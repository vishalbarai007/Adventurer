// import Image from "next/image"

export function ProfileCards() {
  const profiles = [
    {
      color: "from-yellow-400 to-orange-500",
      image: "/assets/sanctuary/andheri.jpg",
      profilepic: "/assets/sanctuary/andheri.jpg"
    },
    {
      color: "from-green-400 to-green-600",
      image: "/assets/sanctuary/bor.jpg",
      profilepic: "/assets/sanctuary/bor.jpg"
    },
    {
      color: "from-blue-400 to-blue-600",
      image: "/assets/sanctuary/lonar.jpg",
      profilepic: "/assets/sanctuary/lonar.jpg"

    },
    {
      color: "from-pink-400 to-pink-600",
      image: "/assets/sanctuary/koyna.jpg",
      profilepic: "/assets/sanctuary/koyna.jpg"

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
  ]

  return (
    <div className="flex gap-4 overflow-x-auto px-4 pb-5 border-b-2 *:border-[#012c18]">
      {profiles.map((profile, i) => (
        <div
          key={i}
          className={`relative min-w-[200px] border-2 overflow-hidden rounded-xl bg-transparent p-2`}           //bg-gradient-to-br ${profile.color}
        >
          <div className="absolute flex justify-center items-center rounded-full border-2 border-[#012c18] bg-white pr-5 top-5 left-5">
            <div className="h-10 w-10 rounded-full border-2 border-black p-0 bg-[#edf2f7]">
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

