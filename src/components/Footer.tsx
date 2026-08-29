import React from 'react';
import { ArrowUp, Phone, MessageCircle, Lock, Cookie } from 'lucide-react';
import logoImg from '../assets/images/logo.webp';
import { AppPage } from '../types';

interface FooterProps {
  onNavigate?: (page: AppPage) => void;
  onOpenCookieSettings?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenCookieSettings }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNav = (page: AppPage) => {
    if (onNavigate) {
      onNavigate(page);
      scrollToTop();
    }
  };

  return (
    <footer className="w-full bg-zinc-950 text-white pt-16 pb-12 border-t border-zinc-900 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        
        {/* Main Footer Row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 sm:gap-12 pb-14 border-b border-zinc-800/80">
          
          {/* Brand & Mission with Logo */}
          <div className="md:col-span-6 space-y-4">
            <div className="flex items-center gap-3">
              <button
                onClick={() => handleNav('home')}
                id="footer-brand-logo"
                className="flex items-center gap-3 select-none group cursor-pointer"
                title="Easy House Cameroon"
              >
                <div className="bg-white p-1.5 rounded-xl border border-zinc-200/20 shadow-xs group-hover:opacity-95 transition-opacity">
                  <img
                    src={logoImg}
                    alt="Easy House Cameroon Logo"
                    className="h-10 sm:h-12 w-auto object-contain"
                  />
                </div>
              </button>
            </div>

            <p className="text-xs sm:text-[13px] text-zinc-400 leading-relaxed max-w-md">
              Easy House Cameroon is a Real Estate Company Based in Buea, Cameroon and operational in Doula, Limbe & Yde with the goal of bridging the gap between property owners (Landlords, Landladies) and Potential Clients in need of their Properties to Rent or Buy.
            </p>

            <div className="pt-2 text-xs text-zinc-400">
              <span className="text-zinc-200 font-semibold">Your Comfort, Our Priority</span>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-xs text-zinc-400">
              <li>
                <button
                  onClick={() => handleNav('home')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Home Page
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('properties')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Properties for Rent
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('about')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('privacy')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('terms')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Terms & Conditions
                </button>
              </li>
              {onOpenCookieSettings && (
                <li>
                  <button
                    onClick={onOpenCookieSettings}
                    className="hover:text-amber-400 text-zinc-400 transition-colors cursor-pointer text-left flex items-center gap-1.5"
                  >
                    <Cookie className="w-3 h-3 text-amber-500" />
                    <span>Cookie Settings</span>
                  </button>
                </li>
              )}
            </ul>
          </div>

          {/* Direct Contact Column */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Contact Consultant
            </h4>
            <div className="text-xs text-zinc-300 font-medium">
              Enownfor Manyi-Oben
            </div>
            
            <div className="space-y-2 pt-1 text-xs">
              <a
                href="https://wa.me/237674121117"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2.5 text-emerald-400 hover:text-emerald-300 transition-colors"
              >
                <MessageCircle className="w-4 h-4 shrink-0" />
                <span>WhatsApp: 674121117</span>
              </a>

              <a
                href="tel:+237677499722"
                className="flex items-center gap-2.5 text-zinc-300 hover:text-white transition-colors"
              >
                <Phone className="w-4 h-4 shrink-0" />
                <span>Direct Call: 677499722</span>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom copyright row with secluded Admin access & Legal links */}
        <div className="pt-8 flex flex-wrap items-center justify-between gap-4 text-[11px] text-zinc-500">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <p>© {new Date().getFullYear()} Easy House Cameroon. All rights reserved.</p>
            <span className="hidden sm:inline text-zinc-700">•</span>
            <button
              onClick={() => handleNav('privacy')}
              className="text-zinc-500 hover:text-zinc-300 transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <span className="text-zinc-700">•</span>
            <button
              onClick={() => handleNav('terms')}
              className="text-zinc-500 hover:text-zinc-300 transition-colors cursor-pointer"
            >
              Terms & Conditions
            </button>
            {onOpenCookieSettings && (
              <>
                <span className="text-zinc-700">•</span>
                <button
                  onClick={onOpenCookieSettings}
                  className="text-zinc-500 hover:text-amber-400 transition-colors cursor-pointer flex items-center gap-1"
                >
                  <Cookie className="w-2.5 h-2.5 text-amber-500/80" />
                  <span>Cookie Preferences</span>
                </button>
              </>
            )}
          </div>

          <div className="flex items-center gap-6">
            {/* Secluded Admin Portal Trigger */}
            <button
              onClick={() => handleNav('admin')}
              className="text-zinc-600 hover:text-zinc-400 transition-colors cursor-pointer flex items-center gap-1"
              title="Portal Access"
            >
              <Lock className="w-3 h-3" />
              <span>Portal</span>
            </button>

            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 text-zinc-400 hover:text-white transition-colors cursor-pointer ml-2"
            >
              <span>Back to top</span>
              <ArrowUp className="w-3 h-3" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
