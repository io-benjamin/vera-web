'use client';

import { useState, useEffect, useRef } from 'react';

// Hook for scroll-triggered animations
function useScrollReveal() {
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -100px 0px' }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return { ref, isVisible };
}

const buildSteps = [
  'Designing your homepage...',
  'Adding mobile responsiveness',
  'Setting up contact forms',
  'Optimizing for search engines',
  'Connecting your domain',
  'Going live!',
];

// SVG Icons
const Icons = {
  chat: (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    </svg>
  ),
  build: (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  rocket: (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
    </svg>
  ),
  palette: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.098 19.902a3.75 3.75 0 005.304 0l6.401-6.402M6.75 21A3.75 3.75 0 013 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 003.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072M10.5 8.197l2.88-2.88c.438-.439 1.15-.439 1.59 0l3.712 3.713c.44.44.44 1.152 0 1.59l-2.879 2.88M6.75 17.25h.008v.008H6.75v-.008z" />
    </svg>
  ),
  mobile: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
    </svg>
  ),
  bolt: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
    </svg>
  ),
  search: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
    </svg>
  ),
  form: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25z" />
    </svg>
  ),
  link: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
    </svg>
  ),
  lock: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
    </svg>
  ),
  pencil: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
    </svg>
  ),
  sparkles: (
    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
    </svg>
  ),
  hand: (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.05 4.575a1.575 1.575 0 10-3.15 0v3m3.15-3v-1.5a1.575 1.575 0 013.15 0v1.5m-3.15 0l.075 5.925m3.075.75V4.575m0 0a1.575 1.575 0 013.15 0V15M6.9 7.575a1.575 1.575 0 10-3.15 0v8.175a6.75 6.75 0 006.75 6.75h2.018a5.25 5.25 0 003.712-1.538l1.732-1.732a5.25 5.25 0 001.538-3.712l.003-2.024a.668.668 0 01.198-.471 1.575 1.575 0 10-2.228-2.228 3.818 3.818 0 00-1.12 2.687M6.9 7.575V12m6.27 4.318A4.49 4.49 0 0116.35 15" />
    </svg>
  ),
  check: (
    <svg className="w-12 h-12 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  externalLink: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
    </svg>
  ),
};

// Reveal wrapper component
function RevealSection({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className={`${className} transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-20 scale-[0.97]'}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </section>
  );
}

export default function Home() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [business, setBusiness] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  
  useEffect(() => {
    setMounted(true);
    
    // Animate build steps
    const interval = setInterval(() => {
      setCurrentStep(prev => (prev + 1) % (buildSteps.length + 2));
    }, 1500);
    
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Open Gmail compose with pre-filled info
    const subject = encodeURIComponent('New Website Inquiry');
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nBusiness: ${business}`);
    window.open(`https://mail.google.com/mail/?view=cm&to=hello@tryvera.dev&su=${subject}&body=${body}`, '_blank');
    setSubmitted(true);
  };

  const howItWorks = [
    {
      num: '01',
      title: 'Tell us about your business',
      desc: 'Quick chat or form. We learn what you need and what makes you different.',
      icon: Icons.chat,
    },
    {
      num: '02', 
      title: 'We build it',
      desc: 'Professional design, mobile-ready, fast loading. Usually 2-5 days.',
      icon: Icons.build,
    },
    {
      num: '03',
      title: 'You approve, we launch',
      desc: 'Review it. Request tweaks. Once you love it, we go live.',
      icon: Icons.rocket,
    },
  ];

  const features = [
    { label: 'Custom Design', icon: Icons.palette },
    { label: 'Mobile Ready', icon: Icons.mobile },
    { label: 'Fast Loading', icon: Icons.bolt },
    { label: 'SEO Optimized', icon: Icons.search },
    { label: 'Contact Forms', icon: Icons.form },
    { label: 'Social Links', icon: Icons.link },
    { label: 'SSL Security', icon: Icons.lock },
    { label: 'Easy Updates', icon: Icons.pencil },
  ];

  const projects = [
    {
      name: 'Nimpro',
      type: 'Services',
      desc: 'Professional services website with clean, modern branding.',
      url: 'https://nimproelectrical.com',
      color: 'from-blue-500/20 to-indigo-500/20',
      hoverColor: 'hover:border-blue-500/50',
    },
    {
      name: 'RVA Tacontigo',
      type: 'Restaurant',
      desc: 'Modern taqueria with online ordering and catering info.',
      url: 'https://rvatacontigo.com',
      color: 'from-orange-500/20 to-yellow-500/20',
      hoverColor: 'hover:border-orange-500/50',
    },
    {
      name: 'Financially Cooked',
      type: 'Web App',
      desc: 'Viral financial calculator with 1,100+ submissions.',
      url: 'https://financiallycooked.com',
      color: 'from-red-500/20 to-orange-500/20',
      hoverColor: 'hover:border-red-500/50',
    },
    {
      name: 'Your Business',
      type: 'Could be next',
      desc: 'Ready to stand out? Let\'s build something great.',
      color: 'from-emerald-500/20 to-cyan-500/20',
      hoverColor: 'hover:border-emerald-500/50',
      cta: true,
    },
  ];

  const pricing = [
    {
      title: 'Starter',
      price: '$499',
      desc: 'Perfect for getting started',
      features: ['1-3 page website', 'Mobile responsive', 'Contact form', 'Basic SEO', 'Unlimited revisions'],
      cta: 'Get Started',
      highlighted: false,
    },
    {
      title: 'Business',
      price: '$899',
      desc: 'Most popular choice',
      features: ['5-7 page website', 'Custom design', 'Advanced SEO', 'Social integration', 'Unlimited revisions', 'Priority support'],
      cta: 'Get Started',
      highlighted: true,
    },
    {
      title: 'Custom',
      price: 'Let\'s talk',
      desc: 'Complex needs? We got you',
      features: ['Databases', 'Booking systems', 'Custom features', 'Ongoing support', 'Whatever you need'],
      cta: 'Contact Us',
      highlighted: false,
    },
  ];

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white overflow-hidden">
      {/* Scan lines overlay */}
      <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.03]" style={{
        backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.1) 2px, rgba(255,255,255,0.1) 4px)',
      }} />
      
      {/* Grid background */}
      <div className="fixed inset-0 opacity-[0.02]" style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
        backgroundSize: '50px 50px',
      }} />

      {/* Gradient orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-br from-emerald-500/10 via-transparent to-transparent rounded-full blur-3xl" />
        <div className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-gradient-to-tr from-cyan-500/10 via-transparent to-transparent rounded-full blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Nav */}
        <nav className={`fixed top-0 left-0 right-0 z-40 backdrop-blur-sm bg-[#0a0a0a]/80 transition-all duration-700 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
          <div className="max-w-6xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative group">
                  <div className="absolute inset-0 bg-emerald-500/50 blur-lg transition-all duration-500 group-hover:bg-cyan-500/50" />
                  <svg className="relative w-10 h-10" viewBox="0 0 120 120" fill="none">
                    <rect width="120" height="120" rx="24" className="fill-emerald-500 transition-colors duration-500 group-hover:fill-cyan-400"/>
                    <rect x="30" y="30" width="25" height="60" rx="4" fill="#0a0a0a"/>
                    <rect x="65" y="30" width="25" height="60" rx="4" fill="#0a0a0a"/>
                    <rect x="47.5" y="60" width="25" height="35" rx="4" fill="#0a0a0a"/>
                  </svg>
                </div>
                <span className="font-semibold tracking-tight">vera</span>
              </div>
              <div className="hidden md:flex items-center gap-6">
                <a href="#how" className="text-sm text-white/50 hover:text-emerald-400 transition-colors duration-300">How it works</a>
                <a href="#pricing" className="text-sm text-white/50 hover:text-emerald-400 transition-colors duration-300">Pricing</a>
                <a href="#work" className="text-sm text-white/50 hover:text-emerald-400 transition-colors duration-300">Our work</a>
              </div>
              <a href="#contact" className="px-5 py-2.5 bg-emerald-500 text-black text-sm font-semibold rounded-lg hover:bg-cyan-400 transition-colors duration-300">
                Get Started
              </a>
            </div>
          </div>
        </nav>

        {/* Hero */}
        <section className="min-h-screen flex items-center pt-20 pb-32 px-6">
          <div className="max-w-6xl mx-auto w-full">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left - Copy */}
              <div className={`transition-all duration-700 delay-200 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full mb-6">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                  <span className="text-xs font-medium text-emerald-400">Built for small business</span>
                </div>
                
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] mb-6">
                  A website that
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-emerald-400 bg-[length:200%_auto] animate-gradient">
                    works for you.
                  </span>
                </h1>
                
                <p className="text-lg text-white/50 mb-8 max-w-md leading-relaxed">
                  Professional websites for small businesses. Fast turnaround. Fair prices. No headaches.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-3">
                  <a href="#contact" className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-emerald-500 text-black font-semibold rounded-xl hover:bg-cyan-400 transition-all duration-300 group">
                    Get a Free Quote
                    <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </a>
                  <a href="#work" className="inline-flex items-center justify-center gap-2 px-6 py-4 border border-white/10 text-white/70 font-medium rounded-xl hover:bg-white/5 hover:border-emerald-500/30 transition-all duration-300">
                    See our work
                  </a>
                </div>
                
                {/* Trust badges */}
                <div className="flex items-center gap-6 mt-10 pt-8 border-t border-white/5">
                  <div className="text-center group">
                    <div className="text-2xl font-bold text-emerald-400 transition-colors duration-300 group-hover:text-cyan-400">48hr</div>
                    <div className="text-xs text-white/40">Avg turnaround</div>
                  </div>
                  <div className="text-center group">
                    <div className="text-2xl font-bold text-emerald-400 transition-colors duration-300 group-hover:text-cyan-400">100%</div>
                    <div className="text-xs text-white/40">Satisfaction</div>
                  </div>
                  <div className="text-center group">
                    <div className="text-2xl font-bold text-emerald-400 transition-colors duration-300 group-hover:text-cyan-400">$0</div>
                    <div className="text-xs text-white/40">Until you love it</div>
                  </div>
                </div>
              </div>
              
              {/* Right - Animated Preview */}
              <div className={`transition-all duration-700 delay-400 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                <div className="relative group">
                  {/* Glow effect */}
                  <div className="absolute -inset-4 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 rounded-3xl blur-2xl opacity-50 transition-all duration-500 group-hover:opacity-75 group-hover:from-cyan-500/20 group-hover:to-emerald-500/20" />
                  
                  {/* Browser window */}
                  <div className="relative bg-[#111] border border-white/10 rounded-2xl overflow-hidden transition-colors duration-300 group-hover:border-emerald-500/20">
                    {/* Browser header */}
                    <div className="flex items-center gap-2 px-4 py-3 bg-white/5 border-b border-white/5">
                      <div className="flex gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-red-500/80" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                        <div className="w-3 h-3 rounded-full bg-green-500/80" />
                      </div>
                      <div className="flex-1 mx-4">
                        <div className="bg-white/5 rounded-lg px-3 py-1.5 text-xs text-white/40 font-mono">
                          yourbusiness.com
                        </div>
                      </div>
                    </div>
                    
                    {/* Preview content */}
                    <div className="p-6 h-80 flex flex-col items-center justify-center">
                      {currentStep < buildSteps.length ? (
                        <div className="text-center">
                          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-emerald-500/10 flex items-center justify-center">
                            <svg className="w-8 h-8 text-emerald-400 animate-spin" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                          </div>
                          <div className="text-emerald-400 font-medium mb-2">{buildSteps[currentStep]}</div>
                          <div className="flex justify-center gap-1 mt-4">
                            {buildSteps.map((_, i) => (
                              <div key={i} className={`w-2 h-2 rounded-full transition-colors duration-300 ${i <= currentStep ? 'bg-emerald-400' : 'bg-white/10'}`} />
                            ))}
                          </div>
                        </div>
                      ) : (
                        <div className="text-center animate-fadeIn">
                          <div className="text-emerald-400 mb-4">{Icons.sparkles}</div>
                          <div className="text-2xl font-bold text-white mb-2">Your site is live!</div>
                          <div className="text-white/50 text-sm">Ready to bring in customers</div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How it works */}
        <RevealSection className="py-32 px-6" delay={0}>
          <div id="how" className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <span className="text-sm font-medium text-emerald-400">How It Works</span>
              <h2 className="text-4xl md:text-5xl font-bold mt-4">Simple. Fast. Done.</h2>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {howItWorks.map((step, i) => (
                <div key={i} className="relative p-8 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-emerald-500/30 hover:bg-emerald-500/[0.02] transition-all duration-500 group">
                  <span className="absolute -top-3 -left-3 w-8 h-8 bg-emerald-500 text-black text-xs font-bold rounded-lg flex items-center justify-center transition-colors duration-300 group-hover:bg-cyan-400">
                    {step.num}
                  </span>
                  <div className="text-emerald-400 mb-4 transition-colors duration-300 group-hover:text-cyan-400">{step.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-white/50">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </RevealSection>

        {/* What's included */}
        <RevealSection className="py-32 px-6 bg-gradient-to-b from-transparent via-emerald-500/[0.02] to-transparent">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <span className="text-sm font-medium text-emerald-400">What You Get</span>
              <h2 className="text-4xl md:text-5xl font-bold mt-4">Everything you need.</h2>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {features.map((item, i) => (
                <div key={i} className="p-4 rounded-xl bg-white/[0.02] border border-white/5 text-center hover:border-emerald-500/30 hover:bg-emerald-500/5 transition-all duration-300 group">
                  <div className="text-emerald-400 mb-2 flex justify-center transition-colors duration-300 group-hover:text-cyan-400">{item.icon}</div>
                  <span className="text-sm text-white/70">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </RevealSection>

        {/* Sample work */}
        <RevealSection className="py-32 px-6">
          <div id="work" className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <span className="text-sm font-medium text-emerald-400">Our Work</span>
              <h2 className="text-4xl md:text-5xl font-bold mt-4">Sites we&apos;ve built.</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              {projects.map((project, i) => (
                <div key={i} className={`relative p-8 rounded-2xl border transition-all duration-500 ${project.cta ? 'border-emerald-500/30 bg-emerald-500/5' : `border-white/5 bg-white/[0.02] ${project.hoverColor}`}`}>
                  <div className={`absolute inset-0 bg-gradient-to-br ${project.color} rounded-2xl opacity-50 transition-opacity duration-500 group-hover:opacity-75`} />
                  <div className="relative">
                    <div className="text-xs text-white/40 uppercase tracking-wider mb-2">{project.type}</div>
                    <h3 className="text-2xl font-bold mb-3">{project.name}</h3>
                    <p className="text-white/50 mb-4">{project.desc}</p>
                    {project.cta ? (
                      <a href="#contact" className="inline-flex items-center gap-2 text-emerald-400 font-medium hover:text-cyan-400 transition-colors duration-300">
                        Get started <span>→</span>
                      </a>
                    ) : (
                      <a href={project.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-emerald-400 font-medium hover:text-cyan-400 transition-colors duration-300">
                        Visit site {Icons.externalLink}
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </RevealSection>

        {/* Pricing */}
        <RevealSection className="py-32 px-6">
          <div id="pricing" className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <span className="text-sm font-medium text-emerald-400">Pricing</span>
              <h2 className="text-4xl md:text-5xl font-bold mt-4">Fair prices. Real value.</h2>
              <p className="text-white/50 mt-4 max-w-lg mx-auto">No hidden fees. No surprises. You don&apos;t pay until you&apos;re happy.</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {pricing.map((plan, i) => (
                <div key={i} className={`p-8 rounded-2xl border transition-all duration-500 ${
                  plan.highlighted 
                    ? 'bg-emerald-500 text-black border-emerald-400 scale-105 hover:bg-cyan-400' 
                    : 'bg-white/[0.02] border-white/5 hover:border-emerald-500/30'
                }`}>
                  {plan.highlighted && (
                    <div className="text-xs font-bold uppercase tracking-wider mb-4 text-black/60">Most Popular</div>
                  )}
                  <div className={`text-3xl font-bold mb-1 ${plan.highlighted ? 'text-black' : 'text-white'}`}>
                    {plan.price}
                  </div>
                  <div className={`font-medium mb-1 ${plan.highlighted ? 'text-black' : 'text-white'}`}>
                    {plan.title}
                  </div>
                  <div className={`text-sm mb-6 ${plan.highlighted ? 'text-black/60' : 'text-white/40'}`}>
                    {plan.desc}
                  </div>
                  <ul className="space-y-2 mb-6">
                    {plan.features.map((f, j) => (
                      <li key={j} className={`flex items-center gap-2 text-sm ${plan.highlighted ? 'text-black/80' : 'text-white/60'}`}>
                        <svg className={`w-4 h-4 flex-shrink-0 ${plan.highlighted ? 'text-black' : 'text-emerald-400'}`} fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <a href="#contact" className={`block text-center py-3 rounded-xl font-semibold transition-all duration-300 ${
                    plan.highlighted 
                      ? 'bg-black text-white hover:bg-black/80' 
                      : 'bg-white/5 hover:bg-emerald-500/10 hover:text-emerald-400'
                  }`}>
                    {plan.cta}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </RevealSection>

        {/* Contact Form */}
        <RevealSection className="py-32 px-6">
          <div id="contact" className="max-w-xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl mb-8 text-emerald-400">
              {Icons.hand}
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Let&apos;s build something.</h2>
            <p className="text-white/50 mb-8">Tell us about your business. We&apos;ll get back to you within 24 hours.</p>
            
            {submitted ? (
              <div className="p-8 rounded-2xl bg-emerald-500/10 border border-emerald-500/20">
                <div className="flex justify-center mb-4">{Icons.check}</div>
                <h3 className="text-2xl font-bold mb-2">Message sent!</h3>
                <p className="text-white/50">We&apos;ll be in touch soon.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3 text-left">
                <div>
                  <label className="text-sm text-white/50 block mb-1">Your name</label>
                  <input
                    type="text"
                    required
                    placeholder="John Smith"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-emerald-500 transition-colors duration-300 placeholder:text-white/30"
                  />
                </div>
                <div>
                  <label className="text-sm text-white/50 block mb-1">Email</label>
                  <input
                    type="email"
                    required
                    placeholder="john@yourbusiness.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-emerald-500 transition-colors duration-300 placeholder:text-white/30"
                  />
                </div>
                <div>
                  <label className="text-sm text-white/50 block mb-1">Tell us about your business</label>
                  <textarea
                    required
                    placeholder="What does your business do? What kind of website are you looking for?"
                    value={business}
                    onChange={(e) => setBusiness(e.target.value)}
                    rows={4}
                    className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-emerald-500 transition-colors duration-300 placeholder:text-white/30 resize-none"
                  />
                </div>
                <button 
                  type="submit"
                  className="w-full py-4 bg-emerald-500 text-black font-bold rounded-xl hover:bg-cyan-400 transition-colors duration-300"
                >
                  Get Your Free Quote →
                </button>
                <p className="text-white/30 text-sm text-center">No commitment. No spam. Just a conversation.</p>
              </form>
            )}
          </div>
        </RevealSection>

        {/* Footer */}
        <footer className="py-8 px-6 border-t border-white/5">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2 group">
              <svg className="w-6 h-6" viewBox="0 0 120 120" fill="none">
                <rect width="120" height="120" rx="24" className="fill-emerald-500 transition-colors duration-300 group-hover:fill-cyan-400"/>
                <rect x="28" y="28" width="28" height="64" rx="8" fill="#0a0a0a"/>
                <rect x="64" y="28" width="28" height="64" rx="8" fill="#0a0a0a"/>
              </svg>
              <span className="font-medium text-sm">vera</span>
            </div>
            <p className="text-white/30 text-sm">© 2026 Vera. Websites for small business.</p>
            <a href="mailto:hello@tryvera.dev" className="text-white/50 hover:text-emerald-400 text-sm transition-colors duration-300">hello@tryvera.dev</a>
          </div>
        </footer>
      </div>
      
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient {
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </main>
  );
}
