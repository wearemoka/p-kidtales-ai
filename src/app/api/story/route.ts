import { getStoryPayload, headerOpenAiRequest } from '@/app/utils/promptsGenerators'
import { NextResponse } from 'next/server'

// Some declarations
const URI_API = process.env.NEXT_PUBLIC_OPENAI_API_URL

export async function POST (request: Request) {
  const { ageRange, character, characterName, place, lesson } = await request.json()

  try {
    const prompt = getStoryPayload(character, characterName, place, ageRange, lesson, false)

    const res = await fetch(`${URI_API}/chat/completions`, {
      method: 'POST',
      body: JSON.stringify(prompt),
      headers: headerOpenAiRequest,
      cache: 'no-store'
    })

    if (res.status >= 500) {
      return NextResponse.json({ status: 'error', error: 'Open AI server error' })
    }

    const jsonData = await res.json()

    const finishReason = jsonData.choices[0].finish_reason
    if (finishReason !== 'stop') { // length, context_length_exceeded
      return NextResponse.json({ status: 'error', error: 'Response is not valid' })
    }

    return NextResponse.json({ res: jsonData.choices[0].message.content, prompt })
  } catch (err) {
    return NextResponse.json({ status: 'error', error: 'An internal server error', message: JSON.stringify(err) })
  }
}
