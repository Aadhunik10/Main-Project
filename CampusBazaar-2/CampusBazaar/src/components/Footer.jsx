import React from "react";
import { FaFacebook, FaInstagram, FaGithub, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#293325] text-[#DDEBDC] mt-12">
      <div className="max-w-7xl mx-auto px-6 py-10 grid md:grid-cols-4 gap-8">

        {/* Logo & About */}
        <div>
          <h2 className="text-2xl font-bold text-white">
            🎓 Campus<span className="text-[#4CBB17]">Baazar</span>
          </h2>
          <p className="mt-4 text-sm leading-6 text-[#DDEBDC]">
            Buy and sell second-hand items within your campus community.
            Save money, reduce waste, and help fellow students.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white font-semibold text-lg mb-4">
            Quick Links
          </h3>

          <ul className="space-y-2">
            <li><a href="/" className="hover:text-[#4CBB17]">Home</a></li>
            <li><a href="/sellproduct" className="hover:text-[#4CBB17]">Sell Item</a></li>
            <li><a href="/login" className="hover:text-[#4CBB17]">Login</a></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-white font-semibold text-lg mb-4">
            Support
          </h3>

          <ul className="space-y-2">
            <li><a href="/" className="hover:text-[#4CBB17]">Help Center</a></li>
            <li><a href="/" className="hover:text-[#4CBB17]">Privacy Policy</a></li>
            <li><a href="/" className="hover:text-[#4CBB17]">Terms & Conditions</a></li>
            <li><a href="/" className="hover:text-[#4CBB17]">FAQs</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-white font-semibold text-lg mb-4">
            Contact Us
          </h3>

          <p>Email: campusbaazar@gmail.com</p>
          <p className="mt-2">Pokhara, Nepal</p>

          <div className="flex gap-4 mt-5 text-2xl">
            <a href="#"><FaFacebook className="hover:text-[#4CBB17]" /></a>
            <a href="#"><FaInstagram className="hover:text-[#48872B]" /></a>
            <a href="#"><FaGithub className="hover:text-white" /></a>
            <a href="#"><FaEnvelope className="hover:text-[#4CBB17]" /></a>
          </div>
        </div>

      </div>

      <div className="border-t border-[#39542C] text-center py-5 text-sm">
        © {new Date().getFullYear()} CampusBaazar. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;