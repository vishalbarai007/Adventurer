import ContactForm from "../support/ContactFormFooter";
import Copyright from "../support/Copyright";
import SocialMedia from "../support/SocialMedia";
import UsefulLinks from "../support/UsefulLinks";

const Footer = (props: { color: any }) => {
  return (
    <div
      className="FooterBlock h-fit w-full mt-10 text-[#EADED0] bg-cover"
      style={{ backgroundColor: props.color || "#1F3D3B" }}
    >
      <div className="h-full w-full p-10 inset-0 bg-black bg-opacity-50">
        <footer className="footer w-full p-4 grid gap-3 grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 auto-rows-auto md:gap-5">
          <div className="col-span-1 flex justify-center sm:mb-80 md:mb-60">
            <UsefulLinks />
          </div>
          <div className="col-span-1">
            <SocialMedia />
          </div>
          <div className="col-span-1">
            <ContactForm />
          </div>
        </footer>
        <Copyright />
      </div>
    </div>
  );
};

export default Footer;
