import Contactusimg from "../../../public/assets/IND/ContactUs.png";

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
