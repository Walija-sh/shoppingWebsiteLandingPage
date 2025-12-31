import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
import { RiTwitterXFill } from "react-icons/ri";

const footerLinks = [
  {
    title: "Quick Links",
    links: [
      { label: "Shop", href: "#" },
      { label: "About Us", href: "#" },
      { label: "Contact", href: "#" },
      { label: "FAQ", href: "#" },
      { label: "Size Guide", href: "#" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Shipping & Returns", href: "#" },
      { label: "Order Tracking", href: "#" },
      { label: "Gift Cards", href: "#" },
      { label: "Store Locator", href: "#" },
      { label: "Careers", href: "#" },
    ],
  }
];

const socialLinks = [
  { label: "Facebook", href: "#", icon: FaFacebookF },
  { label: "Instagram", href: "#", icon: FaInstagram },
  { label: "Twitter", href: "#", icon: RiTwitterXFill },
  { label: "YouTube", href: "#", icon: FaYoutube },
];



export default function Footer() {
  return (
    <footer className="bg-white pt-10">
      
      <div className="bg-black text-white rounded-t-[48px] md:rounded-t-[64px] overflow-hidden">
        <div className="max-w-[1600px] mx-auto px-8 md:px-16 pt-20 pb-10">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12 lg:gap-8">
            
            
            <div className="lg:col-span-2 space-y-6">
              <a href="#" className="text-3xl font-black tracking-tighter uppercase">
                Brand.
              </a>
              <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
                Premium products curated for modern living. Experience the intersection of quality and minimalist design.
              </p>
              
              <div className="space-y-4">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Connect with us</p>
                <div className="flex gap-3">
                  {socialLinks.map((social) => {
                    const Icon = social.icon;
                    return (
                      <a
                        key={social.label}
                        href={social.href}
                        className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300"
                      >
                        <Icon className="text-lg" />
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>

            
            {footerLinks.map((section) => (
              <div key={section.title} className="lg:col-span-1">
                <h4 className="text-sm font-bold uppercase tracking-widest mb-6 text-gray-200">
                  {section.title}
                </h4>
                <ul className="space-y-4">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-[14px] text-gray-400 hover:text-white transition-colors duration-200"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            
            <div className="lg:col-span-1">
              <h4 className="text-sm font-bold uppercase tracking-widest mb-6 text-gray-200">
                Contact
              </h4>
              <div className="space-y-4">
                <a 
                  href="mailto:support@brand.com" 
                  className="block text-sm text-gray-400 hover:text-white underline decoration-gray-700 underline-offset-4"
                >
                  support@brand.com
                </a>
                <p className="text-sm text-gray-400 tracking-tight">+1 (234) 567-8900</p>
              </div>
            </div>

          </div>

          
          <div className="mt-20 pt-10 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
            <p className="text-xs font-medium text-gray-500 tracking-wider">
              © 2025 BRAND. DESIGNED FOR THE MODERN ERA.
            </p>
            <p className="text-xs font-medium text-gray-500 tracking-wider">
              Powered By BRAND
            </p>

            
          </div>
          
        </div>
      </div>
    </footer>
  );
}