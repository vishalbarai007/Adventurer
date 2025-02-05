import axios from "axios"
import { useState, useEffect } from "react"

interface TravelCategory {
  heading: string
  image: string
}

const TravelCategories = () => {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<TravelCategory[]>([])

  useEffect(() => {
    axios
      .get("http://localhost:5000/travelcategories")
      .then((response) => {
        console.log("Fetched travel categories data:", response.data)
        // Convert the object of objects to an array of objects
        const categoriesArray = Object.values(response.data) as TravelCategory[]
        setData(categoriesArray)
        setLoading(false)
      })
      .catch((error) => {
        console.error("Error fetching Travel Categories data:", error)
        setLoading(false)
      })
  }, [])

  if (loading) return <p className="text-center py-8">Loading...</p>

  return (
    <div className="px-4 py-8 sm:px-6 md:px-8 lg:px-16">
      <h1
        className="text-3xl sm:text-4xl md:text-5xl font-light text-center capitalize pt-6 sm:pt-8 md:pt-10"
        data-aos="fade-up"
      >
        Your Travel Categories
      </h1>
      <p
        className="w-full sm:w-3/4 md:w-2/3 lg:w-1/2 mx-auto mt-4 sm:mt-6 md:mt-8 text-center leading-[25px] opacity-60"
        data-aos="fade-up"
      >
        Discover your next adventure with our curated selection of travel categories. Explore diverse destinations and
        unique experiences.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 md:gap-8 p-4 sm:p-6 md:p-8 mx-auto max-w-7xl">
        {data.map((item, index) => (
          <div key={index} className="rounded-xl relative w-full h-64 sm:h-56 md:h-64 bg-zinc-700" data-aos="fade-up">
            <div className="overflow-hidden rounded-xl w-full h-full inset-0 bg-black bg-opacity-50">
              <img
                src={item.image || "/assets/Blogs/Bg.webp"}
                alt={`Image ${index + 1}`}
                title={item.heading}
                className="w-full h-full object-cover rounded-xl transition-transform duration-1000 hover:scale-110"
              />
            </div>
            <h2 className="text-center text-xl sm:text-2xl font-bold absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white text-stroke">
              {item.heading}
            </h2>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TravelCategories

