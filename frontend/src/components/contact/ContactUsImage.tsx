const Contactusimg = "https://res.cloudinary.com/djk32h7rn/image/upload/q_auto,f_auto/v1778056095/adventurer_assets_migration/images/ContactUs_twhavr.png";

const ContactUsImage = () => {
  return (
    <div>
         <div className="relative w-full h-fit md:h-auto rounded-lg overflow-hidden">
            <img
              src={Contactusimg}
              alt="Contact Us"
              className="w-full h-full object-cover object-center"
            />
          </div>
        
      
    </div>
  )
}

export default ContactUsImage;
