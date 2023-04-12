import { getStoryPayload, headerOpenAiRequest } from '@/app/utils/promptsGenerators'
import { NextResponse } from 'next/server'

// Some declarations
const URI_API = process.env.NEXT_PUBLIC_OPENAI_API_URL

export async function POST (request: Request) {
  const { ageRange, character, adventure, characterName, place, lesson, paragraphs } = await request.json()

  try {
    const prompt = getStoryPayload(character, characterName, adventure, place, ageRange, lesson, paragraphs)

    const res = await fetch(`${URI_API}/chat/completions`, {
      method: 'POST',
      body: JSON.stringify(prompt),
      headers: headerOpenAiRequest
    })
    const jsonData = await res.json()

    return NextResponse.json({ res: jsonData.choices[0].message.content })
  } catch (err) {
    return NextResponse.json({ status: 'error', error: 'An internal server error' })
  }
}
