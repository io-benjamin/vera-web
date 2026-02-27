'use client';

import { useState } from 'react';

export default function Home() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    window.location.href = `mailto:hello@tryvera.dev?subject=Website Inquiry&body=${encodeURIComponent(message)}%0A%0AFrom: ${encodeURIComponent(email)}`;
    setSubmitted(true);
  };

  return (
    <main className="min-h-screen bg-black text-white overflow-hidden">
      {/* Gradient Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-violet-950/30 via-black to-emerald-950/20" />
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-violet-600/10 via-transparent to-transparent" />
      
      {/* Grid Pattern */}
      <div className="fixed inset-0 opacity-20" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23333' stroke-width='0.5'%3E%3Cpath d='M0 0h60v60H0z'/%3E%3C/g%3E%3C/svg%3E")`,
      }} />

      <div className="relative z-10">
        {/* Navigation */}
        <nav className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-violet-500 to-emerald-500 flex items-center justify-center">
                <span className="font-black text-lg">V</span>
              </div>
              <span className="text-2xl font-bold tracking-tight">vera</span>
            </div>
            <a 
              href="#contact" 
              className="px-6 py-2.5 bg-white text-black font-semibold rounded-full hover:bg-white/90 transition-all hover:scale-105"
            >
              Get Started
            </a>
          </div>
        </nav>

        {/* Hero */}
        <section className="container mx-auto px-6 pt-20 pb-32">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10 mb-8">
              <span className="h-2 w-2 bg-emerald-500 rounded-full animate-pulse" />
              <span className="text-sm text-white/70">Available for new projects</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black leading-[1.1] mb-6">
              We build websites that{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-emerald-400">
                actually work
              </span>
            </h1>
            
            <p className="text-xl text-white/60 max-w-2xl mb-10 leading-relaxed">
              Your website is broken, slow, or doesn't exist. We fix that. 
              Fast, modern sites that bring in customers—not scare them away.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <a 
                href="#contact" 
                className="px-8 py-4 bg-gradient-to-r from-violet-600 to-emerald-600 font-semibold rounded-full hover:opacity-90 transition-all hover:scale-105 flex items-center gap-2"
              >
                Get a Free Audit
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              <a 
                href="#services" 
                className="px-8 py-4 border border-white/20 font-semibold rounded-full hover:bg-white/5 transition-all"
              >
                See Services
              </a>
            </div>
          </div>
        </section>

        {/* Problem Statement */}
        <section className="container mx-auto px-6 py-20 border-t border-white/10">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: '⚠️', title: 'Broken Links & Errors', desc: 'Visitors hit dead ends. They leave. You lose money.' },
              { icon: '🐌', title: 'Painfully Slow', desc: "If it takes more than 3 seconds, 50% of visitors are gone." },
              { icon: '📱', title: "Doesn't Work on Mobile", desc: "60% of traffic is mobile. If it's broken there, you're invisible." },
            ].map((item, i) => (
              <div key={i} className="p-8 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-white/20 transition-all">
                <span className="text-4xl mb-4 block">{item.icon}</span>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-white/50">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Services */}
        <section id="services" className="container mx-auto px-6 py-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-4">What We Do</h2>
            <p className="text-white/50 text-lg">Simple. Effective. No BS.</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              { title: 'Website Audit', price: 'Free', desc: "We'll find what's broken and show you exactly how to fix it.", features: ['Broken link check', 'Speed analysis', 'Mobile testing', 'SEO basics'], highlight: true },
              { title: 'Quick Fixes', price: 'From $150', desc: 'Small problems fixed fast. Broken links, slow pages, mobile issues.', features: ['24-48 hour turnaround', 'No contracts', 'Pay per fix', 'Ongoing support'], highlight: false },
              { title: 'New Website', price: 'From $999', desc: 'Modern, fast, mobile-first. Built to convert visitors to customers.', features: ['Custom design', 'Mobile responsive', 'SEO optimized', 'Contact forms'], highlight: false },
              { title: 'Monthly Care', price: '$99/mo', desc: "We keep it running. Updates, backups, fixes—you don't think about it.", features: ['Monthly updates', 'Security patches', 'Backups', 'Priority support'], highlight: false },
            ].map((service, i) => (
              <div key={i} className={`p-8 rounded-2xl border transition-all hover:scale-[1.02] ${service.highlight ? 'bg-gradient-to-br from-violet-600/20 to-emerald-600/20 border-violet-500/50' : 'bg-white/[0.03] border-white/10 hover:border-white/20'}`}>
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-bold">{service.title}</h3>
                  <span className={`text-xl font-black ${service.highlight ? 'text-emerald-400' : 'text-white/70'}`}>{service.price}</span>
                </div>
                <p className="text-white/50 mb-6">{service.desc}</p>
                <ul className="space-y-2">
                  {service.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm text-white/70">
                      <svg className="w-4 h-4 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Stats */}
        <section className="container mx-auto px-6 py-20 border-t border-white/10">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[
              { value: '50+', label: 'Websites Fixed' },
              { value: '24hr', label: 'Avg Response Time' },
              { value: '99%', label: 'Uptime Guarantee' },
              { value: '5★', label: 'Client Rating' },
            ].map((stat, i) => (
              <div key={i}>
                <div className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-emerald-400 mb-2">{stat.value}</div>
                <div className="text-white/50">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="container mx-auto px-6 py-20">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-black mb-4">Let's Fix Your Site</h2>
              <p className="text-white/50 text-lg">Free audit. No commitment. Real results.</p>
            </div>
            
            {submitted ? (
              <div className="p-8 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center">
                <span className="text-4xl mb-4 block">✓</span>
                <h3 className="text-2xl font-bold mb-2">Got it!</h3>
                <p className="text-white/70">We'll be in touch within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <input type="email" required placeholder="Your email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-violet-500 transition-all placeholder:text-white/30" />
                <textarea required placeholder="Tell us about your website (URL, what's broken, what you need)" value={message} onChange={(e) => setMessage(e.target.value)} rows={4} className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-violet-500 transition-all placeholder:text-white/30 resize-none" />
                <button type="submit" className="w-full py-4 bg-gradient-to-r from-violet-600 to-emerald-600 font-bold rounded-xl hover:opacity-90 transition-all hover:scale-[1.02]">Get Free Audit →</button>
                <p className="text-center text-white/30 text-sm">No spam. No commitment. Just help.</p>
              </form>
            )}
          </div>
        </section>

        {/* Footer */}
        <footer className="container mx-auto px-6 py-12 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-violet-500 to-emerald-500 flex items-center justify-center">
                <span className="font-black text-sm">V</span>
              </div>
              <span className="text-lg font-bold">vera</span>
            </div>
            <p className="text-white/30 text-sm">© 2026 Vera. Making the web work.</p>
            <a href="mailto:hello@tryvera.dev" className="text-white/50 hover:text-white transition-all">hello@tryvera.dev</a>
          </div>
        </footer>
      </div>
    </main>
  );
}
