import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Check, Send, Loader } from './Icons';
import { portfolioData } from '../data/portfolio';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef(null);
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isMailFallback, setIsMailFallback] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.contact-reveal',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(portfolioData.contact.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setLoading(true);
    setIsMailFallback(false);

    const apiKey = portfolioData.contact.web3formsKey;
    const isKeyValid = apiKey && apiKey !== 'YOUR_ACCESS_KEY_HERE';

    if (isKeyValid) {
      try {
        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            access_key: apiKey,
            name: formData.name,
            email: formData.email,
            message: formData.message,
            subject: `New Portfolio Inquiry from ${formData.name}`,
            from_name: 'Portfolio Contact Form',
          }),
        });

        const result = await response.json();
        if (result.success) {
          setLoading(false);
          setSubmitted(true);
          setFormData({ name: '', email: '', message: '' });
          return;
        }
      } catch (err) {
        console.warn('Web3Forms API call failed, switching to mailto fallback:', err);
      }
    }

    // Fallback: Open mailto link if key is not configured or API fails
    setLoading(false);
    setIsMailFallback(true);
    setSubmitted(true);

    const mailtoSubject = encodeURIComponent(`Portfolio Inquiry from ${formData.name}`);
    const mailtoBody = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    );
    window.location.href = `mailto:${portfolioData.contact.email}?subject=${mailtoSubject}&body=${mailtoBody}`;
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-20 md:py-32 border-b border-[#2B2A26] relative overflow-hidden"
    >
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-12">
        {/* Section Header */}
        <div className="contact-reveal flex justify-between items-center mb-10 pb-4 border-b border-[#2B2A26]">
          <span className="text-xs font-mono tracking-widest text-[#A7A39A] uppercase">
            06 — CONTACT
          </span>
          <span className="text-xs font-mono tracking-widest text-[#A7A39A] uppercase hidden sm:inline">
            GET IN TOUCH
          </span>
        </div>

        {/* 2-Column Contact Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Left Column - Statement Display Heading */}
          <div className="contact-reveal lg:col-span-6 space-y-8">
            <h2 className="text-hero-giant font-bebas text-[#F2EEE5] uppercase tracking-tight leading-[0.85] select-none">
              LET'S<br />
              WORK<br />
              <span className="text-[#D8D0BF]">TOGETHER.</span>
            </h2>

            <p className="text-base sm:text-lg text-[#A7A39A] font-light max-w-lg leading-relaxed">
              {portfolioData.contact.subhead}
            </p>

            {/* Quick Email Pill */}
            <div className="pt-2 flex items-center space-x-4">
              <button
                onClick={handleCopyEmail}
                className="flex items-center space-x-3 px-6 py-3.5 rounded-full border border-[#2B2A26] bg-[#12120F] hover:border-[#D8D0BF] text-sm font-mono text-[#F2EEE5] transition-all group cursor-pointer"
              >
                <Mail size={16} className="text-[#D8D0BF]" />
                <span>{portfolioData.contact.email}</span>
                {copied ? (
                  <Check size={16} className="text-emerald-400" />
                ) : (
                  <span className="text-xs text-[#A7A39A] group-hover:text-[#F2EEE5] transition-colors">
                    (COPY)
                  </span>
                )}
              </button>
            </div>

            {/* Social Links List */}
            <div className="pt-6 border-t border-[#2B2A26] space-y-4">
              <span className="text-xs font-mono uppercase tracking-widest text-[#A7A39A] block">
                CONNECT & SOCIALS
              </span>
              <div className="flex flex-wrap gap-4">
                {portfolioData.contact.socials.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-editorial text-sm font-mono uppercase tracking-wider text-[#F2EEE5] hover:text-[#D8D0BF]"
                  >
                    {social.name} ↗
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Contact Form with Web3Forms & Mail Fallback */}
          <div className="contact-reveal lg:col-span-6">
            <div className="bg-[#12120F] border border-[#2B2A26] p-8 sm:p-10 rounded-3xl space-y-6 relative">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-[#D8D0BF] uppercase tracking-widest block">
                  DIRECT INQUIRY
                </span>
                <span className="inline-flex items-center space-x-2 text-[10px] font-mono uppercase tracking-widest text-[#A7A39A] bg-[#0B0B09] px-2.5 py-1 rounded-full border border-[#2B2A26]">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>WEB3FORMS / DIRECT MAIL</span>
                </span>
              </div>

              {submitted ? (
                <div className="py-12 text-center space-y-4 animate-fadeIn">
                  <div className="w-12 h-12 rounded-full bg-[#D8D0BF]/20 text-[#D8D0BF] flex items-center justify-center mx-auto">
                    <Check size={24} />
                  </div>
                  <h3 className="text-2xl font-bebas text-[#F2EEE5] uppercase tracking-wide">
                    {isMailFallback ? 'OPENING EMAIL CLIENT' : 'MESSAGE SENT SUCCESSFULLY'}
                  </h3>
                  <p className="text-sm text-[#A7A39A] max-w-sm mx-auto">
                    {isMailFallback
                      ? 'Your default mail application has been opened with your pre-filled inquiry. Click send to complete!'
                      : 'Thank you for reaching out! Your message was delivered via Web3Forms and Abdila will get back to you shortly.'}
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-4 px-6 py-2.5 rounded-full border border-[#2B2A26] text-xs font-mono uppercase text-[#F2EEE5] hover:border-[#D8D0BF] transition-colors cursor-pointer"
                  >
                    SEND ANOTHER MESSAGE
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-xs font-mono text-[#A7A39A] uppercase tracking-wider block">
                      YOUR NAME
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Alex Morgan"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-[#0B0B09] border border-[#2B2A26] rounded-xl px-4 py-3.5 text-sm text-[#F2EEE5] placeholder-[#A7A39A]/50 focus:outline-none focus:border-[#D8D0BF] transition-colors"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-mono text-[#A7A39A] uppercase tracking-wider block">
                      YOUR EMAIL ADDRESS
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. alex@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-[#0B0B09] border border-[#2B2A26] rounded-xl px-4 py-3.5 text-sm text-[#F2EEE5] placeholder-[#A7A39A]/50 focus:outline-none focus:border-[#D8D0BF] transition-colors"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-mono text-[#A7A39A] uppercase tracking-wider block">
                      YOUR MESSAGE
                    </label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Tell me about your project, role, or collaboration idea..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-[#0B0B09] border border-[#2B2A26] rounded-xl px-4 py-3.5 text-sm text-[#F2EEE5] placeholder-[#A7A39A]/50 focus:outline-none focus:border-[#D8D0BF] transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 rounded-xl bg-[#F2EEE5] text-[#0B0B09] font-bebas text-xl tracking-wider uppercase hover:bg-[#D8D0BF] transition-colors flex items-center justify-center space-x-2 whitespace-nowrap cursor-pointer disabled:opacity-60"
                  >
                    {loading ? (
                      <>
                        <span>SENDING...</span>
                        <Loader size={18} />
                      </>
                    ) : (
                      <>
                        <span>SEND MESSAGE</span>
                        <Send size={18} />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
