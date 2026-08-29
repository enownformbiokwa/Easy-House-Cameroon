import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import logoImg from '../assets/images/logo.webp';
import { AppPage } from '../types';

interface NavbarProps {
  currentPage: AppPage;
  onNavigate: (page: AppPage) => void;
  onBookCallClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  onBookCallClick,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNav = (page: AppPage) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="w-full sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-zinc-200/60 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 h-20 flex items-center justify-between">
        
        {/* Left: Brand Identity with Logo */}
        <div className="flex items-center flex-1 justify-start">
          <button
            onClick={() => handleNav('home')}
            id="brand-logo"
            className="flex items-center select-none group cursor-pointer"
          >
            <img
              src={logoImg}
              alt="Easy House Cameroon Logo"
              className="h-10 sm:h-12 w-auto object-contain group-hover:opacity-90 transition-opacity"
            />
          </button>
        </div>

        {/* Center: Centralized Navigation Links (Home, Properties, About) */}
        <nav className="hidden md:flex items-center justify-center gap-2 text-sm font-medium text-zinc-600">
          <button
            onClick={() => handleNav('home')}
            id="nav-link-home"
            className={`px-4 py-2 rounded-full transition-all cursor-pointer ${
              currentPage === 'home'
                ? 'text-zinc-950 font-bold bg-zinc-100 shadow-2xs'
                : 'text-zinc-600 hover:text-zinc-950 hover:bg-zinc-50'
            }`}
          >
            Home
          </button>
          <button
            onClick={() => handleNav('properties')}
            id="nav-link-properties"
            className={`px-4 py-2 rounded-full transition-all cursor-pointer ${
              currentPage === 'properties'
                ? 'text-zinc-950 font-bold bg-zinc-100 shadow-2xs'
                : 'text-zinc-600 hover:text-zinc-950 hover:bg-zinc-50'
            }`}
          >
            Properties
          </button>
          <button
            onClick={() => handleNav('about')}
            id="nav-link-about"
            className={`px-4 py-2 rounded-full transition-all cursor-pointer ${
              currentPage === 'about'
                ? 'text-zinc-950 font-bold bg-zinc-100 shadow-2xs'
                : 'text-zinc-600 hover:text-zinc-950 hover:bg-zinc-50'
            }`}
          >
            About
          </button>
        </nav>

        {/* Right: Action Controls (Schedule Tour) */}
        <div className="flex items-center gap-2.5 sm:gap-3 flex-1 justify-end">
          <button
            onClick={onBookCallClick}
            className="px-4 sm:px-5 py-2 sm:py-2.5 bg-zinc-950 hover:bg-zinc-800 text-white text-xs font-semibold rounded-full transition-all shadow-xs active:scale-[0.98] cursor-pointer"
          >
            Schedule Tour
          </button>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden w-9 h-9 rounded-full bg-white border border-zinc-200/80 flex items-center justify-center text-zinc-700 hover:text-zinc-950 cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer Menu: Home, Properties, About */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-zinc-100 bg-white/95 backdrop-blur-lg px-6 py-6 space-y-4 animate-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col gap-2 text-base font-medium text-zinc-800">
            <button
              onClick={() => handleNav('home')}
              className={`text-left px-4 py-2 rounded-xl transition-colors ${
                currentPage === 'home' ? 'bg-zinc-100 font-bold text-zinc-950' : 'hover:bg-zinc-50'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => handleNav('properties')}
              className={`text-left px-4 py-2 rounded-xl transition-colors ${
                currentPage === 'properties' ? 'bg-zinc-100 font-bold text-zinc-950' : 'hover:bg-zinc-50'
              }`}
            >
              Properties
            </button>
            <button
              onClick={() => handleNav('about')}
              className={`text-left px-4 py-2 rounded-xl transition-colors ${
                currentPage === 'about' ? 'bg-zinc-100 font-bold text-zinc-950' : 'hover:bg-zinc-50'
              }`}
            >
              About
            </button>
          </div>

          <div className="pt-4 border-t border-zinc-100 flex flex-col gap-2">
            <button
              onClick={() => {
                onBookCallClick();
                setMobileMenuOpen(false);
              }}
              className="w-full py-3 bg-zinc-950 text-white rounded-xl text-center text-sm font-semibold hover:bg-zinc-800 transition-colors shadow-xs"
            >
              Schedule Tour
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
