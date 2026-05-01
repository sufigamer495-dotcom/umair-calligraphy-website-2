import { useState } from 'react';

export function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen pt-[120px] pb-20 bg-white">
      <div className="max-w-content mx-auto px-6 md:px-10 lg:px-20">
        {/* Hero heading */}
        <div className="text-center mb-16">
          <h1 className="font-display text-page-heading text-[#1A1A1A] mb-4">Get in Touch</h1>
          <p className="text-body font-body font-light text-[#666666]">
            For general inquiries, collaborations, or gallery exhibitions.
          </p>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-[45%_55%] gap-10 lg:gap-16 max-w-content mx-auto">
          {/* Left - Contact info */}
          <div>
            <span className="label-uppercase text-gold block mb-3">EMAIL</span>
            <a
              href="mailto:hello@umaircalligraphy.com"
              className="font-display text-2xl text-[#1A1A1A] no-underline hover:text-gold transition-colors duration-200 block mb-1"
            >
              hello@umaircalligraphy.com
            </a>
            <p className="text-body font-body font-light text-[#666666] mb-10">
              By appointment
            </p>

            <div className="border-t border-[#E5E5E5] pt-8 mb-8" />

            <span className="label-uppercase text-gold block mb-3">DIRECT MESSAGE</span>
            <p className="text-body font-body font-light text-[#666666] mb-6">
              For a faster response regarding commissions, please reach out directly via WhatsApp.
            </p>
            <a
              href="https://wa.me/15551234567"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary no-underline inline-block"
            >
              Chat on WhatsApp
            </a>
          </div>

          {/* Right - Form */}
          <div>
            <h3 className="font-body text-lg font-medium text-[#1A1A1A] mb-6">Send a Message</h3>

            {submitted ? (
              <div className="py-12">
                <p className="text-gold text-body font-body">
                  Thank you. Your message has been sent.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div>
                  <label className="label-uppercase text-[#999999] block mb-2">NAME</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full border-0 border-b border-[#E5E5E5] bg-transparent py-3 text-body font-body text-[#1A1A1A] outline-none focus:border-gold transition-colors duration-200"
                  />
                </div>
                <div>
                  <label className="label-uppercase text-[#999999] block mb-2">EMAIL</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full border-0 border-b border-[#E5E5E5] bg-transparent py-3 text-body font-body text-[#1A1A1A] outline-none focus:border-gold transition-colors duration-200"
                  />
                </div>
                <div>
                  <label className="label-uppercase text-[#999999] block mb-2">MESSAGE</label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full border-0 border-b border-[#E5E5E5] bg-transparent py-3 text-body font-body text-[#1A1A1A] outline-none focus:border-gold transition-colors duration-200 resize-none min-h-[120px]"
                  />
                </div>
                <button type="submit" className="btn btn-dark w-full mt-2">
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
