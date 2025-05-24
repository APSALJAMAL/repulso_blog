import { FaFacebookF, FaTwitter, FaLinkedinIn } from 'react-icons/fa'
import { motion } from "framer-motion";
import { fadeIn, textVariant } from "../utils/motion";
import { Link } from 'react-router';
import logo from "@/assets/images/Repulsow.png";

const Footer = () => {
  const footerLinks = {
    company: [
      { name: 'About', href: '#' },
      { name: 'Terms of Use', href: '#' },
      { name: 'Privacy Policy', href: '#' },
      { name: 'How it Works', href: '#' },
      { name: 'Contact Us', href: '#' },
    ],
    getHelp: [
      { name: 'Support Career', href: '#' },
      { name: '24h Service', href: '#' },
      { name: 'Quick Chat', href: '#' },
    ],
    support: [
      { name: 'FAQ', href: '#' },
      { name: 'Policy', href: '#' },
      { name: 'Business', href: '#' },
    ],
    contact: [
      { name: 'WhatsApp', href: '#' },
      { name: 'Support 24', href: '#' },
    ],
  }

  return (
    <motion.footer 
      variants={fadeIn('up', 0.2)}
      initial="hidden"
      whileInView="show"
      className="bg-gray-50 py-16 px-4 sm:px-8"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div 
          variants={fadeIn('up', 0.3)}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10"
        >
          {/* Left Brand Column */}
          <motion.div 
            variants={fadeIn('right', 0.4)}
            className="lg:col-span-4"
          >
            <div className="flex flex-col gap-4">
              <motion.div 
                variants={fadeIn('down', 0.5)}
                className="flex items-center space-x-3"
              >
                <Link to="/" className="flex items-center gap-3">
            <img
              className="w-16 h-18 object-contain hover:scale-105 transition-transform duration-200"
              src={logo}
              alt="logo"
            />
            <div className="flex flex-col justify-center leading-tight uppercase font-modern space-y-0.5">
              <span className="text-base sm:text-xl font-bold tracking-[0.1em]">
                Chembavalam
              </span>
              <span className="text-[10px] sm:text-xs tracking-[0.1em] text-gray-500 ml-0.5">
                Research Base Trust
              </span>
            </div>
          </Link>
              </motion.div>

              <motion.p 
                variants={fadeIn('up', 0.6)}
                className="text-gray-600 leading-relaxed"
              >
                Chembavalam Research Base Trust is a passionate archaeological organization dedicated to unearthing and preserving the rich cultural heritage of Tamil Nadu.
              </motion.p>

              <motion.div 
                variants={fadeIn('up', 0.7)}
                className="flex gap-4 mt-4"
              >
                {[FaFacebookF, FaTwitter, FaLinkedinIn].map((Icon, i) => (
                  <motion.a
                    key={i}
                    whileHover={{ scale: 1.1 }}
                    href="#"
                    className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 hover:bg-indigo-600 hover:text-white transition-colors"
                  >
                    <Icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </motion.div>
            </div>
          </motion.div>

          {/* Right Links Columns */}
          <motion.div 
            variants={fadeIn('left', 0.4)}
            className="lg:col-span-8"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {Object.entries(footerLinks).map(([category, links], i) => (
                <motion.div key={category} variants={fadeIn('up', 0.3 * (i + 1))}>
                  <h3 className="text-lg font-semibold mb-4 text-gray-900 capitalize">
                    {category}
                  </h3>
                  <ul className="space-y-3 text-sm">
                    {links.map((link, index) => (
                      <li key={index}>
                        <motion.a
                          whileHover={{ x: 5 }}
                          href={link.href}
                          className="text-gray-600 hover:text-gray-900 transition-all"
                        >
                          {link.name}
                        </motion.a>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Copyright */}
        <motion.div 
          variants={fadeIn('up', 0.8)}
          className="border-t border-gray-200 mt-16 pt-6"
        >
          <div className="flex flex-col md:flex-row items-center justify-between text-sm text-gray-500">
            <motion.p variants={fadeIn('right', 1)}>
              © {new Date().getFullYear()} REPULSO. All rights reserved.
            </motion.p>
            {/* You can optionally add a "Back to top" link or policy here */}
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;
