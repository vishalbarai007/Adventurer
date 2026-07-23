import ContactInfo from "@/components/contact/ContactInfo";
import ContactUsForm from "@/components/contact/ContactUsForm";
import ContactUsImage from "@/components/contact/ContactUsImage";
import Footer from "@/components/common/Footer";
// import PreLoginMenuBar from "../components/Shadcn/main/pre_login_menubar";
import { NavigationMenuDemo } from "@/components/common/NavigationMenu";
import useSEO from "@/hooks/useSEO";


const ContactForm = () => {
  useSEO({
    title: 'Contact Us | Adventurer',
    description: 'Get in touch with the Adventurer support team. Have questions about trek bookings, guide listings, or payment escrows? We are here to help.',
    keywords: 'contact adventurer, support, tour guide help, trek booking issues'
  });

  return (
    <div className="bg-[#112c1d] min-h-screen py-10 pb-0">
      {/* <PreLoginMenuBar /> */}
      <NavigationMenuDemo />

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
