import { NextResponse } from 'next/server'

// Some declarations
const URI_API = 'https://api.openai.com/v1'
const API_KEY = process.env.NEXT_PUBLIC_OPENAI_API_KEY
const MODEL_COMPLETIONS = process.env.NEXT_PUBLIC_MODEL_COMPLETIONS || 'gpt-3.5-turbo'

const headerOpenAiRequest = {
  'Content-Type': 'application/json',
  Authorization: `Bearer ${API_KEY}`
}

export async function POST (request: Request) {
  const { about } = await request.json()

  try {
    const prompt = JSON.stringify({
      model: MODEL_COMPLETIONS,
      messages: [
        {
          role: 'user',
          content: `Tell me a story about ${about} for a 5 year old child`
        }
      ]
    })

    const res = await fetch(`${URI_API}/chat/completions`, {
      method: 'POST',
      body: prompt,
      headers: headerOpenAiRequest
    })

    const jsonData = await res.json()

    return NextResponse.json({ res: jsonData.choices[0].message.content })
  } catch (err) {
    return NextResponse.json({ error: 'An internal server error' })
  }
}
