import React from "react";
import { Link } from "react-router-dom";
import { Images } from "../asests";
import { FaExternalLinkAlt } from "react-icons/fa";
import '../styles/Footer.css'

function Footer() {
  const FooterProduct = ["Status", "Documentation", "Roadmap", "Pricing"];
  const FooterCommunity = [
    "Discord",
    "GitHub repository",
    "Twitter",
    "LinkedIn",
    "OSS Friends",
  ];
  const FooterCompany = [
    "About",
    "Contact",
    "Terms of Service",
    "Privacy Policy",
  ];
  return (
    <footer className="footer-div">
      <div className="footer-content">
        <div className="footer-1">
          <Link to={"/"}>
            <img src={Images.Logo} alt="FormBot" />
          </Link>
          <span>Made with ❤️ by</span>
          <span className="under">@cuvette</span>
        </div>
        <div className="footer-maps">
          <span className="footer-head">Product</span>
          <div className="footer-maps-data">
            {FooterProduct.map((e,index) => (
              <div key={index} className="text-products">
                <span>{e}</span>
                <FaExternalLinkAlt className="link-icon"/>
              </div>
            ))}
          </div>
        </div>
        <div className="footer-maps">
          <span className="footer-head">Community</span>
          <div className="footer-maps-data">
            {FooterCommunity.map((e,index) => (
              <div key={index} className="text-products">
                <span>{e}</span>
                <FaExternalLinkAlt className="link-icon"/>
              </div>
            ))}
          </div>
        </div>
        <div className="footer-maps">
          <span className="footer-head">Company</span>
          <div className="footer-maps-data">
            {FooterCompany.map((e,index) => (
                <span key={index} className="text-products">{e}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
