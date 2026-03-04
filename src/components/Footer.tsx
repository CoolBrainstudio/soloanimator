import Link from 'next/link';
import { Film, Instagram, Mail, Youtube } from 'lucide-react';

const footerLinks = {
  platform: [
    { href: '/', label: 'Home' },
    { href: '/animators', label: 'Animators' },
    { href: '/hire', label: 'Hire' },
    { href: '/blog', label: 'Blog' },
    { href: '/about', label: 'About' },
  ],
  legal: [
    { href: '/privacy', label: 'Privacy Policy' },
    { href: '/terms', label: 'Terms of Service' },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-[#0f0f0f] border-t border-[#2a2a2a] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Film className="w-8 h-8 text-purple-500" />
              <span className="text-xl font-bold text-white">SoloAnimator</span>
            </Link>
            <p className="text-gray-400 mb-4 max-w-md">
              Watch. Connect. Create. A niche animation ecosystem where original 
              short animation series come to life and talented animators showcase their skills.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Platform</h3>
            <ul className="space-y-2">
              {footerLinks.platform.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-purple-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-purple-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-[#2a2a2a] mt-8 pt-8 text-center text-gray-500">
          <p>&copy; {new Date().getFullYear()} SoloAnimator Network. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
