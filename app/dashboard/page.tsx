"use client"
import { useState } from "react"

type Client = { id: string; name: string; email: string; chatbotName: string; status: string; messagesUsed: number; monthlyLimit: number }

const DEMO_CLIENTS: Client[] = [
  { id: "1", name: "Raj Enterprises", email: "raj@rajenterprises.com", chatbotName: "RajBot", status: "active", messagesUsed: 1240, monthlyLimit: 2000 },
  { id: "2", name: "Mumbai Realty", email: "info@mumbairealty.com", chatbotName: "MumbaiBot", status: "active", messagesUsed: 890, monthlyLimit: 2000 },
  { id: "3", name: "FitLife India", email: "hello@fitlifeindia.com", chatbotName: "FitBot", status: "trial", messagesUsed: 145, monthlyLimit: 500 },
]

export default function AgencyDashboard() {
  const [clients] = useState<Client[]>(DEMO_CLIENTS)
  const [activeTab, setActiveTab] = useState("clients")
  const [generating, setGenerating] = useState<string | null>(null)
  const [botResponse, setBotResponse] = useState<Record<string, string>>({})

  const generateBotConfig = async (client: Client) => {
    setGenerating(client.id)
    try {
      const res = await fetch("/api/generate-bot-config", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ clientName: client.name, botName: client.chatbotName }),
      })
      const data = await res.json()
      setBotResponse(prev => ({ ...prev, [client.id]: data.config }))
    } finally {
      setGenerating(null)
    }
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <nav className="border-b border-gray-800 px-6 py-4 flex items-center gap-2">
        <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">🤖</div>
        <span className="font-bold text-xl">AgencyDash.ai</span>
        <span className="text-gray-500 ml-2">/ Agency Dashboard</span>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-1">Client Management</h1>
            <p className="text-gray-400">{clients.length} active clients · {clients.reduce((a, c) => a + c.messagesUsed, 0).toLocaleString()} total messages this month</p>
          </div>
          <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm">+ Add Client</button>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {[
            { label: "Total Clients", value: clients.length, color: "text-purple-400" },
            { label: "Messages This Month", value: clients.reduce((a, c) => a + c.messagesUsed, 0).toLocaleString(), color: "text-blue-400" },
            { label: "Est. MRR", value: "$" + (clients.filter(c => c.status === "active").length * 149).toLocaleString(), color: "text-green-400" },
          ].map((stat, i) => (
            <div key={i} className="bg-gray-900 border border-gray-800 rounded-xl p-6">
              <p className="text-gray-400 text-sm mb-1">{stat.label}</p>
              <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
            </div>
          ))}
        </div>

        <div className="space-y-4">
          {clients.map(client => (
            <div key={client.id} className="bg-gray-900 border border-gray-800 rounded-xl p-6">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-bold">{client.name}</h3>
                  <p className="text-gray-400 text-sm">{client.email} · Bot: {client.chatbotName}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className={`text-xs px-2 py-1 rounded-full ${client.status === "active" ? "bg-green-900 text-green-300" : "bg-yellow-900 text-yellow-300"}`}>
                      {client.status}
                    </span>
                    <span className="text-xs text-gray-500">{client.messagesUsed}/{client.monthlyLimit} messages</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => generateBotConfig(client)} disabled={generating === client.id}
                    className="bg-purple-600 hover:bg-purple-700 disabled:bg-purple-900 text-white px-3 py-1 rounded-lg text-sm transition-colors">
                    {generating === client.id ? "Generating..." : "✨ AI Config"}
                  </button>
                  <button className="border border-gray-700 hover:border-gray-500 text-gray-300 px-3 py-1 rounded-lg text-sm">View Portal</button>
                </div>
              </div>
              {botResponse[client.id] && (
                <div className="mt-4 bg-gray-800 rounded-lg p-4">
                  <p className="text-xs text-purple-400 mb-2 font-medium">AI-Generated Bot Configuration</p>
                  <pre className="text-xs text-gray-300 whitespace-pre-wrap">{botResponse[client.id]}</pre>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}