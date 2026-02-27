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
    <main className="min-h-screen bg-[#09090B] text-white antialiased">
      {/* Subtle grid background */}
      <div 
        className="fixed inset-0 opacity-[0.02]" 
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.05) 1px, transparent 1px)',
          backgroundSize: '64px 64px'
        }}
      />

      <div className="relative z-10">
        {/* Navigation */}
        <nav className={`fixed top-0 left-0 right-0 z-50 border-b border-white/[0.06] bg-[#09090B]/80 backdrop-blur-lg transition-all duration-500 ${mounted ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}>
          <div className="container mx-auto px-6">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-white flex items-center justify-center">
                  <span className="font-black text-sm text-black">V</span>
                </div>
                <span className="text-lg font-semibold tracking-tight">vera</span>
              </div>
              <div className="hidden md:flex items-center gap-8">
                <a href="#services" className="text-sm text-zinc-400 hover:text-white transition-colors">Services</a>
                <a href="#work" className="text-sm text-zinc-400 hover:text-white transition-colors">Work</a>
                <a href="#contact" className="text-sm text-zinc-400 hover:text-white transition-colors">Contact</a>
              </div>
              <a href="#contact" className="px-4 py-2 bg-white text-black text-sm font-medium rounded-lg hover:bg-zinc-200 transition-colors">
                Get Started
              </a>
            </div>
          </div>
        </nav>

        {/* Hero */}
        <section className="min-h-screen flex items-center pt-16">
          <div className="container mx-auto px-6 py-24">
            <div className="max-w-3xl">
              <p className={`text-sm font-medium text-zinc-500 mb-6 transition-all duration-500 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
                Web Development & Repair
              </p>
              
              <h1 className={`text-4xl sm:text-5xl md:text-6xl font-semibold leading-[1.1] tracking-tight mb-6 transition-all duration-500 delay-100 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
                Your website is costing you customers.
                <span className="text-zinc-500"> We fix that.</span>
              </h1>
              
              <p className={`text-lg text-zinc-400 max-w-xl mb-10 leading-relaxed transition-all duration-500 delay-200 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
                Broken links, slow load times, and poor mobile experience drive visitors away. 
                We identify the problems and ship the fixes—fast.
              </p>

              <div className={`flex flex-col sm:flex-row gap-3 transition-all duration-500 delay-300 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
                <a href="#contact" className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-black font-medium rounded-lg hover:bg-zinc-200 transition-colors">
                  Get a Free Audit
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
                <a href="#services" className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-zinc-800 text-white font-medium rounded-lg hover:bg-zinc-900 transition-colors">
                  View Services
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="border-y border-white/[0.06]">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4">
              {[
                { value: '48h', label: 'Avg. Turnaround' },
                { value: '100+', label: 'Sites Fixed' },
                { value: '3x', label: 'Speed Increase' },
                { value: '99%', label: 'Uptime' },
              ].map((stat, i) => (
                <div key={i} className={`py-8 ${i > 0 ? 'border-l border-white/[0.06]' : ''} text-center`}>
                  <div className="text-2xl md:text-3xl font-semibold">{stat.value}</div>
                  <div className="text-sm text-zinc-500 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Problems */}
        <section className="py-24">
          <div className="container mx-auto px-6">
            <div className="max-w-2xl mb-16">
              <p className="text-sm font-medium text-zinc-500 mb-3">The Problem</p>
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">Common issues we solve</h2>
            </div>
            
            <div className="grid md:grid-cols-3 gap-px bg-white/[0.06] rounded-2xl overflow-hidden">
              {[
                { 
                  title: 'Broken & Outdated', 
                  desc: 'Dead links, missing images, and outdated information make visitors leave immediately.',
                  icon: (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  )
                },
                { 
                  title: 'Slow Performance', 
                  desc: 'Every second of load time costs conversions. Most sites are significantly slower than they should be.',
                  icon: (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  )
                },
                { 
                  title: 'Poor Mobile Experience', 
                  desc: 'Over 60% of traffic is mobile. Sites that do not work on phones are invisible to most visitors.',
                  icon: (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  )
                },
              ].map((item, i) => (
                <div key={i} className="bg-[#09090B] p-8">
                  <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-zinc-900 text-zinc-400 mb-4">
                    {item.icon}
                  </div>
                  <h3 className="text-lg font-medium mb-2">{item.title}</h3>
                  <p className="text-zinc-500 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Work / Portfolio */}
        <section id="work" className="py-24 border-t border-white/[0.06]">
          <div className="container mx-auto px-6">
            <div className="max-w-2xl mb-16">
              <p className="text-sm font-medium text-zinc-500 mb-3">Our Work</p>
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">Recent projects</h2>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { 
                  name: 'Financially Cooked',
                  url: 'financiallycooked.com',
                  desc: 'Viral financial calculator with 1,000+ users',
                  tags: ['Web App', 'React', 'Supabase']
                },
                { 
                  name: 'RVA Tacontigo',
                  url: 'rvatacontigo.com',
                  desc: 'Food truck website with mobile-first design',
                  tags: ['Small Business', 'Local SEO']
                },
                { 
                  name: 'NIMPRO Electrical',
                  url: 'nimproelectrical.com',
                  desc: 'Professional contractor site that converts',
                  tags: ['Contractor', 'Lead Generation']
                },
              ].map((project, i) => (
                <a 
                  key={i} 
                  href={`https://${project.url}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block p-6 rounded-xl border border-white/[0.06] hover:border-white/[0.12] bg-zinc-900/30 transition-all"
                >
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="font-medium">{project.name}</h3>
                    <svg className="w-4 h-4 text-zinc-600 group-hover:text-zinc-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </div>
                  <p className="text-zinc-500 text-sm mb-4">{project.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, j) => (
                      <span key={j} className="px-2 py-1 bg-zinc-800/50 rounded text-xs text-zinc-500">{tag}</span>
                    ))}
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Services */}
        <section id="services" className="py-24 border-t border-white/[0.06]">
          <div className="container mx-auto px-6">
            <div className="max-w-2xl mb-16">
              <p className="text-sm font-medium text-zinc-500 mb-3">Services</p>
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">Simple, transparent pricing</h2>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { 
                  title: 'Free Audit', 
                  price: '$0', 
                  desc: 'Comprehensive analysis of your current site.',
                  features: ['Full site scan', 'Speed analysis', 'Mobile testing', 'SEO review'],
                  featured: true
                },
                { 
                  title: 'Quick Fix', 
                  price: '$150+', 
                  desc: 'Fast fixes for specific issues.',
                  features: ['48hr turnaround', 'Bug fixes', 'Speed optimization', 'Content updates'],
                  featured: false
                },
                { 
                  title: 'New Website', 
                  price: '$999+', 
                  desc: 'Modern site built from scratch.',
                  features: ['Custom design', 'Mobile-first', 'SEO optimized', 'CMS included'],
                  featured: false
                },
                { 
                  title: 'Monthly Care', 
                  price: '$99/mo', 
                  desc: 'Ongoing maintenance and support.',
                  features: ['Regular updates', 'Security monitoring', 'Daily backups', 'Priority support'],
                  featured: false
                },
              ].map((service, i) => (
                <div key={i} className={`p-6 rounded-xl border ${service.featured ? 'border-white/20 bg-white/[0.02]' : 'border-white/[0.06]'}`}>
                  {service.featured && (
                    <span className="inline-block px-2 py-1 bg-white text-black text-xs font-medium rounded mb-4">Popular</span>
                  )}
                  <div className="text-2xl font-semibold mb-1">{service.price}</div>
                  <h3 className="font-medium mb-2">{service.title}</h3>
                  <p className="text-zinc-500 text-sm mb-6">{service.desc}</p>
                  <ul className="space-y-2">
                    {service.features.map((f, j) => (
                      <li key={j} className="flex items-center gap-2 text-sm text-zinc-400">
                        <svg className="w-4 h-4 text-zinc-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
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
        <section id="contact" className="py-24 border-t border-white/[0.06]">
          <div className="container mx-auto px-6">
            <div className="max-w-lg mx-auto">
              <div className="text-center mb-10">
                <h2 className="text-3xl font-semibold tracking-tight mb-3">Get your free audit</h2>
                <p className="text-zinc-500">Enter your site URL and we will send a detailed report within 24 hours.</p>
              </div>
              
              {submitted ? (
                <div className="text-center py-12 border border-white/[0.06] rounded-xl">
                  <svg className="w-12 h-12 mx-auto text-zinc-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <h3 className="text-xl font-medium mb-2">Request received</h3>
                  <p className="text-zinc-500 text-sm">We will be in touch within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <input
                    type="url"
                    required
                    placeholder="https://yourwebsite.com"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    className="w-full px-4 py-3 bg-transparent border border-zinc-800 rounded-lg focus:outline-none focus:border-zinc-600 transition-colors placeholder:text-zinc-700"
                  />
                  <input
                    type="email"
                    required
                    placeholder="you@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 bg-transparent border border-zinc-800 rounded-lg focus:outline-none focus:border-zinc-600 transition-colors placeholder:text-zinc-700"
                  />
                  <button type="submit" className="w-full py-3 bg-white text-black font-medium rounded-lg hover:bg-zinc-200 transition-colors">
                    Request Free Audit
                  </button>
                  <p className="text-center text-zinc-600 text-xs">No spam. No obligations.</p>
                </form>
              )}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 border-t border-white/[0.06]">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="h-6 w-6 rounded bg-white flex items-center justify-center">
                  <span className="font-bold text-xs text-black">V</span>
                </div>
                <span className="text-sm font-medium">vera</span>
              </div>
              <p className="text-zinc-600 text-sm">© 2026 Vera</p>
              <a href="https://mail.google.com/mail/?view=cm&to=hello@tryvera.dev" target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-white text-sm transition-colors">
                hello@tryvera.dev
              </a>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}
