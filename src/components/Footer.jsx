import {
  FaFacebookF,
  FaInstagram,

  FaYoutube,
} from "react-icons/fa";
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
    title: "Customer Service",
    links: [
      { label: "Shipping & Returns", href: "#" },
      { label: "Order Tracking", href: "#" },
      { label: "Gift Cards", href: "#" },
      { label: "Store Locator", href: "#" },
      { label: "Careers", href: "#" },
    ],
  },
  {
    title: "Your Account",
    links: [
      { label: "My Account", href: "#" },
      { label: "Order History", href: "#" },
      { label: "Wishlist", href: "#" },
      { label: "Newsletter", href: "#" },
      { label: "Track Order", href: "#" },
    ],
  },
];
const socialLinks = [
  {
    label: "Facebook",
    href: "#",
    icon: FaFacebookF,
  },
  {
    label: "Instagram",
    href: "#",
    icon: FaInstagram,
  },
  {
    label: "Twitter",
    href: "#",
    icon: RiTwitterXFill,
  },
  {
    label: "YouTube",
    href: "#",
    icon: FaYoutube,
  },
];

const paymentMethods = ["Visa", "Mastercard", "PayPal", "Apple Pay"];

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-10 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <a
              href="#"
              className="text-2xl md:text-3xl lg:text-4xl font-playfair tracking-tight"
            >
              FASHION
            </a>

            <p className="text-sm text-white/60 mt-4 max-w-sm">
              Discover the latest trends in fashion. We bring you curated
              collections crafted for confidence and elegance.
            </p>

            <div className="mt-6 space-y-1 text-sm flex items-center gap-2 flex-wrap">
              <p className="text-white/60">Contact Us:</p>
              <div className="flex flex-wrap items-center gap-3">
                <a href="mailto:support@fashion.com">support@fashion.com</a>
              <a href="tel:+12345678900">+1 (234) 567-8900</a>
              </div>
            </div>

            {/* Social */}
            <div className="flex gap-4 mt-6">
  {socialLinks.map((social) => {
    const Icon = social.icon;

    return (
      <a
        key={social.label}
        href={social.href}
        aria-label={social.label}
        className="w-10 h-10 border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition"
      >
        <Icon className="text-sm" />
      </a>
    );
  })}
</div>

          </div>

          {/* Links */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h4 className="text-sm font-semibold uppercase tracking-wider mb-4">
                {section.title}
              </h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-white/60 hover:text-[#8B2C34] transition"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-10 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-white/60 text-center md:text-left">
              © 2025 FASHION. All Rights Reserved.
            </p>

            <div className="flex gap-4 flex-wrap">
              {paymentMethods.map((method) => (
                <span
                  key={method}
                  className="text-xs text-white/40 uppercase tracking-wider"
                >
                  {method}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
