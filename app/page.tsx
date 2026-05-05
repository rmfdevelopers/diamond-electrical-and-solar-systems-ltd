'use client';

// DESIGN DECISIONS:
// Layout Energy: bold
// Depth Treatment: layered
// Divider Style: D-STAT
// Typography Personality: mono-accent

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { 
  Cpu, 
  Sun, 
  Diamond, 
  MapPin, 
  Users, 
  Zap, 
  ShieldCheck, 
  Phone, 
  Mail, 
  Instagram, 
  ArrowRight, 
  CheckCheck, 
  Loader2, 
  ImageOff, 
  Menu, 
  X,
  ChevronRight
} from 'lucide-react';

// --- Types ---
interface Stat { number: string; label: string; icon: any; }
interface Product { name: string; description: string; price: string; image_url: string; }
interface Feature { title: string; description: string; icon: any; }
interface Testimonial { name: string; text: string; role: string; }

// --- Hooks ---
const useScrollReveal = (threshold = 0.15) => {
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, isVisible };
};

const useTypewriter = (text: string, speed = 55) => {
  const [display, setDisplay] = useState('');
  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      if (i < text.length) { setDisplay(prev => prev + text.charAt(i)); i++; }
      else clearInterval(timer);
    }, speed);
    return () => clearInterval(timer);
  }, [text, speed]);
  return display;
};

// --- Components ---
function SafeImage({ src, alt, fill, width, height, className, priority }: {
  src: string; alt: string; fill?: boolean; width?: number; height?: number;
  className?: string; priority?: boolean;
}) {
  const [error, setError] = useState(false);
  if (error) {
    return (
      <div className={`flex items-center justify-center bg-zinc-900 border border-white/5 ${className}`}>
        <ImageOff size={24} className="text-white/10" />
      </div>
    );
  }
  return (
    <Image 
      src={src} 
      alt={alt} 
      fill={fill}
      width={!fill ? (width ?? 800) : undefined}
      height={!fill ? (height ?? 600) : undefined}
      className={className} 
      priority={priority}
      onError={() => setError(true)} 
    />
  );
}

export default function LandingPage() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const brand = {
    name: "Diamond Electrical and Solar Systems Ltd",
    tagline: "Best in Luxurious Lightings",
    description: "Premium electrical solutions and solar systems specializing in high-end chandeliers, smart home integration, and sustainable energy for modern spaces."
  };

  const images = [
    "https://images.unsplash.com/photo-1584521104351-cfad34547581",
    "https://images.unsplash.com/photo-1669574802742-3b0f8a08c17f",
    "https://images.unsplash.com/photo-1645301300961-e2bc264b51fd",
    "https://images.unsplash.com/photo-1688135208647-7f9d51f7bb49",
    "https://images.unsplash.com/photo-1655292196969-9a7cf247ec55",
    "https://images.unsplash.com/photo-1646945109380-d6c45aaf3aa8"
  ];

  const typedHero = useTypewriter("Illuminating Innovation with Precision.");

  return (
    <main className="bg-secondary text-white">
      {/* Header */}
      <nav className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ${scrolled ? 'bg-secondary/95 backdrop-blur-xl border-b border-white/5 py-4' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex flex-col">
            <span className="font-heading text-2xl font-black tracking-tighter leading-none text-primary">DIAMOND</span>
            <span className="font-mono text-[10px] tracking-[0.3em] uppercase opacity-70">Electrical & Solar</span>
          </div>
          
          <div className="hidden md:flex items-center gap-10">
            {['Home', 'Lighting', 'Our Story', 'Location'].map((link) => (
              <a key={link} href={`#${link.toLowerCase().replace(' ', '')}`} className="text-xs uppercase tracking-widest font-bold hover:text-primary transition-colors">
                {link}
              </a>
            ))}
            <a href="#contact" className="bg-primary px-6 py-3 rounded-full text-xs font-black uppercase tracking-widest hover:brightness-110 transition-all">
              Explore Showroom
            </a>
          </div>

          <button className="md:hidden text-white" onClick={() => setMobileMenu(true)}>
            <Menu size={28} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 z-[200] bg-secondary transition-transform duration-500 ${mobileMenu ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-6 flex justify-between items-center border-b border-white/5">
          <span className="font-heading text-xl font-black text-primary">DIAMOND</span>
          <button onClick={() => setMobileMenu(false)}><X size={32} /></button>
        </div>
        <div className="flex flex-col p-10 gap-8">
          {['Home', 'Lighting', 'Our Story', 'Location'].map((link) => (
            <a key={link} onClick={() => setMobileMenu(false)} href={`#${link.toLowerCase().replace(' ', '')}`} className="text-4xl font-heading font-black">
              {link}
            </a>
          ))}
          <a onClick={() => setMobileMenu(false)} href="#contact" className="mt-4 bg-primary p-5 text-center font-black uppercase">
            Explore Showroom
          </a>
        </div>
      </div>

      {/* HERO-D */}
      <section id="home" className="min-h-screen flex flex-col justify-center bg-black px-6 overflow-hidden relative">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:64px_64px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-primary/10 rounded-full blur-[160px] pointer-events-none" />
        
        <div className="relative z-10 max-w-6xl mx-auto w-full">
          <h1 className="font-heading text-[12vw] md:text-[8.5vw] font-black text-white leading-[0.85] tracking-tighter">
            {typedHero}<span className="text-primary animate-pulse">_</span>
          </h1>
          <div className="mt-12 flex flex-col md:flex-row items-start md:items-end justify-between gap-10 border-t border-white/10 pt-10">
            <div className="max-w-md">
              <p className="text-white/40 font-mono text-xs uppercase tracking-[0.4em] mb-4">Elite Electrical Engineering</p>
              <p className="text-white/50 text-lg md:text-xl leading-relaxed">
                The destination for Alaba&apos;s most exclusive chandeliers and smart electrical engineering. Sharp delivery, nationwide.
              </p>
            </div>
            <a href="#products" className="group relative bg-primary text-white px-12 py-6 font-black text-xl overflow-hidden transition-all duration-300 hover:scale-[1.02]">
              <span className="relative z-10 flex items-center gap-3">
                Explore Showroom <ArrowRight className="group-hover:translate-x-2 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300 opacity-10" />
            </a>
          </div>
        </div>
      </section>

      {/* D-STAT Divider */}
      <div className="bg-primary py-16 overflow-hidden">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-black/10 text-center">
          {[
            { number: '6,800+', label: 'Instagram Community' },
            { number: '1500+',  label: 'Projects Completed' },
            { number: '100%', label: 'Authenticity Guarantee' }
          ].map((s, i) => (
            <div key={i} className="py-8 md:py-4 px-10">
              <p className="text-5xl font-heading font-black text-secondary tracking-tighter">{s.number}</p>
              <p className="text-secondary/60 text-xs mt-2 font-black uppercase tracking-[0.2em]">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* FEATURES - F-BENTO */}
      <section id="features" className="py-32 px-6 bg-secondary">
        <div className="max-w-6xl mx-auto">
          <div className="mb-20">
            <h2 className="font-heading text-5xl md:text-7xl font-black text-white leading-none">Why Diamond?</h2>
            <p className="text-white/40 mt-4 text-xl">Where industrial durability meets high-tech luxury.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 bg-primary/5 rounded-[2rem] p-10 border border-primary/10 hover:border-primary/30 transition-all duration-500 group flex flex-col justify-between min-h-[360px] relative overflow-hidden">
              <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-primary/10 rounded-full blur-[80px] pointer-events-none" />
              <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Cpu className="text-primary" size={32} />
              </div>
              <div className="relative z-10">
                <h3 className="font-heading text-4xl font-black text-white">Smart Automation</h3>
                <p className="text-white/50 mt-4 text-lg max-w-md">Seamlessly control your entire lighting environment via smartphone or voice. Next-gen living starts here.</p>
              </div>
            </div>
            
            {[
              { icon: Sun, title: 'Solar Excellence', desc: 'Cutting-edge renewable energy solutions designed for the Nigerian climate.' },
              { icon: Diamond, title: 'Luxurious Curation', desc: 'Hand-picked fixtures from the world&apos;s leading lighting designers.' },
              { icon: MapPin, title: 'Alaba Market Hub', desc: 'Centrally located for easy inspection and nationwide delivery.' }
            ].map((f, i) => (
              <div key={i} className="bg-white/5 rounded-[2rem] p-10 border border-white/5 hover:bg-white/10 transition-all duration-300 flex flex-col justify-between min-h-[300px]">
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                  <f.icon className="text-white" size={24} />
                </div>
                <div>
                  <h3 className="font-heading text-2xl font-bold text-white">{f.title}</h3>
                  <p className="text-white/40 text-sm mt-3 leading-relaxed">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY - MASONRY */}
      <section className="py-32 px-6 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div className="max-w-2xl">
              <h2 className="font-heading text-5xl md:text-7xl font-black text-white leading-none">The Collection</h2>
              <p className="text-white/40 mt-6 text-xl">A masonry-style showcase of intricate textures and high-end aesthetics.</p>
            </div>
            <div className="font-mono text-primary text-xs uppercase tracking-[0.5em] pb-2">Exclusive Access</div>
          </div>
          
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            {images.map((src, i) => (
              <div key={i} className="break-inside-avoid group relative rounded-[2.5rem] overflow-hidden bg-zinc-900 border border-white/5">
                <SafeImage 
                  src={src} 
                  alt={`Collection ${i}`} 
                  className="w-full h-auto object-cover opacity-80 group-hover:opacity-100 group-hover:scale-[1.03] transition-all duration-700" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-60 transition-opacity duration-500" />
                <div className="absolute bottom-0 left-0 right-0 p-8 translate-y-10 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <span className="font-mono text-primary text-[10px] tracking-widest uppercase">Spec 0{i + 1}</span>
                  <h4 className="text-xl font-bold mt-1">Diamond Signature Series</h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT - V3 Horizontal Split */}
      <section id="ourstory" className="min-h-[80vh] grid md:grid-cols-2 items-center bg-secondary overflow-hidden">
        <div className="relative h-full min-h-[500px]">
          <SafeImage src={images[0]} alt="About Us" fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-secondary via-secondary/20 to-transparent" />
        </div>
        <div className="px-8 md:px-20 py-24">
          <span className="text-primary font-mono text-xs font-bold tracking-[0.4em] uppercase mb-8 block">Our Legacy</span>
          <h2 className="font-heading text-5xl md:text-7xl font-black text-white leading-[0.9] mb-10">Powering Your Vision.</h2>
          <p className="text-white/50 text-xl leading-relaxed mb-12">
            With a massive legacy built in the heart of Alaba International Market, we aren&apos;t just dealers; we are architects of ambiance. We bridge the gap between industrial utility and high-end aesthetics.
          </p>
          <div className="space-y-8">
            {[
              { icon: Users, title: '6,800+ Strong', desc: 'A dedicated community following our innovation journey.' },
              { icon: ShieldCheck, title: 'Authenticity Guarantee', desc: 'Every fixture is verified for performance and durability.' }
            ].map((item, i) => (
              <div key={i} className="flex gap-6 items-start">
                <div className="w-12 h-12 shrink-0 rounded-full bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
                  <item.icon size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-xl">{item.title}</h4>
                  <p className="text-white/40 text-sm mt-1">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUCTS - P-EDITORIAL */}
      <section id="lighting" className="py-32 px-6 bg-black relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[120px]" />
        <div className="max-w-7xl mx-auto">
          <h2 className="text-center font-heading text-6xl md:text-8xl font-black text-white mb-24">Featured Systems</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { name: "Celestial Crystal Chandelier", price: "₦580,000", img: images[2], desc: "Multi-tiered K9 crystal masterpiece." },
              { name: "Smart Touch Glass Switch", price: "₦18,500", img: images[3], desc: "Wi-Fi enabled switches with voice control." },
              { name: "Industrial Nordic Pendant", price: "₦75,000", img: images[4], desc: "Matte black aluminum finish." },
              { name: "Diamond Mono Solar Panel", price: "₦245,000", img: images[5], desc: "High-efficiency 550W monocrystalline." }
            ].map((p, i) => (
              <div key={i} className="group relative h-[450px] rounded-[3rem] overflow-hidden border border-white/5 bg-zinc-900">
                <SafeImage 
                  src={p.img} 
                  alt={p.name} 
                  fill 
                  className="object-cover opacity-60 group-hover:opacity-90 transition-all duration-1000 scale-[1.05] group-hover:scale-100" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                <div className="absolute inset-0 p-12 flex flex-col justify-end">
                  <div className="overflow-hidden">
                    <h3 className="text-4xl font-heading font-black text-white group-hover:translate-y-0 translate-y-full transition-transform duration-500">{p.name}</h3>
                  </div>
                  <div className="max-h-0 group-hover:max-h-24 overflow-hidden transition-all duration-700 delay-100">
                    <p className="text-white/60 mt-4 text-lg">{p.desc}</p>
                  </div>
                  <div className="flex justify-between items-center mt-8 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <span className="text-primary font-heading text-3xl font-black">{p.price}</span>
                    <a href="#contact" className="bg-white text-black px-8 py-3 rounded-full font-black text-sm uppercase tracking-widest hover:bg-primary hover:text-white transition-all">
                      Secure Order
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS - T-SPOTLIGHT */}
      <section className="py-32 px-6 bg-secondary">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-heading text-5xl md:text-7xl font-black text-white mb-20 leading-none">Client Feedback</h2>
          <div className="space-y-12">
            {[
              { name: "Chidi Okoro", text: "The chandeliers changed the entire vibe of my hotel lobby. Delivery to Enugu was flawless.", role: "Architect" },
              { name: "Amina Bello", text: "Best solar panels I've used. My office has been on 24/7 power since the installation.", role: "Business Owner" }
            ].map((t, i) => (
              <div key={i} className="relative py-16 px-10 rounded-[3rem] border border-white/5 bg-gradient-to-b from-white/5 to-transparent hover:border-primary/20 transition-all duration-500 group">
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-14 h-14 rounded-full bg-primary flex items-center justify-center text-secondary border-4 border-secondary group-hover:scale-110 transition-transform">
                  <Zap size={24} fill="currentColor" />
                </div>
                <p className="text-white/80 text-2xl md:text-3xl font-medium leading-relaxed italic">&ldquo;{t.text}&rdquo;</p>
                <div className="mt-10 flex items-center justify-center gap-4">
                  <div className="w-px h-8 bg-primary/50" />
                  <div className="text-left">
                    <p className="font-heading font-black text-white uppercase tracking-widest">{t.name}</p>
                    <p className="text-primary text-xs font-mono uppercase tracking-[0.2em]">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT - C3 Minimal Centered */}
      <section id="location" className="py-40 px-6 bg-black relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(211,47,46,0.1),transparent_70%)]" />
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <span className="text-primary font-mono text-xs tracking-[0.6em] uppercase mb-6 block">Inquiry</span>
          <h2 className="font-heading text-6xl md:text-8xl font-black text-white mb-8 leading-none">Visit Our Showroom</h2>
          <p className="text-white/40 mb-16 text-xl max-w-xl mx-auto leading-relaxed">
            Located in the heart of Lagos, we are open for inspections and same-day collection.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left mb-16">
            <div className="p-8 rounded-[2rem] bg-white/5 border border-white/10">
              <MapPin className="text-primary mb-4" size={32} />
              <p className="font-bold text-lg mb-2 text-white">Lagos Showroom</p>
              <p className="text-white/50 text-sm leading-relaxed">Alaba International Market Electrical section, block 32 shop 19, Ojo Lagos</p>
            </div>
            <div className="p-8 rounded-[2rem] bg-white/5 border border-white/10">
              <Instagram className="text-primary mb-4" size={32} />
              <p className="font-bold text-lg mb-2 text-white">Social Presence</p>
              <p className="text-white/50 text-sm leading-relaxed">@diamond_electrical_</p>
            </div>
          </div>

          <ContactForm />
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-6 bg-secondary border-t border-white/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
          <div className="md:col-span-2">
            <span className="font-heading text-3xl font-black text-primary tracking-tighter">DIAMOND</span>
            <p className="text-white/40 mt-6 max-w-sm text-lg italic leading-relaxed">
              &ldquo;{brand.tagline}&rdquo;
            </p>
          </div>
          <div>
            <h4 className="font-bold uppercase tracking-widest text-xs text-white/40 mb-8">Navigation</h4>
            <div className="flex flex-col gap-4">
              {['Home', 'Lighting', 'Our Story', 'Location'].map(l => (
                <a key={l} href={`#${l.toLowerCase().replace(' ', '')}`} className="text-sm font-medium hover:text-primary transition-colors">{l}</a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-bold uppercase tracking-widest text-xs text-white/40 mb-8">Connect</h4>
            <div className="flex flex-col gap-4">
              <a href="#" className="flex items-center gap-3 text-sm hover:text-primary transition-colors">
                <Instagram size={16} /> Instagram
              </a>
              <a href="#" className="flex items-center gap-3 text-sm hover:text-primary transition-colors">
                <Phone size={16} /> Call Showroom
              </a>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-white/30 text-xs font-mono uppercase tracking-widest">
            © {new Date().getFullYear()} DIAMOND ELECTRICAL SYSTEMS LTD.
          </p>
          <p className="text-white/20 text-[10px] uppercase tracking-[0.3em]">
            Precision Engineering • Alaba International
          </p>
        </div>
      </footer>
    </main>
  );
}

function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setSent(true); }, 1500);
  };

  if (sent) return (
    <div className="p-12 text-center animate-scaleIn bg-primary/10 rounded-[3rem] border border-primary/20">
      <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mb-6 mx-auto border border-primary/40">
        <CheckCheck size={32} className="text-primary" />
      </div>
      <h3 className="font-heading text-3xl font-black text-white mb-2">Message Sent</h3>
      <p className="text-white/50 text-lg">Our engineering team will respond within 24 hours.</p>
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="text-left space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input 
          placeholder="Name"
          className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-primary transition-all text-white placeholder:text-white/20"
          value={form.name} onChange={e => setForm({...form, name: e.target.value})} required
        />
        <input 
          type="email" placeholder="Email Address"
          className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-primary transition-all text-white placeholder:text-white/20"
          value={form.email} onChange={e => setForm({...form, email: e.target.value})} required
        />
      </div>
      <textarea 
        rows={5} placeholder="How can we assist your build?"
        className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-primary transition-all text-white placeholder:text-white/20 resize-none"
        value={form.message} onChange={e => setForm({...form, message: e.target.value})} required
      />
      <button className="w-full bg-primary text-white py-5 rounded-2xl font-black uppercase tracking-widest text-lg flex justify-center items-center gap-4 hover:brightness-110 transition-all disabled:opacity-50">
        {loading ? <Loader2 className="animate-spin" /> : <>Send Inquiry <ChevronRight size={20} /></>}
      </button>
    </form>
  );
}