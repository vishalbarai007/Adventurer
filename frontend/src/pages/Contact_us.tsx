import ContactInfo from "../components/Developer/support/ContactInfo";
import ContactUsForm from "../components/Developer/support/ContactUsForm";
import ContactUsImage from "../components/Developer/support/ContactUsImage";
import Footer from "../components/Developer/support/Footer";
// import PreLoginMenuBar from "../components/Shadcn/main/pre_login_menubar";
import { NavigationMenuDemo } from "../components/Shadcn/main/NavigationMenu";


const ContactForm = () => {
  return (
    <div className="bg-[#112c1d] min-h-screen py-10 pb-0">
      {/* <PreLoginMenuBar /> */}
           <NavigationMenuDemo/>
      
      <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto p-6">
        <ContactUsImage />
        <ContactUsForm />
        <ContactInfo />
      </div>
      {/* Pass the color prop to the Footer */}
      <Footer color="#112c1d" />
    </div>
  );
};

export default ContactForm;
