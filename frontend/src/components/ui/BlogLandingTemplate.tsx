import a from "../../../public/assets/BrandLogos/MakeMyTrip/MMK.png";

const BlogLandingTemplate = () => {
  return (
    <>
      <div className="BlogsLanding h-[600px] w-full flex items-center justify-center bg-zinc-800">
        <div className="flex flex-col items-center text-center">
          <img src={a} alt="MakeMyTrip Logo" className="h-10 w-20 mb-4" />
          <h2 className="text-white text-2xl font-semibold mb-2 text-stroke">Adventurer</h2>
          <h1 className="text-white text-5xl font-bold text-stroke" data-aos="fade-right">
            Perfect Place for your Adventure Stories.
          </h1>


        </div>
      </div>
    </>
  );
};

export default BlogLandingTemplate;
