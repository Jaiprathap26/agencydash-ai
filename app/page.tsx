"use client"
import Link from "next/link"

export default function AgencyDashLanding() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <nav className="border-b border-gray-800 px-6 py-4 flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center text-sm">🤖</div>
          <span className="font-bold text-xl">AgencyDash.ai</span>
        </div>
        <Link href="/dashboard" className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium">
          Start Agency Trial →
        </Link>
      </nav>

      <section className="max-w-5xl mx-auto px-6 pt-20 pb-16 text-center">
        <div className="inline-flex items-center gap-2 bg-purple-900/30 border border-purple-800 rounded-full px-4 py-2 text-sm text-purple-300 mb-8">
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
          400+ AI agencies · $2.3M collective client billings managed
        </div>
        <h1 className="text-5xl md:text-7xl font-black mb-6">
          White-Label AI Dashboards<br /><span className="text-purple-400">Your Brand, Your Clients</span>
        </h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10">
          Deliver AI chatbots under your own brand. Client portals, usage analytics, automated Stripe billing,
          and knowledge base management — all white-labeled in 5 minutes.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <Link href="/dashboard" className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-lg font-semibold transition-colors">
            Start Free Trial — No CC Required
          </Link>
          <Link href="#pricing" className="border border-gray-700 hover:border-gray-500 text-white px-8 py-4 rounded-lg font-semibold transition-colors">
            View Pricing
          </Link>
        </div>
        <p className="text-sm text-gray-500">14-day free trial · White-label ready in 5 minutes · Cancel anytime</p>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: "🎨", title: "Full White-Label", desc: "Your logo, domain, colors. Clients never see AgencyDash." },
            { icon: "📊", title: "Client Analytics", desc: "Call logs, message analytics, usage reports per client." },
            { icon: "💳", title: "Auto-Billing", desc: "Stripe integration: charge clients automatically for usage." },
            { icon: "🧠", title: "Knowledge Base Mgmt", desc: "Let clients update their own KB. No developer needed." },
          ].map((f, i) => (
            <div key={i} className="bg-gray-900 border border-gray-800 rounded-xl p-6">
              <div className="text-3xl mb-4">{f.icon}</div>
              <h3 className="font-bold mb-2">{f.title}</h3>
              <p className="text-gray-400 text-sm">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-20" id="pricing">
        <h2 className="text-4xl font-bold text-center mb-16">Pricing for Agencies</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {[
            { name: "Starter", price: "$49", india: "₹4,099", features: ["5 client portals", "White-label dashboard", "Basic analytics", "Email support"], cta: "Start Free", popular: false },
            { name: "Growth", price: "$99", india: "₹8,299", features: ["20 client portals", "Custom domain", "Stripe auto-billing", "Priority support", "API access"], cta: "Start Growth", popular: true },
            { name: "Scale", price: "$249", india: "₹20,899", features: ["Unlimited portals", "Multi-agent support", "White-label mobile app", "Dedicated CSM"], cta: "Contact Sales", popular: false },
          ].map((p, i) => (
            <div key={i} className={`rounded-2xl p-8 ${p.popular ? "bg-purple-600 border-2 border-purple-400" : "bg-gray-900 border border-gray-800"}`}>
              {p.popular && <div className="text-xs font-bold uppercase text-purple-200 mb-4">Best for Growth</div>}
              <h3 className="text-xl font-bold mb-1">{p.name}</h3>
              <div className="flex items-baseline gap-1 mb-1"><span className="text-4xl font-black">{p.price}</span><span className="text-sm text-gray-400">/mo</span></div>
              <p className="text-sm text-gray-400 mb-6">{p.india}/mo in India</p>
              <ul className="space-y-3 mb-8">{p.features.map((f, j) => <li key={j} className="text-sm flex items-center gap-2 text-gray-300"><span className="text-green-400">✓</span>{f}</li>)}</ul>
              <Link href="/dashboard" className={`block w-full py-3 rounded-lg font-semibold text-sm text-center ${p.popular ? "bg-white text-purple-600" : "bg-purple-600 text-white"}`}>{p.cta}</Link>
            </div>
          ))}
        </div>
      </section>

      <footer className="border-t border-gray-800 px-6 py-8 text-center text-gray-500 text-sm">
        © 2026 AgencyDash.ai — White-Label AI Dashboard for Agencies · Built by Amelia Sovereign AI
      </footer>
    </div>
  )
}