import ContactForm from "@/components/contact/ContactFormFooter";
import Copyright from "@/components/common/Copyright";
import SocialMedia from "@/components/common/SocialMedia";
import UsefulLinks from "@/components/common/UsefulLinks";
// import ContactUsForm from "@/components/contact/ContactUsForm";

const Footer = (props: { color: string | undefined }) => {
  return (
    <div
      className="FooterBlock h-fit w-full mt-10 text-[#EADED0] bg-cover"
      style={{ backgroundColor: props.color || "#1F3D3B" }}
    >
      <div className="h-full w-full p-10 inset-0 bg-black bg-opacity-50">
        <footer
          className="footer w-full  grid gap-3 grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 auto-rows-auto grid-rows-custom "
        >
          <div className="col-span-1">
            <UsefulLinks />
          </div>
          <div className="col-span-1">
            <SocialMedia />
          </div>
          <div className="col-span-1">
            <ContactForm />
            {/* <ContactUsForm/> */}
          </div>
        </footer>
        <Copyright />
      </div>
    </div>
  );
};

export default Footer;
