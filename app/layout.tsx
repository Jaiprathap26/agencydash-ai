import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
const inter = Inter({ subsets: ["latin"] })
export const metadata: Metadata = {
  title: "AgencyDash.ai — White-Label AI Chatbot Dashboard for Agencies",
  description: "Deliver AI chatbots under your brand. Client management, analytics, and Stripe billing — all white-labeled. Used by 400+ AI agencies.",
  keywords: "white label AI chatbot, agency dashboard, AI agent dashboard, client management AI",
}
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (<html lang="en"><body className={inter.className}>{children}</body></html>)
}