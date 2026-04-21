import Anthropic from "@anthropic-ai/sdk"
import { NextRequest, NextResponse } from "next/server"

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY! })

export async function POST(req: NextRequest) {
  try {
    const { clientName, botName } = await req.json()
    const response = await client.messages.create({
      model: "claude-opus-4-5",
      max_tokens: 1500,
      system: "You are an AI chatbot configuration expert. You create professional, effective chatbot personas and configurations for businesses.",
      messages: [{
        role: "user",
        content: `Generate a complete AI chatbot configuration for:
Client: ${clientName}
Bot Name: ${botName}

Provide:
## BOT PERSONA
- Greeting message (friendly, professional, brand-appropriate):
- Tone & Voice guidelines (3-5 bullet points):
- Response style (length, formality, emojis):

## CORE CAPABILITIES
- Top 5 things this bot should handle:
- 3 things to escalate to humans:
- Fallback message when unsure:

## SAMPLE RESPONSES
- Welcome message:
- "What are your hours?" response:
- "I need to speak to a human" response:

## QUICK REPLIES
5 suggested quick reply buttons for the chat widget:`
      }]
    })
    return NextResponse.json({ config: response.content[0].type === "text" ? response.content[0].text : "" })
  } catch (error) {
    return NextResponse.json({ error: "Failed to generate config" }, { status: 500 })
  }
}