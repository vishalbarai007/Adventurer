export function ProfileCards() {
 const profiles = [
  {
    name: "Aarav Mehta",
    color: "from-yellow-400 to-orange-500",
    image: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg",
    profilepic: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg"
  },
  {
    name: "Sneha Desai",
    color: "from-green-400 to-green-600",
    image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg",
    profilepic: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg"
  },
  {
    name: "Rohit Sharma",
    color: "from-blue-400 to-blue-600",
    image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg",
    profilepic: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg"
  },
  {
    name: "Pooja Verma",
    color: "from-pink-400 to-pink-600",
    image: "https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg",
    profilepic: "https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg"
  },
  {
    name: "Karan Patil",
    color: "from-purple-400 to-purple-600",
    image: "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg",
    profilepic: "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg"
  },
  {
    name: "Meera Joshi",
    color: "from-red-400 to-red-600",
    image: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg",
    profilepic: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg"
  },
  {
    name: "Vikram Rao",
    color: "from-indigo-400 to-indigo-600",
    image: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg",
    profilepic: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg"
  },
  {
    name: "Anjali Kapoor",
    color: "from-teal-400 to-teal-600",
    image: "https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg",
    profilepic: "https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg"
  },
  {
    name: "Dev Singh",
    color: "from-cyan-400 to-cyan-600",
    image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg",
    profilepic: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg"
  },
  {
    name: "Neha Kulkarni",
    color: "from-rose-400 to-rose-600",
    image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg",
    profilepic: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg"
  }
];

  return (
    <div className="flex gap-4 overflow-x-auto px-4 pb-5 border-b-2 *:border-[#012c18]">
      {profiles.map((profile, i) => (
        <div
          key={i}
          className={`relative min-w-[150px] border-2 overflow-hidden rounded-xl bg-transparent p-2`}
        >
          <div className="absolute flex justify-center items-center rounded-full border-2 border-[#012c18] bg-white pr-3 top-5 left-5">
            <div className="h-5 w-5 rounded-full border-2 border-black p-0 bg-[#edf2f7]">
              <img
                src={profile.profilepic}
                alt={profile.name}
                className="rounded-full h-full border-1 border-[#012c18] object-cover"
              />
            </div>
            <h1 className="text-black text-sm ml-2">{profile.name}</h1>
          </div>
          <img
            src={profile.image}
            alt={profile.name}
            className="rounded-lg h-full border-2 object-cover"
          />
        </div>
      ))}
    </div>
  );
}
