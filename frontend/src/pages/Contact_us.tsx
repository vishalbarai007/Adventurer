import ContactInfo from "../components/support/ContactInfo";
import ContactUsForm from "../components/support/ContactUsForm";
import ContactUsImage from "../components/support/ContactUsImage";
import Footer from "../components/ui/Footer";
import PreLoginMenuBar from "../components/ui/pre_login_menubar";



const ContactForm = () => {

  return (
    <div className="bg-[#112c1d] min-h-screen py-10 pb-0">
      <PreLoginMenuBar/>
      <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto p-6">
        <ContactUsImage />
        <ContactUsForm />
        <ContactInfo />

      </div>
      <Footer/>
    </div>
  );
};

export default ContactForm;
