import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Home } from '@/pages/Home';
import { Gallery } from '@/pages/Gallery';
import { About } from '@/pages/About';
import { Contact } from '@/pages/Contact';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function Products() {
  return (
    <div className="min-h-screen pt-[120px] pb-20 bg-white">
      <div className="max-w-content mx-auto px-6 md:px-10 lg:px-20 text-center">
        <h1 className="font-display text-page-heading text-[#1A1A1A] mb-4">Products</h1>
        <p className="text-body font-body font-light text-[#666666]">
          Limited edition prints, original works, and commissioned pieces.
        </p>
      </div>
    </div>
  );
}

function Order() {
  return (
    <div className="min-h-screen pt-[120px] pb-20 bg-white">
      <div className="max-w-content mx-auto px-6 md:px-10 lg:px-20 text-center">
        <h1 className="font-display text-page-heading text-[#1A1A1A] mb-4">Order Custom Design</h1>
        <p className="text-body font-body font-light text-[#666666] mb-8">
          Ready to commission a bespoke piece? Please reach out via WhatsApp or email to discuss your vision.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a href="https://wa.me/15551234567" target="_blank" rel="noopener noreferrer" className="btn btn-dark no-underline">
            WhatsApp Contact
          </a>
          <a href="mailto:hello@umaircalligraphy.com" className="btn btn-secondary no-underline">
            Email Inquiry
          </a>
        </div>
      </div>
    </div>
  );
}

const heroRoutes = ['/'];

export default function App() {
  const { pathname } = useLocation();
  const hasHero = heroRoutes.includes(pathname);

  return (
    <div className="min-h-screen flex flex-col">
      <ScrollToTop />
      <Navbar hasHero={hasHero} />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/products" element={<Products />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/order" element={<Order />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
