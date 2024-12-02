import '@fortawesome/fontawesome-free/css/all.min.css';


const AboutUsFeatures = () => {
    return (
        <div>
            <div className="mt-16">
                <h2 className="text-2xl font-bold text-gray-800 text-center mb-8">
                    Why Choose Adventurer?
                </h2>
                <div className="grid md:grid-cols-3 gap-8">
                    <div className="text-center">
                        <div className="p-4 bg-white shadow-lg rounded-full w-16 h-16 mx-auto">
                            <i className="fas fa-shield-alt text-[#233115] text-3xl"></i>
                        </div>
                        <h3 className="text-lg font-semibold text-[#233115] mt-4">
                            Safety
                        </h3>
                        <p className="text-[#EADED0]">
                            Travel safely with over 10 years of expertise.
                        </p>
                    </div>
                    <div className="text-center">
                        <div className="p-4 bg-white shadow-lg rounded-full w-16 h-16 mx-auto">
                            <i className="fas fa-tags text-[#233115] text-3xl"></i>
                        </div>
                        <h3 className="text-lg font-semibold text-[#233115] mt-4">
                            Value
                        </h3>
                        <p className="text-[#EADED0]">
                            Competitive pricing without compromising quality.
                        </p>
                    </div>
                    <div className="text-center">
                        <div className="p-4 bg-white shadow-lg rounded-full w-16 h-16 mx-auto">
                            <i className="fas fa-headset text-[#233115] text-3xl"></i>
                        </div>
                        <h3 className="text-lg font-semibold text-[#233115] mt-4">
                            Support
                        </h3>
                        <p className="text-[#EADED0]">
                            24/7 assistance for a convenient and hassle-free experience.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AboutUsFeatures
