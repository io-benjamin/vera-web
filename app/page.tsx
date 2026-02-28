'use client';

import { useState, useEffect, useRef } from 'react';
import { submitAuditRequest } from '../lib/supabase';

// Simulated audit steps for the hero animation
const auditSteps = [
  { text: 'Connecting to site...', delay: 0 },
  { text: 'Analyzing page structure', delay: 800 },
  { text: 'Checking load performance', delay: 1600 },
  { text: 'Scanning for broken links', delay: 2400 },
  { text: 'Testing mobile responsiveness', delay: 3200 },
  { text: 'Reviewing SEO elements', delay: 4000 },
  { text: 'Checking security headers', delay: 4800 },
  { text: 'Generating report...', delay: 5600 },
];

const findings = [
  { type: 'critical', text: 'Missing meta description' },
  { type: 'warning', text: 'Images lack alt text (3)' },
  { type: 'warning', text: 'No Open Graph image' },
  { type: 'info', text: 'Consider adding structured data' },
];

export default function Home() {
  const [email, setEmail] = useState('');
  const [website, setWebsite] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [showFindings, setShowFindings] = useState(false);
  const [visibleFindings, setVisibleFindings] = useState(0);
  const terminalRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    setMounted(true);
    
    // Run the terminal animation
    const stepTimers: NodeJS.Timeout[] = [];
    auditSteps.forEach((step, i) => {
      stepTimers.push(setTimeout(() => {
        setCurrentStep(i + 1);
        if (terminalRef.current) {
          terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
        }
      }, step.delay + 1000));
    });
    
    // Show findings after steps complete
    const findingsTimer = setTimeout(() => {
      setShowFindings(true);
      findings.forEach((_, i) => {
        setTimeout(() => setVisibleFindings(i + 1), i * 300);
      });
    }, 7000);
    
    // Reset and loop
    const resetTimer = setTimeout(() => {
      setCurrentStep(0);
      setShowFindings(false);
      setVisibleFindings(0);
    }, 12000);
    
    const loopInterval = setInterval(() => {
      setCurrentStep(0);
      setShowFindings(false);
      setVisibleFindings(0);
      
      auditSteps.forEach((step, i) => {
        setTimeout(() => {
          setCurrentStep(i + 1);
        }, step.delay + 1000);
      });
      
      setTimeout(() => {
        setShowFindings(true);
        findings.forEach((_, i) => {
          setTimeout(() => setVisibleFindings(i + 1), i * 300);
        });
      }, 7000);
    }, 12000);
    
    return () => {
      stepTimers.forEach(clearTimeout);
      clearTimeout(findingsTimer);
      clearTimeout(resetTimer);
      clearInterval(loopInterval);
    };
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
        <div className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-gradient-to-tr from-orange-500/10 via-transparent to-transparent rounded-full blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Nav */}
        <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-700 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
          <div className="max-w-6xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="absolute inset-0 bg-emerald-500/50 blur-lg" />
                  <div className="relative w-10 h-10 bg-emerald-500 rounded-lg flex items-center justify-center font-mono font-bold">
                    V
                  </div>
                </div>
                <span className="font-semibold tracking-tight">vera</span>
                <span className="text-xs text-white/30 font-mono">AI</span>
              </div>
              <div className="hidden md:flex items-center gap-6">
                <a href="#how" className="text-sm text-white/50 hover:text-white transition-colors">How it works</a>
                <a href="#pricing" className="text-sm text-white/50 hover:text-white transition-colors">Pricing</a>
              </div>
              <a href="#audit" className="px-5 py-2.5 bg-emerald-500 text-black text-sm font-semibold rounded-lg hover:bg-emerald-400 transition-colors">
                Free Audit
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
                  <span className="text-xs font-medium text-emerald-400">AI-Powered Analysis</span>
                </div>
                
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] mb-6">
                  Your site has
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
                    problems.
                  </span>
                </h1>
                
                <p className="text-lg text-white/50 mb-8 max-w-md leading-relaxed">
                  Our AI scans your website in seconds. Finds the issues killing your conversions. Tells you exactly how to fix them.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-3">
                  <a href="#audit" className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-emerald-500 text-black font-semibold rounded-xl hover:bg-emerald-400 transition-all group">
                    Scan Your Site Free
                    <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </a>
                  <a href="#how" className="inline-flex items-center justify-center gap-2 px-6 py-4 border border-white/10 text-white/70 font-medium rounded-xl hover:bg-white/5 transition-colors">
                    See how it works
                  </a>
                </div>
              </div>
              
              {/* Right - Live Terminal */}
              <div className={`transition-all duration-700 delay-400 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                <div className="relative">
                  {/* Glow effect */}
                  <div className="absolute -inset-4 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 rounded-3xl blur-2xl opacity-50" />
                  
                  {/* Terminal window */}
                  <div className="relative bg-[#111] border border-white/10 rounded-2xl overflow-hidden">
                    {/* Terminal header */}
                    <div className="flex items-center gap-2 px-4 py-3 bg-white/5 border-b border-white/5">
                      <div className="flex gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-red-500/80" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                        <div className="w-3 h-3 rounded-full bg-green-500/80" />
                      </div>
                      <span className="text-xs text-white/30 font-mono ml-2">vera-audit — example.com</span>
                    </div>
                    
                    {/* Terminal content */}
                    <div ref={terminalRef} className="p-4 font-mono text-sm h-80 overflow-y-auto scrollbar-hide">
                      <div className="text-white/30 mb-4">$ vera scan https://example.com</div>
                      
                      {auditSteps.slice(0, currentStep).map((step, i) => (
                        <div key={i} className="flex items-center gap-2 mb-2 animate-fadeIn">
                          <span className="text-emerald-400">›</span>
                          <span className="text-white/70">{step.text}</span>
                          {i < currentStep - 1 && <span className="text-emerald-400">✓</span>}
                          {i === currentStep - 1 && !showFindings && (
                            <span className="inline-block w-2 h-4 bg-emerald-400 animate-pulse" />
                          )}
                        </div>
                      ))}
                      
                      {showFindings && (
                        <div className="mt-6 pt-4 border-t border-white/10">
                          <div className="text-white/50 mb-3">Found {findings.length} issues:</div>
                          {findings.slice(0, visibleFindings).map((finding, i) => (
                            <div key={i} className="flex items-center gap-2 mb-2 animate-fadeIn">
                              <span className={`w-2 h-2 rounded-full ${
                                finding.type === 'critical' ? 'bg-red-500' :
                                finding.type === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
                              }`} />
                              <span className={`${
                                finding.type === 'critical' ? 'text-red-400' :
                                finding.type === 'warning' ? 'text-yellow-400' : 'text-blue-400'
                              }`}>{finding.text}</span>
                            </div>
                          ))}
                          {visibleFindings >= findings.length && (
                            <div className="mt-4 text-emerald-400 animate-fadeIn">
                              ✓ Report ready — Score: 67/100
                            </div>
                          )}
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
        <section id="how" className="py-32 px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <span className="text-sm font-medium text-emerald-400">How It Works</span>
              <h2 className="text-4xl md:text-5xl font-bold mt-4">AI does the work.</h2>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  num: '01',
                  title: 'Drop your URL',
                  desc: 'Enter your website. Our AI starts scanning immediately.',
                  icon: '🔗',
                },
                {
                  num: '02', 
                  title: 'AI analyzes everything',
                  desc: 'Speed, SEO, security, mobile, accessibility — all checked in seconds.',
                  icon: '🤖',
                },
                {
                  num: '03',
                  title: 'Get actionable report',
                  desc: 'Prioritized issues with exact steps to fix. No fluff.',
                  icon: '📋',
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
        </section>

        {/* What we check */}
        <section className="py-32 px-6 bg-gradient-to-b from-transparent via-emerald-500/[0.02] to-transparent">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <span className="text-sm font-medium text-emerald-400">What We Scan</span>
              <h2 className="text-4xl md:text-5xl font-bold mt-4">Deep analysis.</h2>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'Page Speed', icon: '⚡' },
                { label: 'Mobile UX', icon: '📱' },
                { label: 'SEO', icon: '🔍' },
                { label: 'Security', icon: '🔒' },
                { label: 'Accessibility', icon: '♿' },
                { label: 'Broken Links', icon: '🔗' },
                { label: 'Meta Tags', icon: '🏷️' },
                { label: 'Images', icon: '🖼️' },
              ].map((item, i) => (
                <div key={i} className="p-4 rounded-xl bg-white/[0.02] border border-white/5 text-center hover:border-emerald-500/30 hover:bg-emerald-500/5 transition-all">
                  <span className="text-2xl mb-2 block">{item.icon}</span>
                  <span className="text-sm text-white/70">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="py-32 px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <span className="text-sm font-medium text-emerald-400">Pricing</span>
              <h2 className="text-4xl md:text-5xl font-bold mt-4">Simple pricing. No surprises.</h2>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {[
                {
                  title: 'Free Audit',
                  price: '$0',
                  desc: 'See what\'s hurting you',
                  features: ['Full site scan', 'Problem breakdown', 'Priority ranking', 'No commitment'],
                  cta: 'Get Your Audit',
                  highlighted: false,
                },
                {
                  title: 'One-Time Fix',
                  price: '$199+',
                  desc: 'We fix, you relax',
                  features: ['48hr turnaround', 'Any issue fixed', 'Tested & verified', '30-day guarantee'],
                  cta: 'Get Started',
                  highlighted: false,
                },
                {
                  title: 'Monthly Care',
                  price: '$149/mo',
                  desc: 'Never worry again',
                  features: ['Unlimited fixes', 'Daily backups', '24/7 monitoring', 'Priority support'],
                  cta: 'Start Today',
                  highlighted: true,
                },
                {
                  title: 'New Website',
                  price: 'Custom',
                  desc: 'Built to convert',
                  features: ['Custom design', 'Mobile-first', 'SEO optimized', 'Fast turnaround'],
                  cta: 'Get Quote',
                  highlighted: false,
                },
              ].map((plan, i) => (
                <div key={i} className={`p-8 rounded-2xl border transition-all ${
                  plan.highlighted 
                    ? 'bg-emerald-500 text-black border-emerald-400' 
                    : 'bg-white/[0.02] border-white/5 hover:border-white/10'
                }`}>
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
                        <svg className={`w-4 h-4 ${plan.highlighted ? 'text-black' : 'text-emerald-400'}`} fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <a href="#audit" className={`block text-center py-3 rounded-xl font-semibold transition-all ${
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
        </section>

        {/* CTA / Audit Form */}
        <section id="audit" className="py-32 px-6">
          <div className="max-w-xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl mb-8">
              <span className="text-3xl">🔍</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Ready to find out?</h2>
            <p className="text-white/50 mb-8">Drop your URL. Get your free AI audit in 24 hours.</p>
            
            {submitted ? (
              <div className="p-8 rounded-2xl bg-emerald-500/10 border border-emerald-500/20">
                <div className="text-emerald-400 text-5xl mb-4">✓</div>
                <h3 className="text-2xl font-bold mb-2">Scanning started!</h3>
                <p className="text-white/50">Check your inbox in the next 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                <input
                  type="url"
                  required
                  placeholder="https://yourwebsite.com"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-emerald-500 transition-colors placeholder:text-white/30"
                />
                <input
                  type="email"
                  required
                  placeholder="you@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-emerald-500 transition-colors placeholder:text-white/30"
                />
                <button 
                  type="submit"
                  disabled={submitting}
                  className="w-full py-4 bg-emerald-500 text-black font-bold rounded-xl hover:bg-emerald-400 transition-colors disabled:opacity-50"
                >
                  {submitting ? 'Starting scan...' : 'Scan My Site Free →'}
                </button>
                <p className="text-white/30 text-sm">No credit card. No spam. Just insights.</p>
              </form>
            )}
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 px-6 border-t border-white/5">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-emerald-500 rounded flex items-center justify-center font-mono text-black text-xs font-bold">V</div>
              <span className="font-medium text-sm">vera</span>
            </div>
            <p className="text-white/30 text-sm">© 2026 Vera. AI-powered website audits.</p>
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
          animation: fadeIn 0.3s ease-out forwards;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </main>
  );
}
