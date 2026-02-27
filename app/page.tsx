'use client';

import { useState, useEffect } from 'react';

export default function Home() {
  const [email, setEmail] = useState('');
  const [website, setWebsite] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    window.open(`https://mail.google.com/mail/?view=cm&to=hello@tryvera.dev&su=${encodeURIComponent('Free Website Audit Request')}&body=${encodeURIComponent(`Website: ${website}\n\nEmail: ${email}`)}`, '_blank');
    setSubmitted(true);
  };

  return (
    <main className="min-h-screen bg-[#0A0A0A] text-white">
      {/* Animated gradient orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-500/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute top-1/2 -left-40 w-80 h-80 bg-cyan-500/20 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute -bottom-40 right-1/3 w-72 h-72 bg-pink-500/20 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Noise texture */}
      <div className="fixed inset-0 opacity-[0.015] pointer-events-none" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
      }} />

      <div className="relative z-10">
        {/* Navigation */}
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${mounted ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}>
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between backdrop-blur-xl bg-white/[0.03] border border-white/[0.05] rounded-2xl px-6 py-3">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-xl blur-sm opacity-70" />
                  <div className="relative h-10 w-10 rounded-xl bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center">
                    <span className="font-black text-lg">V</span>
                  </div>
                </div>
                <span className="text-xl font-bold">vera</span>
              </div>
              <div className="hidden md:flex items-center gap-8">
                <a href="#services" className="text-sm text-white/60 hover:text-white transition-colors">Services</a>
                <a href="#work" className="text-sm text-white/60 hover:text-white transition-colors">Work</a>
                <a href="#contact" className="text-sm text-white/60 hover:text-white transition-colors">Contact</a>
              </div>
              <a href="#contact" className="group relative px-5 py-2.5 overflow-hidden rounded-xl">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-cyan-500 transition-transform group-hover:scale-105" />
                <span className="relative font-semibold text-sm">Get Started</span>
              </a>
            </div>
          </div>
        </nav>

        {/* Hero */}
        <section className="min-h-screen flex items-center pt-32 pb-20">
          <div className="container mx-auto px-6">
            <div className="max-w-5xl">
              <div className={`transition-all duration-700 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/[0.03] rounded-full border border-white/[0.08] mb-8">
                  <div className="flex -space-x-1">
                    <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                    <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" style={{ animationDelay: '0.2s' }} />
                    <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" style={{ animationDelay: '0.4s' }} />
                  </div>
                  <span className="text-sm text-white/50">Available for projects</span>
                </div>
              </div>
              
              <h1 className={`text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-[0.95] mb-8 transition-all duration-700 delay-100 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                <span className="block">Your website</span>
                <span className="block">is losing you</span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400">money.</span>
              </h1>
              
              <p className={`text-lg md:text-xl text-white/50 max-w-xl mb-12 leading-relaxed transition-all duration-700 delay-200 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                Broken links. Slow load times. Terrible on mobile. 
                We find the problems and fix them fast.
              </p>

              <div className={`flex flex-col sm:flex-row gap-4 transition-all duration-700 delay-300 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                <a href="#contact" className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 overflow-hidden rounded-2xl">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 transition-all group-hover:scale-105" />
                  <div className="absolute inset-[2px] bg-[#0A0A0A] rounded-[14px] transition-opacity group-hover:opacity-0" />
                  <span className="relative font-bold text-lg">Free Website Audit</span>
                  <svg className="relative w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
                <a href="#services" className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl border border-white/10 font-semibold hover:bg-white/5 transition-all">
                  View Services
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Stats bar */}
        <section className="py-12 border-y border-white/[0.05]">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { value: '48hr', label: 'Average Turnaround' },
                { value: '100+', label: 'Sites Improved' },
                { value: '3x', label: 'Speed Increase' },
                { value: '24/7', label: 'Support' },
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">{stat.value}</div>
                  <div className="text-sm text-white/40 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Problems we solve */}
        <section className="py-24">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <span className="text-sm font-medium text-purple-400 tracking-wider uppercase">The Problem</span>
              <h2 className="text-4xl md:text-5xl font-black mt-4">These issues are killing your business</h2>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { 
                  icon: '💀', 
                  title: 'Broken & Outdated', 
                  desc: 'Dead links, missing images, and outdated info make visitors bounce instantly.',
                  color: 'from-red-500/20 to-orange-500/20',
                  border: 'border-red-500/20'
                },
                { 
                  icon: '🐢', 
                  title: 'Painfully Slow', 
                  desc: 'Every second of load time costs you 7% in conversions. Most sites are way too slow.',
                  color: 'from-yellow-500/20 to-amber-500/20',
                  border: 'border-yellow-500/20'
                },
                { 
                  icon: '📱', 
                  title: 'Mobile Disaster', 
                  desc: '60% of your traffic is mobile. If your site is broken on phones, you are invisible.',
                  color: 'from-blue-500/20 to-cyan-500/20',
                  border: 'border-blue-500/20'
                },
              ].map((item, i) => (
                <div key={i} className={`group p-8 rounded-3xl bg-gradient-to-br ${item.color} border ${item.border} hover:scale-[1.02] transition-all duration-300`}>
                  <span className="text-5xl block mb-6">{item.icon}</span>
                  <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                  <p className="text-white/50 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Portfolio / Work */}
        <section id="work" className="py-24">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <span className="text-sm font-medium text-pink-400 tracking-wider uppercase">Our Work</span>
              <h2 className="text-4xl md:text-5xl font-black mt-4">Sites we have built</h2>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {[
                { 
                  name: 'Financially Cooked',
                  url: 'financiallycooked.com',
                  desc: 'Viral financial calculator with 1000+ users. Modern dark theme with animations.',
                  tags: ['Web App', 'React', 'Supabase'],
                  color: 'from-orange-500/20 to-red-500/20',
                  border: 'border-orange-500/20'
                },
                { 
                  name: 'RVA Tacontigo',
                  url: 'rvatacontigo.com',
                  desc: 'Local food truck website. Mobile-first design for on-the-go customers.',
                  tags: ['Small Business', 'Mobile', 'Local SEO'],
                  color: 'from-green-500/20 to-emerald-500/20',
                  border: 'border-green-500/20'
                },
                { 
                  name: 'NIMPRO Electrical',
                  url: 'nimproelectrical.com',
                  desc: 'Professional contractor site. Clean design that builds trust and converts.',
                  tags: ['Contractor', 'Lead Gen', 'Professional'],
                  color: 'from-blue-500/20 to-indigo-500/20',
                  border: 'border-blue-500/20'
                },
              ].map((project, i) => (
                <a 
                  key={i} 
                  href={`https://${project.url}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group p-6 rounded-3xl bg-gradient-to-br ${project.color} border ${project.border} hover:scale-[1.02] transition-all duration-300`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold">{project.name}</h3>
                    <svg className="w-5 h-5 text-white/30 group-hover:text-white/70 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </div>
                  <p className="text-white/50 text-sm mb-4">{project.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, j) => (
                      <span key={j} className="px-2 py-1 bg-white/5 rounded-lg text-xs text-white/40">{tag}</span>
                    ))}
                  </div>
                  <div className="mt-4 pt-4 border-t border-white/5">
                    <span className="text-sm text-white/30">{project.url}</span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Services */}
        <section id="services" className="py-24 bg-gradient-to-b from-transparent via-purple-500/[0.03] to-transparent">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <span className="text-sm font-medium text-cyan-400 tracking-wider uppercase">Services</span>
              <h2 className="text-4xl md:text-5xl font-black mt-4">Simple pricing. Real results.</h2>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {[
                { 
                  title: 'Free Audit', 
                  price: '$0', 
                  desc: 'We analyze your site and show you exactly what needs fixing.',
                  features: ['Full site scan', 'Speed test', 'Mobile check', 'SEO review'],
                  cta: 'Get Started',
                  featured: true
                },
                { 
                  title: 'Quick Fix', 
                  price: '$150+', 
                  desc: 'Small problems fixed fast. Pay per issue.',
                  features: ['48hr turnaround', 'Broken links', 'Speed fixes', 'Bug repairs'],
                  cta: 'Learn More',
                  featured: false
                },
                { 
                  title: 'New Build', 
                  price: '$999+', 
                  desc: 'Modern website built from scratch.',
                  features: ['Custom design', 'Mobile-first', 'SEO ready', 'Fast hosting'],
                  cta: 'Learn More',
                  featured: false
                },
                { 
                  title: 'Monthly', 
                  price: '$99/mo', 
                  desc: 'We handle everything. You relax.',
                  features: ['Updates', 'Backups', 'Security', 'Priority support'],
                  cta: 'Learn More',
                  featured: false
                },
              ].map((service, i) => (
                <div key={i} className={`relative p-6 rounded-3xl border transition-all hover:scale-[1.02] ${service.featured ? 'bg-gradient-to-br from-purple-500/10 to-cyan-500/10 border-purple-500/30' : 'bg-white/[0.02] border-white/[0.05] hover:border-white/10'}`}>
                  {service.featured && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full text-xs font-bold">
                      Most Popular
                    </div>
                  )}
                  <div className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 mb-1">{service.price}</div>
                  <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                  <p className="text-white/40 text-sm mb-6">{service.desc}</p>
                  <ul className="space-y-2 mb-6">
                    {service.features.map((f, j) => (
                      <li key={j} className="flex items-center gap-2 text-sm text-white/60">
                        <svg className="w-4 h-4 text-cyan-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <a href="#contact" className={`block text-center py-3 rounded-xl font-semibold transition-all ${service.featured ? 'bg-gradient-to-r from-purple-500 to-cyan-500 hover:opacity-90' : 'bg-white/5 hover:bg-white/10'}`}>
                    {service.cta}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA / Contact */}
        <section id="contact" className="py-24">
          <div className="container mx-auto px-6">
            <div className="max-w-2xl mx-auto">
              <div className="relative p-8 md:p-12 rounded-[2rem] overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-pink-500/10 to-cyan-500/20" />
                <div className="absolute inset-[1px] bg-[#0A0A0A] rounded-[calc(2rem-1px)]" />
                
                <div className="relative">
                  <div className="text-center mb-10">
                    <h2 className="text-3xl md:text-4xl font-black mb-4">Get your free audit</h2>
                    <p className="text-white/50">Enter your website and we will send you a full report within 24 hours.</p>
                  </div>
                  
                  {submitted ? (
                    <div className="text-center py-8">
                      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 mb-4">
                        <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <h3 className="text-2xl font-bold mb-2">Request received!</h3>
                      <p className="text-white/50">We will be in touch within 24 hours.</p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <input
                          type="url"
                          required
                          placeholder="Your website URL"
                          value={website}
                          onChange={(e) => setWebsite(e.target.value)}
                          className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-purple-500/50 transition-colors placeholder:text-white/30"
                        />
                      </div>
                      <div>
                        <input
                          type="email"
                          required
                          placeholder="Your email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-purple-500/50 transition-colors placeholder:text-white/30"
                        />
                      </div>
                      <button type="submit" className="w-full py-4 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 font-bold rounded-xl hover:opacity-90 transition-opacity">
                        Send Me My Free Audit →
                      </button>
                      <p className="text-center text-white/30 text-sm">No spam. No obligations. Just insights.</p>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 border-t border-white/[0.05]">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center">
                  <span className="font-black text-sm">V</span>
                </div>
                <span className="font-bold">vera</span>
              </div>
              <p className="text-white/30 text-sm">© 2026 Vera. Making websites work.</p>
              <a href="https://mail.google.com/mail/?view=cm&to=hello@tryvera.dev" className="text-white/50 hover:text-white transition-colors">hello@tryvera.dev</a>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}
