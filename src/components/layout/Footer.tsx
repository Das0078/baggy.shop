import React from 'react';
import { FaTwitter, FaFacebookF, FaInstagram, FaGithub } from 'react-icons/fa';
import { FaCcVisa, FaCcMastercard, FaCcPaypal, FaCcApplePay } from 'react-icons/fa';
import { SiGooglepay } from 'react-icons/si';

export const Footer: React.FC = () => {
  const footerSections = [
    {
      title: 'COMPANY',
      links: [
        { label: 'About', href: '#about' },
        { label: 'Features', href: '#features' },
        { label: 'Works', href: '#works' },
        { label: 'Career', href: '#career' },
      ],
    },
    {
      title: 'HELP',
      links: [
        { label: 'Customer Support', href: '#support' },
        { label: 'Delivery Details', href: '#delivery' },
        { label: 'Terms & Conditions', href: '#terms' },
        { label: 'Privacy Policy', href: '#privacy' },
      ],
    },
    {
      title: 'FAQ',
      links: [
        { label: 'Account', href: '#account' },
        { label: 'Manage Deliveries', href: '#manage-deliveries' },
        { label: 'Orders', href: '#orders' },
        { label: 'Payments', href: '#payments' },
      ],
    },
    {
      title: 'RESOURCES',
      links: [
        { label: 'Free eBooks', href: '#ebooks' },
        { label: 'Development Tutorial', href: '#tutorial' },
        { label: 'How to - Blog', href: '#blog' },
        { label: 'Youtube Playlist', href: '#youtube' },
      ],
    },
  ];

  const socialLinks = [
    { icon: <FaTwitter size={15} />, href: 'https://twitter.com', label: 'Twitter' },
    { icon: <FaFacebookF size={15} />, href: 'https://facebook.com', label: 'Facebook' },
    { icon: <FaInstagram size={16} />, href: 'https://instagram.com', label: 'Instagram' },
    { icon: <FaGithub size={16} />, href: 'https://github.com', label: 'GitHub' },
  ];

  return (
    <footer className="bg-theme-bg-footer pt-32 sm:pt-36 md:pt-40 pb-12 text-theme-text-main border-t border-theme-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-2 md:grid-cols-12 gap-8 lg:gap-12 pb-12 border-b border-theme-border">
          
          {/* Brand Info & Social Column */}
          <div className="col-span-2 md:col-span-4 lg:col-span-4 flex flex-col justify-between pr-0 md:pr-4">
            <div>
              <a
                href="#"
                className="font-display font-black text-2xl sm:text-3xl tracking-tight text-theme-text-main"
              >
                baGGy
              </a>
              <p className="mt-4 text-xs sm:text-sm text-theme-text-muted leading-relaxed max-w-sm">
                We have clothes that suits your style and which you&apos;re proud to
                wear. From women to men.
              </p>
            </div>

            {/* Social Media Icons */}
            <div className="flex items-center gap-3 mt-6">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-9 h-9 rounded-full bg-white border border-theme-border flex items-center justify-center text-theme-text-main hover:bg-theme-primary hover:text-white hover:border-theme-primary transition-all duration-200 shadow-2xs"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* 4 Link Columns */}
          <div className="col-span-2 md:col-span-8 lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-4">
            {footerSections.map((section) => (
              <div key={section.title} className="flex flex-col">
                <h4 className="text-xs sm:text-sm font-semibold tracking-widest text-theme-text-main uppercase mb-4 font-sans">
                  {section.title}
                </h4>
                <ul className="space-y-2.5 text-xs sm:text-sm">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-theme-text-muted hover:text-theme-primary transition-colors inline-block"
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

        {/* Bottom Sub-footer */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-theme-text-muted">
          <p className="text-center sm:text-left">
            baGGy &copy; 2000-2026, All Rights Reserved
          </p>

          {/* Payment Method Badges */}
          <div className="flex items-center gap-2">
            <div className="bg-white border border-theme-border rounded px-2.5 py-1.5 flex items-center justify-center h-8 w-12 text-[#1A1F71] shadow-2xs" title="Visa">
              <FaCcVisa size={26} />
            </div>
            <div className="bg-white border border-theme-border rounded px-2.5 py-1.5 flex items-center justify-center h-8 w-12 text-[#EB001B] shadow-2xs" title="Mastercard">
              <FaCcMastercard size={26} />
            </div>
            <div className="bg-white border border-theme-border rounded px-2.5 py-1.5 flex items-center justify-center h-8 w-12 text-[#003087] shadow-2xs" title="PayPal">
              <FaCcPaypal size={24} />
            </div>
            <div className="bg-white border border-theme-border rounded px-2.5 py-1.5 flex items-center justify-center h-8 w-12 text-black shadow-2xs" title="Apple Pay">
              <FaCcApplePay size={26} />
            </div>
            <div className="bg-white border border-theme-border rounded px-2.5 py-1.5 flex items-center justify-center h-8 w-12 text-[#4285F4] shadow-2xs" title="Google Pay">
              <SiGooglepay size={26} />
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};
