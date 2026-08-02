import ContactInfo from "@/components/contact/ContactInfo";
import ContactUsForm from "@/components/contact/ContactUsForm";
import ContactUsImage from "@/components/contact/ContactUsImage";
import Footer from "@/components/common/Footer";
import { NavigationMenuDemo } from "@/components/common/NavigationMenu";
import useSEO from "@/hooks/useSEO";

const ContactForm = () => {
  useSEO({
    title: 'Contact Us | Adventurer',
    description: 'Get in touch with the Adventurer support team. Have questions about trek bookings, guide listings, or payment escrows? We are here to help.',
    keywords: 'contact adventurer, support, tour guide help, trek booking issues'
  });

  return (
    <div className="bg-[#F8F9FB] text-[#171717] min-h-screen font-jakarta">
      <NavigationMenuDemo />

      <div className="max-w-[1280px] mx-auto py-12 px-6">
        <div className="text-center mb-10">
          <span className="text-[#3A8DFF] font-bold text-sm tracking-wider uppercase mb-2 block">Get In Touch</span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#171717]">Contact Our Team</h1>
        </div>

        <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto bg-white p-6 md:p-10 rounded-[28px] shadow-sm border border-gray-200">
          <ContactUsImage />
          <ContactUsForm />
          <div className="md:col-span-2">
            <ContactInfo />
          </div>
        </div>
      </div>
      
      <Footer color={undefined} />
    </div>
  );
};

export default ContactForm;
