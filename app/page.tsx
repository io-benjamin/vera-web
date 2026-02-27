'use client';

import { useState, useEffect } from 'react';

export default function Home() {
  const [email, setEmail] = useState('');
  const [website, setWebsite] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    window.open(`https://mail.google.com/mail/?view=cm&to=hello@tryvera.dev&su=${encodeURIComponent('Free Website Audit Request')}&body=${encodeURIComponent(`Website: ${website}\n\nEmail: ${email}`)}`, '_blank');
    setSubmitted(true);
  };

  return (
    <main className="min-h-screen bg-white text-zinc-900 antialiased">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-zinc-200 transition-all duration-500 ${mounted ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <span className="text-xl font-semibold tracking-tight">vera</span>
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
            </div>
            <div className="hidden md:flex items-center gap-8">
              <a href="#how-it-works" className="text-sm text-zinc-600 hover:text-zinc-900 transition-colors">How It Works</a>
              <a href="#work" className="text-sm text-zinc-600 hover:text-zinc-900 transition-colors">Work</a>
              <a href="#pricing" className="text-sm text-zinc-600 hover:text-zinc-900 transition-colors">Pricing</a>
              <a href="#faq" className="text-sm text-zinc-600 hover:text-zinc-900 transition-colors">FAQ</a>
            </div>
            <a href="#contact" className="px-4 py-2 bg-zinc-900 text-white text-sm font-medium rounded-lg hover:bg-zinc-800 transition-colors">
              Get Started Free
            </a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-32">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-3xl">
            <div className={`transition-all duration-700 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-orange-50 border border-orange-200 rounded-full text-sm text-orange-700 mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
                Accepting new clients
              </div>
            </div>
            
            <h1 className={`text-4xl sm:text-5xl md:text-6xl font-semibold leading-[1.1] tracking-tight mb-6 transition-all duration-700 delay-100 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
              Your website should be your best salesperson.
              <span className="text-zinc-400"> Not your worst.</span>
            </h1>
            
            <p className={`text-lg text-zinc-600 max-w-xl mb-8 leading-relaxed transition-all duration-700 delay-200 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
              Broken links, slow pages, and poor mobile experience are costing you customers. 
              We audit, fix, and optimize your site so it actually converts.
            </p>

            <div className={`flex flex-col sm:flex-row gap-3 transition-all duration-700 delay-300 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
              <a href="#contact" className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-zinc-900 text-white font-medium rounded-lg hover:bg-zinc-800 transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Get Free Audit
              </a>
              <a href="#how-it-works" className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-zinc-300 text-zinc-700 font-medium rounded-lg hover:bg-zinc-50 transition-colors">
                See How It Works
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Logos / Trust */}
      <section className="py-12 border-y border-zinc-200 bg-zinc-50">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-center text-xs font-medium text-zinc-400 tracking-wider uppercase mb-8">Trusted by businesses in</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 text-zinc-400">
            {['Richmond VA', 'Washington DC', 'Charlotte NC', 'Atlanta GA', 'Remote'].map((city, i) => (
              <span key={i} className="text-sm font-medium">{city}</span>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 md:py-32">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-sm font-medium text-orange-600 mb-3">How It Works</p>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">Fix your website in 3 simple steps</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { 
                step: '01',
                title: 'Free Audit', 
                desc: 'We scan your site for broken links, speed issues, mobile problems, and SEO gaps. You get a detailed report within 24 hours.',
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                )
              },
              { 
                step: '02',
                title: 'Get a Quote', 
                desc: 'Based on the audit, we give you a clear, fixed-price quote. No hourly surprises. You know exactly what you pay.',
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                )
              },
              { 
                step: '03',
                title: 'We Fix It', 
                desc: 'Our team implements the fixes. Most projects are done within 48 hours. You get a faster, better site that converts.',
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                  </svg>
                )
              },
            ].map((item, i) => (
              <div key={i} className="relative p-6 bg-white border border-zinc-200 rounded-2xl hover:border-zinc-300 hover:shadow-sm transition-all">
                <div className="absolute -top-3 left-6 px-2 bg-white text-xs font-mono text-zinc-400">{item.step}</div>
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-orange-50 text-orange-600 mb-4">
                  {item.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-zinc-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Tabs */}
      <section className="py-20 md:py-32 bg-zinc-50 border-y border-zinc-200">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-sm font-medium text-orange-600 mb-3">What We Fix</p>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">Common problems we solve every day</h2>
          </div>
          
          <div className="flex justify-center gap-2 mb-8">
            {['Speed Issues', 'Mobile Problems', 'Broken Elements'].map((tab, i) => (
              <button
                key={i}
                onClick={() => setActiveTab(i)}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${activeTab === i ? 'bg-zinc-900 text-white' : 'bg-white border border-zinc-200 text-zinc-600 hover:bg-zinc-100'}`}
              >
                {tab}
              </button>
            ))}
          </div>
          
          <div className="max-w-2xl mx-auto">
            {activeTab === 0 && (
              <div className="bg-white border border-zinc-200 rounded-2xl p-8">
                <h3 className="text-xl font-semibold mb-3">Slow sites kill conversions</h3>
                <p className="text-zinc-600 mb-4">Every extra second of load time costs you 7% in conversions. We optimize images, clean up code, and implement caching to make your site lightning fast.</p>
                <ul className="space-y-2">
                  {['Image optimization', 'Code minification', 'Browser caching', 'CDN setup'].map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-zinc-600">
                      <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {activeTab === 1 && (
              <div className="bg-white border border-zinc-200 rounded-2xl p-8">
                <h3 className="text-xl font-semibold mb-3">60% of your visitors are on mobile</h3>
                <p className="text-zinc-600 mb-4">If your site is broken on phones, you are invisible to most of your potential customers. We make sure everything works perfectly on every device.</p>
                <ul className="space-y-2">
                  {['Responsive layouts', 'Touch-friendly buttons', 'Fast mobile loading', 'Readable text sizes'].map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-zinc-600">
                      <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {activeTab === 2 && (
              <div className="bg-white border border-zinc-200 rounded-2xl p-8">
                <h3 className="text-xl font-semibold mb-3">Broken things destroy trust</h3>
                <p className="text-zinc-600 mb-4">Dead links, missing images, and error pages make visitors leave immediately. We find and fix every broken element on your site.</p>
                <ul className="space-y-2">
                  {['Broken link repair', 'Missing image fixes', '404 page setup', 'Form testing'].map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-zinc-600">
                      <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Work / Portfolio */}
      <section id="work" className="py-20 md:py-32">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-sm font-medium text-orange-600 mb-3">Our Work</p>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">Recent projects</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { 
                name: 'Financially Cooked',
                url: 'financiallycooked.com',
                desc: 'Viral financial calculator with 1,000+ users. Built with React and Supabase.',
                tags: ['Web App', 'React']
              },
              { 
                name: 'RVA Tacontigo',
                url: 'rvatacontigo.com',
                desc: 'Food truck website optimized for mobile ordering and local SEO.',
                tags: ['Small Business', 'Mobile']
              },
              { 
                name: 'NIMPRO Electrical',
                url: 'nimproelectrical.com',
                desc: 'Professional contractor site built for lead generation and trust.',
                tags: ['Contractor', 'Lead Gen']
              },
            ].map((project, i) => (
              <a 
                key={i} 
                href={`https://${project.url}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group block p-6 bg-white border border-zinc-200 rounded-2xl hover:border-zinc-300 hover:shadow-sm transition-all"
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-semibold">{project.name}</h3>
                  <svg className="w-4 h-4 text-zinc-400 group-hover:text-zinc-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </div>
                <p className="text-zinc-600 text-sm mb-4">{project.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, j) => (
                    <span key={j} className="px-2 py-1 bg-zinc-100 rounded text-xs text-zinc-600">{tag}</span>
                  ))}
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 md:py-32 bg-zinc-50 border-y border-zinc-200">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-sm font-medium text-orange-600 mb-3">Pricing</p>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">Simple, transparent pricing</h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              { title: 'Audit', price: 'Free', desc: 'Full site analysis', features: ['Speed test', 'Mobile check', 'SEO review', 'Broken links scan'], featured: true },
              { title: 'Quick Fix', price: '$150+', desc: 'Per-issue pricing', features: ['48hr turnaround', 'Bug fixes', 'Speed fixes', 'Content updates'], featured: false },
              { title: 'New Site', price: '$999+', desc: 'Built from scratch', features: ['Custom design', 'Mobile-first', 'SEO setup', 'CMS included'], featured: false },
              { title: 'Monthly', price: '$99/mo', desc: 'Ongoing care', features: ['Updates', 'Backups', 'Security', 'Priority support'], featured: false },
            ].map((plan, i) => (
              <div key={i} className={`p-6 rounded-2xl border ${plan.featured ? 'bg-zinc-900 text-white border-zinc-900' : 'bg-white border-zinc-200'}`}>
                {plan.featured && <span className="inline-block px-2 py-1 bg-orange-500 text-white text-xs font-medium rounded mb-3">Popular</span>}
                <div className={`text-2xl font-semibold mb-1 ${plan.featured ? 'text-white' : ''}`}>{plan.price}</div>
                <h3 className={`font-medium mb-1 ${plan.featured ? 'text-white' : ''}`}>{plan.title}</h3>
                <p className={`text-sm mb-6 ${plan.featured ? 'text-zinc-400' : 'text-zinc-500'}`}>{plan.desc}</p>
                <ul className="space-y-2">
                  {plan.features.map((f, j) => (
                    <li key={j} className={`flex items-center gap-2 text-sm ${plan.featured ? 'text-zinc-300' : 'text-zinc-600'}`}>
                      <svg className={`w-4 h-4 ${plan.featured ? 'text-orange-400' : 'text-green-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

      {/* FAQ */}
      <section id="faq" className="py-20 md:py-32">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-sm font-medium text-orange-600 mb-3">FAQ</p>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">Frequently asked questions</h2>
          </div>
          
          <div className="space-y-3">
            {[
              { q: 'How long does an audit take?', a: 'Most audits are completed within 24 hours. You will receive a detailed PDF report via email.' },
              { q: 'What if I need ongoing support?', a: 'Our monthly care plan includes unlimited small fixes, regular updates, backups, and priority support for $99/month.' },
              { q: 'Do you work with all website platforms?', a: 'Yes. WordPress, Shopify, Squarespace, Wix, custom code—we work with everything.' },
              { q: 'What payment methods do you accept?', a: 'We accept all major credit cards, PayPal, and bank transfers for larger projects.' },
            ].map((faq, i) => (
              <div key={i} className="border border-zinc-200 rounded-xl overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-4 text-left hover:bg-zinc-50 transition-colors"
                >
                  <span className="font-medium">{faq.q}</span>
                  <svg className={`w-5 h-5 text-zinc-400 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {openFaq === i && (
                  <div className="px-4 pb-4 text-zinc-600 text-sm">{faq.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section id="contact" className="py-20 md:py-32 bg-zinc-900 text-white">
        <div className="max-w-xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4">Ready to fix your website?</h2>
          <p className="text-zinc-400 mb-8">Get your free audit. We will send a detailed report within 24 hours.</p>
          
          {submitted ? (
            <div className="py-8">
              <svg className="w-12 h-12 mx-auto text-green-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-xl font-medium mb-2">Request received!</p>
              <p className="text-zinc-400">We will be in touch within 24 hours.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="url"
                required
                placeholder="https://yourwebsite.com"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-white/40 text-white placeholder:text-zinc-500"
              />
              <input
                type="email"
                required
                placeholder="you@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-white/40 text-white placeholder:text-zinc-500"
              />
              <button type="submit" className="w-full py-3 bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600 transition-colors">
                Get Free Audit
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-zinc-200">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="font-semibold">vera</span>
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
            </div>
            <p className="text-zinc-500 text-sm">© 2026 Vera. All rights reserved.</p>
            <a href="https://mail.google.com/mail/?view=cm&to=hello@tryvera.dev" target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-zinc-900 text-sm transition-colors">
              hello@tryvera.dev
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
