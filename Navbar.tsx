import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

interface NavbarProps {
  hasHero?: boolean;
}

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'Gallery', path: '/gallery' },
  { label: 'Products', path: '/products' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' },
];

export function Navbar({ hasHero = false }: NavbarProps) {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!hasHero) {
      setScrolled(true);
      return;
    }

    const handleScroll = () => {
      setScrolled(window.scrollY > window.innerHeight * 0.8);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasHero]);

  const isTransparent = hasHero && !scrolled;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 h-[72px] flex items-center transition-all duration-300 ${
        isTransparent
          ? 'bg-transparent'
          : 'bg-white shadow-nav'
      }`}
    >
      <div className="w-full max-w-content mx-auto px-6 md:px-10 lg:px-20 flex items-center justify-between">
        <Link
          to="/"
          className={`nav-link font-medium no-underline transition-colors duration-200 ${
            isTransparent ? 'text-white' : 'text-[#1A1A1A]'
          }`}
        >
          UMAIR CALLIGRAPHY
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`nav-link no-underline transition-colors duration-200 ${
                location.pathname === link.path
                  ? 'text-[#1A1A1A] active'
                  : isTransparent
                  ? 'text-white/70 hover:text-white'
                  : 'text-[#666666] hover:text-[#1A1A1A]'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <span
            className={`block w-5 h-px transition-all duration-200 ${
              isTransparent ? 'bg-white' : 'bg-[#1A1A1A]'
            } ${mobileOpen ? 'rotate-45 translate-y-[3.5px]' : ''}`}
          />
          <span
            className={`block w-5 h-px transition-all duration-200 ${
              isTransparent ? 'bg-white' : 'bg-[#1A1A1A]'
            } ${mobileOpen ? 'opacity-0' : ''}`}
          />
          <span
            className={`block w-5 h-px transition-all duration-200 ${
              isTransparent ? 'bg-white' : 'bg-[#1A1A1A]'
            } ${mobileOpen ? '-rotate-45 -translate-y-[3.5px]' : ''}`}
          />
        </button>
      </div>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 top-[72px] bg-white z-40 flex flex-col items-center pt-16 gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`font-display text-2xl no-underline transition-colors duration-200 ${
                location.pathname === link.path
                  ? 'text-[#1A1A1A]'
                  : 'text-[#666666] hover:text-[#1A1A1A]'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
