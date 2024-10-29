

const Footer = () => {
  return (
    <>
      <div className="h-fit w-full bg-zinc-950">

        <footer className="h-fit w-full flex justify-center align-middle">
          <div className="left-block  bg-red-700 h-fit w-[70%] p-20">
            
          </div>

          <div className="right-block h-fit w-[30%] bg-violet-900">
          <h1 className="text-center font-bold text-[50px]">
            <span className="text-blue-600">Let's</span> Talk to you.
          </h1>

            <form action="" className="h-fit w-[100%] p-10 ">
              
            <div>
            <label htmlFor="name" className="block text-sm font-medium text-white">Name</label>
            <input type="text" id="name" name="name" required 
                   className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"/>
        </div>
        
        <div>
            <label htmlFor="email" className="block text-sm font-medium text-white">Email</label>
            <input type="email" id="email" name="email" required 
                   className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"/>
        </div>

        <div>
            <label htmlFor="message" className="block text-sm font-medium text-white">Your Message</label>
            <textarea id="message" name="message" rows="4" required 
                      className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
            </textarea>
        </div>

        <button type="submit" 
                className="w-1/4 px-4 py-2 font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">
            Contact us
        </button>

            </form>
          </div>



        </footer>
      </div>
    </>
  )
}

export default Footer;
