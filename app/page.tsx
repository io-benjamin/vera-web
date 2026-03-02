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
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
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
  'Going live! 🚀',
];

// Reveal wrapper component
function RevealSection({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className={`${className} transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
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
                <div className="relative">
                  <div className="absolute inset-0 bg-emerald-500/50 blur-lg" />
                  <div className="relative w-10 h-10 bg-emerald-500 rounded-lg flex items-center justify-center font-mono font-bold text-black">
                    V
                  </div>
                </div>
                <span className="font-semibold tracking-tight">vera</span>
              </div>
              <div className="hidden md:flex items-center gap-6">
                <a href="#how" className="text-sm text-white/50 hover:text-white transition-colors">How it works</a>
                <a href="#pricing" className="text-sm text-white/50 hover:text-white transition-colors">Pricing</a>
                <a href="#work" className="text-sm text-white/50 hover:text-white transition-colors">Our work</a>
              </div>
              <a href="#contact" className="px-5 py-2.5 bg-emerald-500 text-black text-sm font-semibold rounded-lg hover:bg-emerald-400 transition-colors">
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
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
                    works for you.
                  </span>
                </h1>
                
                <p className="text-lg text-white/50 mb-8 max-w-md leading-relaxed">
                  Professional websites for small businesses. Fast turnaround. Fair prices. No headaches.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-3">
                  <a href="#contact" className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-emerald-500 text-black font-semibold rounded-xl hover:bg-emerald-400 transition-all group">
                    Get a Free Quote
                    <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </a>
                  <a href="#work" className="inline-flex items-center justify-center gap-2 px-6 py-4 border border-white/10 text-white/70 font-medium rounded-xl hover:bg-white/5 transition-colors">
                    See our work
                  </a>
                </div>
                
                {/* Trust badges */}
                <div className="flex items-center gap-6 mt-10 pt-8 border-t border-white/5">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-emerald-400">48hr</div>
                    <div className="text-xs text-white/40">Avg turnaround</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-emerald-400">100%</div>
                    <div className="text-xs text-white/40">Satisfaction</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-emerald-400">$0</div>
                    <div className="text-xs text-white/40">Until you love it</div>
                  </div>
                </div>
              </div>
              
              {/* Right - Animated Preview */}
              <div className={`transition-all duration-700 delay-400 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                <div className="relative">
                  {/* Glow effect */}
                  <div className="absolute -inset-4 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 rounded-3xl blur-2xl opacity-50" />
                  
                  {/* Browser window */}
                  <div className="relative bg-[#111] border border-white/10 rounded-2xl overflow-hidden">
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
                              <div key={i} className={`w-2 h-2 rounded-full transition-colors ${i <= currentStep ? 'bg-emerald-400' : 'bg-white/10'}`} />
                            ))}
                          </div>
                        </div>
                      ) : (
                        <div className="text-center animate-fadeIn">
                          <div className="text-5xl mb-4">✨</div>
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
              {[
                {
                  num: '01',
                  title: 'Tell us about your business',
                  desc: 'Quick chat or form. We learn what you need and what makes you different.',
                  icon: '💬',
                },
                {
                  num: '02', 
                  title: 'We build it',
                  desc: 'Professional design, mobile-ready, fast loading. Usually 2-5 days.',
                  icon: '🛠️',
                },
                {
                  num: '03',
                  title: 'You approve, we launch',
                  desc: 'Review it. Request tweaks. Once you love it, we go live.',
                  icon: '🚀',
                },
              ].map((step, i) => (
                <div key={i} className="relative p-8 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-emerald-500/30 transition-colors group">
                  <span className="absolute -top-3 -left-3 w-8 h-8 bg-emerald-500 text-black text-xs font-bold rounded-lg flex items-center justify-center">
                    {step.num}
                  </span>
                  <span className="text-4xl mb-4 block">{step.icon}</span>
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
              {[
                { label: 'Custom Design', icon: '🎨' },
                { label: 'Mobile Ready', icon: '📱' },
                { label: 'Fast Loading', icon: '⚡' },
                { label: 'SEO Optimized', icon: '🔍' },
                { label: 'Contact Forms', icon: '📝' },
                { label: 'Social Links', icon: '🔗' },
                { label: 'SSL Security', icon: '🔒' },
                { label: 'Easy Updates', icon: '✏️' },
              ].map((item, i) => (
                <div key={i} className="p-4 rounded-xl bg-white/[0.02] border border-white/5 text-center hover:border-emerald-500/30 hover:bg-emerald-500/5 transition-all">
                  <span className="text-2xl mb-2 block">{item.icon}</span>
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
              <h2 className="text-4xl md:text-5xl font-bold mt-4">Sites we've built.</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  name: 'Tacontigo',
                  type: 'Restaurant',
                  desc: 'Modern taqueria with online ordering and catering info.',
                  color: 'from-orange-500/20 to-yellow-500/20',
                },
                {
                  name: 'Your Business',
                  type: 'Could be next',
                  desc: 'Ready to stand out? Let\'s build something great.',
                  color: 'from-emerald-500/20 to-cyan-500/20',
                  cta: true,
                },
              ].map((project, i) => (
                <div key={i} className={`relative p-8 rounded-2xl border transition-all ${project.cta ? 'border-emerald-500/30 bg-emerald-500/5' : 'border-white/5 bg-white/[0.02]'}`}>
                  <div className={`absolute inset-0 bg-gradient-to-br ${project.color} rounded-2xl opacity-50`} />
                  <div className="relative">
                    <div className="text-xs text-white/40 uppercase tracking-wider mb-2">{project.type}</div>
                    <h3 className="text-2xl font-bold mb-3">{project.name}</h3>
                    <p className="text-white/50 mb-4">{project.desc}</p>
                    {project.cta ? (
                      <a href="#contact" className="inline-flex items-center gap-2 text-emerald-400 font-medium hover:text-emerald-300 transition-colors">
                        Get started <span>→</span>
                      </a>
                    ) : (
                      <span className="text-emerald-400 text-sm">Live & thriving</span>
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
              <p className="text-white/50 mt-4 max-w-lg mx-auto">No hidden fees. No surprises. You don't pay until you're happy.</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {[
                {
                  title: 'Starter',
                  price: '$499',
                  desc: 'Perfect for getting started',
                  features: ['1-3 page website', 'Mobile responsive', 'Contact form', 'Basic SEO', '2 revisions'],
                  cta: 'Get Started',
                  highlighted: false,
                },
                {
                  title: 'Business',
                  price: '$999',
                  desc: 'Most popular choice',
                  features: ['5-7 page website', 'Custom design', 'Advanced SEO', 'Social integration', 'Unlimited revisions', 'Priority support'],
                  cta: 'Get Started',
                  highlighted: true,
                },
                {
                  title: 'Custom',
                  price: 'Let\'s talk',
                  desc: 'Complex needs? We got you',
                  features: ['E-commerce', 'Booking systems', 'Custom features', 'Ongoing support', 'Whatever you need'],
                  cta: 'Contact Us',
                  highlighted: false,
                },
              ].map((plan, i) => (
                <div key={i} className={`p-8 rounded-2xl border transition-all ${
                  plan.highlighted 
                    ? 'bg-emerald-500 text-black border-emerald-400 scale-105' 
                    : 'bg-white/[0.02] border-white/5 hover:border-white/10'
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
                  <a href="#contact" className={`block text-center py-3 rounded-xl font-semibold transition-all ${
                    plan.highlighted 
                      ? 'bg-black text-white hover:bg-black/80' 
                      : 'bg-white/5 hover:bg-white/10'
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
            <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl mb-8">
              <span className="text-3xl">👋</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Let's build something.</h2>
            <p className="text-white/50 mb-8">Tell us about your business. We'll get back to you within 24 hours.</p>
            
            {submitted ? (
              <div className="p-8 rounded-2xl bg-emerald-500/10 border border-emerald-500/20">
                <div className="text-emerald-400 text-5xl mb-4">✓</div>
                <h3 className="text-2xl font-bold mb-2">Message sent!</h3>
                <p className="text-white/50">We'll be in touch soon.</p>
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
                    className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-emerald-500 transition-colors placeholder:text-white/30"
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
                    className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-emerald-500 transition-colors placeholder:text-white/30"
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
                    className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-emerald-500 transition-colors placeholder:text-white/30 resize-none"
                  />
                </div>
                <button 
                  type="submit"
                  className="w-full py-4 bg-emerald-500 text-black font-bold rounded-xl hover:bg-emerald-400 transition-colors"
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
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-emerald-500 rounded flex items-center justify-center font-mono text-black text-xs font-bold">V</div>
              <span className="font-medium text-sm">vera</span>
            </div>
            <p className="text-white/30 text-sm">© 2026 Vera. Websites for small business.</p>
            <a href="mailto:hello@tryvera.dev" className="text-white/50 hover:text-white text-sm transition-colors">hello@tryvera.dev</a>
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
      `}</style>
    </main>
  );
}
