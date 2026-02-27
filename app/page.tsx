'use client';

import { useState, useEffect, useRef } from 'react';
import { submitAuditRequest } from '../lib/supabase';

// Generate random dots for background
const generateDots = (count: number) => {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    top: Math.random() * 100,
    delay: Math.random() * 4,
    duration: 3 + Math.random() * 2,
  }));
};

export default function Home() {
  const [email, setEmail] = useState('');
  const [website, setWebsite] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [dots] = useState(() => generateDots(20));
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    setMounted(true);
    
    const handleMouse = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouse);
    return () => window.removeEventListener('mousemove', handleMouse);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    
    try {
      await submitAuditRequest({ email, website });
      setSubmitted(true);
    } catch (err) {
      window.open(`https://mail.google.com/mail/?view=cm&to=hello@tryvera.dev&su=${encodeURIComponent('Free Website Audit Request')}&body=${encodeURIComponent(`Website: ${website}\n\nEmail: ${email}`)}`, '_blank');
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen relative overflow-hidden">
      {/* Animated background elements */}
      <div className="grid-bg" />
      <div className="noise" />
      
      {/* Floating gradient shapes */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div 
          className="floating-shape shape-1"
          style={{
            transform: `translate(${mousePos.x * 0.02}px, ${mousePos.y * 0.02}px)`,
          }}
        />
        <div 
          className="floating-shape shape-2"
          style={{
            transform: `translate(${mousePos.x * -0.015}px, ${mousePos.y * -0.015}px)`,
          }}
        />
        <div 
          className="floating-shape shape-3"
          style={{
            transform: `translate(${mousePos.x * 0.01}px, ${mousePos.y * 0.01}px)`,
          }}
        />
      </div>
      
      {/* Animated dots */}
      <div className="dot-field">
        {dots.map(dot => (
          <div
            key={dot.id}
            className="dot"
            style={{
              left: `${dot.left}%`,
              top: `${dot.top}%`,
              animationDelay: `${dot.delay}s`,
              animationDuration: `${dot.duration}s`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Nav */}
        <nav className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
          <div className="flex items-center gap-2 px-6 py-3 bg-white/70 backdrop-blur-xl rounded-full border border-black/5 shadow-lg shadow-black/5">
            <div className="flex items-center gap-2 pr-4 border-r border-black/10">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#ff6b35] to-[#ff8f65] flex items-center justify-center">
                <span className="text-white font-bold text-sm">V</span>
              </div>
              <span className="font-semibold text-sm">vera</span>
            </div>
            <div className="hidden md:flex items-center">
              <a href="#work" className="px-4 py-2 text-sm text-black/50 hover:text-black transition-colors">Work</a>
              <a href="#pricing" className="px-4 py-2 text-sm text-black/50 hover:text-black transition-colors">Pricing</a>
            </div>
            <a href="#contact" className="ml-2 px-5 py-2 bg-black text-white text-sm font-medium rounded-full hover:bg-black/80 transition-colors">
              Free Audit
            </a>
          </div>
        </nav>

        {/* Hero */}
        <section className="min-h-screen flex items-center justify-center px-6">
          <div className="max-w-3xl mx-auto text-center">
            <div className={`transition-all duration-700 delay-100 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#fff4f0] rounded-full mb-8">
                <span className="w-2 h-2 rounded-full bg-[#ff6b35] animate-pulse" />
                <span className="text-sm font-medium text-[#ff6b35]">Now accepting clients</span>
              </div>
            </div>
            
            <h1 className={`text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.05] tracking-tight mb-8 transition-all duration-700 delay-200 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              Websites that
              <br />
              <span className="relative">
                actually
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 12" fill="none">
                  <path d="M2 10C50 4 150 4 198 10" stroke="#ff6b35" strokeWidth="4" strokeLinecap="round" className="animate-draw" />
                </svg>
              </span>
              {' '}work.
            </h1>
            
            <p className={`text-lg md:text-xl text-black/50 max-w-lg mx-auto mb-12 leading-relaxed transition-all duration-700 delay-300 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              Slow loads. Broken links. Mobile nightmares.
              <br />
              We fix what is costing you customers.
            </p>
            
            <div className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-700 delay-400 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <a href="#contact" className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-black text-white font-semibold rounded-2xl hover:bg-black/80 transition-all hover:gap-4">
                Get Your Free Audit
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </div>
        </section>

        {/* Problem Statement */}
        <section className="py-32 px-6">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { 
                  num: '7%',
                  title: 'lost per second',
                  desc: 'Every extra second of load time costs you conversions. Speed matters.',
                },
                { 
                  num: '60%',
                  title: 'are on mobile',
                  desc: 'If your site breaks on phones, most visitors never see it properly.',
                },
                { 
                  num: '88%',
                  title: 'wont return',
                  desc: 'Users who have a bad experience rarely give you a second chance.',
                },
              ].map((stat, i) => (
                <div key={i} className="group p-8 rounded-3xl bg-white border border-black/5 hover:border-[#ff6b35]/20 hover:shadow-xl hover:shadow-[#ff6b35]/5 transition-all duration-300">
                  <div className="text-5xl font-bold text-[#ff6b35] mb-2">{stat.num}</div>
                  <div className="text-lg font-semibold mb-3">{stat.title}</div>
                  <p className="text-black/50 leading-relaxed">{stat.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Work */}
        <section id="work" className="py-32 px-6 bg-white">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <span className="text-sm font-medium text-[#ff6b35] tracking-wide uppercase">Our Work</span>
              <h2 className="text-4xl md:text-5xl font-bold mt-4">Built different.</h2>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { 
                  name: 'Financially Cooked',
                  url: 'financiallycooked.com',
                  desc: 'Viral calculator app. 1000+ users in first week.',
                  gradient: 'from-orange-500 to-red-500',
                },
                { 
                  name: 'RVA Tacontigo',
                  url: 'rvatacontigo.com',
                  desc: 'Food truck site. Mobile-first, lightning fast.',
                  gradient: 'from-green-500 to-emerald-500',
                },
                { 
                  name: 'NIMPRO Electrical',
                  url: 'nimproelectrical.com',
                  desc: 'Contractor site. Professional, converts leads.',
                  gradient: 'from-blue-500 to-indigo-500',
                },
              ].map((project, i) => (
                <a 
                  key={i} 
                  href={`https://${project.url}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block"
                >
                  <div className={`aspect-[4/3] rounded-2xl bg-gradient-to-br ${project.gradient} mb-4 flex items-center justify-center overflow-hidden relative`}>
                    <span className="text-white/20 text-6xl font-bold group-hover:scale-110 transition-transform duration-300">{project.name[0]}</span>
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                      <span className="text-white font-medium opacity-0 group-hover:opacity-100 transition-opacity">View Site →</span>
                    </div>
                  </div>
                  <h3 className="font-semibold mb-1">{project.name}</h3>
                  <p className="text-black/50 text-sm">{project.desc}</p>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="py-32 px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <span className="text-sm font-medium text-[#ff6b35] tracking-wide uppercase">Pricing</span>
              <h2 className="text-4xl md:text-5xl font-bold mt-4">No surprises.</h2>
              <p className="text-black/50 mt-4 max-w-md mx-auto">Fixed prices. Clear scope. You know what you pay before we start.</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { 
                  title: 'Audit', 
                  price: 'Free', 
                  desc: 'Full analysis of your site',
                  features: ['Speed test', 'Mobile check', 'SEO review', 'Action plan'],
                  highlight: true,
                },
                { 
                  title: 'Quick Fix', 
                  price: '$199+', 
                  desc: 'Per-issue pricing',
                  features: ['48hr turnaround', 'Bug fixes', 'Speed optimization', 'Content updates'],
                  highlight: false,
                },
                { 
                  title: 'New Build', 
                  price: '$2,500+', 
                  desc: 'Website from scratch',
                  features: ['Custom design', 'Mobile-first', 'SEO ready', 'CMS included'],
                  highlight: false,
                },
                { 
                  title: 'Monthly', 
                  price: '$149/mo', 
                  desc: 'Ongoing maintenance',
                  features: ['Updates & fixes', 'Daily backups', 'Security monitoring', 'Priority support'],
                  highlight: false,
                },
              ].map((plan, i) => (
                <div 
                  key={i} 
                  className={`p-6 rounded-3xl transition-all ${
                    plan.highlight 
                      ? 'bg-black text-white' 
                      : 'bg-white border border-black/5 hover:border-black/10'
                  }`}
                >
                  {plan.highlight && (
                    <span className="inline-block px-3 py-1 bg-[#ff6b35] text-white text-xs font-medium rounded-full mb-4">Start Here</span>
                  )}
                  <div className={`text-3xl font-bold mb-1 ${plan.highlight ? 'text-white' : 'text-black'}`}>{plan.price}</div>
                  <div className={`font-medium mb-2 ${plan.highlight ? 'text-white' : 'text-black'}`}>{plan.title}</div>
                  <p className={`text-sm mb-6 ${plan.highlight ? 'text-white/60' : 'text-black/50'}`}>{plan.desc}</p>
                  <ul className="space-y-2">
                    {plan.features.map((f, j) => (
                      <li key={j} className={`flex items-center gap-2 text-sm ${plan.highlight ? 'text-white/80' : 'text-black/60'}`}>
                        <svg className={`w-4 h-4 flex-shrink-0 ${plan.highlight ? 'text-[#ff6b35]' : 'text-[#ff6b35]'}`} fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="py-32 px-6 bg-white">
          <div className="max-w-xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold">Get your free audit.</h2>
              <p className="text-black/50 mt-4">Drop your URL. We will send a full report within 24 hours.</p>
            </div>
            
            {submitted ? (
              <div className="text-center py-12">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-6">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-2">You are in!</h3>
                <p className="text-black/50">Check your inbox in the next 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="url"
                  required
                  placeholder="https://yourwebsite.com"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  className="w-full px-6 py-4 bg-[#fafafa] border border-black/10 rounded-2xl focus:outline-none focus:border-[#ff6b35] focus:ring-2 focus:ring-[#ff6b35]/10 transition-all"
                />
                <input
                  type="email"
                  required
                  placeholder="you@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-6 py-4 bg-[#fafafa] border border-black/10 rounded-2xl focus:outline-none focus:border-[#ff6b35] focus:ring-2 focus:ring-[#ff6b35]/10 transition-all"
                />
                <button 
                  type="submit"
                  disabled={submitting}
                  className="w-full py-4 bg-black text-white font-semibold rounded-2xl hover:bg-black/80 transition-colors disabled:opacity-50"
                >
                  {submitting ? 'Sending...' : 'Send My Free Audit'}
                </button>
                <p className="text-center text-black/30 text-sm">No spam. No sales calls. Just a report.</p>
              </form>
            )}
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 px-6 border-t border-black/5">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-gradient-to-br from-[#ff6b35] to-[#ff8f65] flex items-center justify-center">
                <span className="text-white font-bold text-xs">V</span>
              </div>
              <span className="font-medium text-sm">vera</span>
            </div>
            <p className="text-black/30 text-sm">© 2026 Vera. Websites that work.</p>
            <a href="mailto:hello@tryvera.dev" className="text-black/50 hover:text-black text-sm transition-colors">hello@tryvera.dev</a>
          </div>
        </footer>
      </div>
      
      <style jsx>{`
        @keyframes draw {
          from { stroke-dashoffset: 200; }
          to { stroke-dashoffset: 0; }
        }
        .animate-draw {
          stroke-dasharray: 200;
          stroke-dashoffset: 200;
          animation: draw 1s ease-out 0.5s forwards;
        }
      `}</style>
    </main>
  );
}
