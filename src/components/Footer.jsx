import { FaFacebook, FaLinkedin } from "react-icons/fa";
import footerLogo from "../assets/Logos/education.png";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-100 text-center px-4 py-10">
      <div className="max-w-4xl mx-auto space-y-5">
        {/* Logo + Name */}
        <div className="flex flex-col items-center space-y-2">
          <img src={footerLogo} alt="EduCare Logo" className="w-16 h-16" />
          <h1 className="text-2xl font-bold">
            <span className="text-primary">Edu</span>
            <span className="text-secondary">Care</span>
          </h1>
        </div>

        {/* Contact Info */}
        <div className="text-sm font-medium space-y-1">
          <p>
            <span className="font-semibold">Email:</span> sniekdho@gmail.com
          </p>
          <p>
            <span className="font-semibold">Phone:</span> +880 1717 910578
          </p>
          <p>
            <span className="font-semibold">Address:</span> Mymensingh,
            Bangladesh
          </p>
        </div>

        {/* Social Icons */}
        <div className="flex justify-center gap-6 pt-4">
          <a
            href="https://www.facebook.com/sniekdho.shafiq/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="hover:text-primary transition"
          >
            <FaFacebook size={24} />
          </a>
          <a
            href="https://www.linkedin.com/in/md-shafiqul-islam-754a19183/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="hover:text-primary transition"
          >
            <FaLinkedin size={24} />
          </a>
        </div>

        {/* Copyright */}
        <div className="text-sm font-semibold mt-4">
          &copy; {new Date().getFullYear()} EduCare — All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
