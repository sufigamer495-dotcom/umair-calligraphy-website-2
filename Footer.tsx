import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="bg-[#1A1A1A] text-white">
      <div className="max-w-content mx-auto px-6 md:px-10 lg:px-20 py-16">
        <div className="flex flex-col md:flex-row justify-between gap-10">
          {/* Left */}
          <div className="max-w-xs">
            <p className="nav-link font-medium text-white mb-3">UMAIR CALLIGRAPHY</p>
            <p className="text-sm text-[#999999] leading-relaxed">
              Bespoke calligraphy blending traditional mastery with modern minimalism.
            </p>
          </div>

          {/* Right - links */}
          <div className="flex gap-12 md:gap-16">
            <div className="flex flex-col gap-3">
              <Link to="/gallery" className="nav-link text-[#999999] hover:text-white no-underline transition-colors duration-200">Gallery</Link>
              <Link to="/products" className="nav-link text-[#999999] hover:text-white no-underline transition-colors duration-200">Products</Link>
              <Link to="/order" className="nav-link text-[#999999] hover:text-white no-underline transition-colors duration-200">Order</Link>
            </div>
            <div className="flex flex-col gap-3">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="nav-link text-[#999999] hover:text-white no-underline transition-colors duration-200">Instagram</a>
              <a href="https://behance.net" target="_blank" rel="noopener noreferrer" className="nav-link text-[#999999] hover:text-white no-underline transition-colors duration-200">Behance</a>
              <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer" className="nav-link text-[#999999] hover:text-white no-underline transition-colors duration-200">Pinterest</a>
            </div>
          </div>
        </div>

        <div className="border-t border-[#333333] mt-12 pt-6">
          <p className="text-xs text-[#999999]">
            © 2026 Umair Calligraphy. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
