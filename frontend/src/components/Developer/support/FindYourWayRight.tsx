import { GrMapLocation } from "react-icons/gr";

const FindYourWayRight = () => {
  return (
    <div className="w-full lg:w-1/2 flex justify-center lg:justify-start">
      <div className="w-full max-w-md p-4 sm:p-6 md:p-10 border border-black shadow bg-white">
        <div className="w-full flex justify-center items-center">
          <GrMapLocation className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 text-[#1fa396]" />
        </div>
        <h3 className="text-xl sm:text-2xl text-center font-semibold text-[#1fa396] mb-4">
          Where do you want to go?
        </h3>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-extrabold" htmlFor="to">
              To
            </label>
            <input
              id="to"
              type="text"
              placeholder="To"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#1a8a7f]"
            />
            <div className="flex items-center mt-2">
              <input
                id="explore"
                type="checkbox"
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-[#1a8a7f]"
              />
              <label htmlFor="explore" className="ml-2 text-sm">
                I am exploring destinations
              </label>
            </div>
          </div>
          <div>
            <label className="block text-sm font-extrabold" htmlFor="from">
              From
            </label>
            <input
              id="from"
              type="text"
              placeholder="From"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#1a8a7f]"
            />
          </div>
          <div>
            <input
              id="description"
              type="text"
              placeholder="Description (if any)"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#1a8a7f]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">
              Departure Date (Choose Any)
            </label>
            <div className="flex flex-wrap gap-2 mt-2">
              <button
                type="button"
                className="px-4 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded hover:bg-blue-700 hover:text-white"
              >
                Fixed
              </button>
              <button
                type="button"
                className="px-4 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded hover:bg-blue-700 hover:text-white"
              >
                Flexible
              </button>
              <button
                type="button"
                className="px-4 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded hover:bg-blue-700 hover:text-white"
              >
                Anytime
              </button>
            </div>
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-[#1fa396] rounded hover:bg-[#1a8a7f]"
          >
            Next
          </button>
        </form>
      </div>
    </div>
  )
}

export default FindYourWayRight

