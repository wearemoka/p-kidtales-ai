import { headerOpenAiRequest } from '@/app/utils/promptsGenerators'
import { NextResponse } from 'next/server'

// Some declarations
const URI_API = process.env.NEXT_PUBLIC_OPENAI_API_URL

export async function POST (request: Request) {
  const { value } = await request.json()

  const res = await fetch(`${URI_API}/moderations`, {
    method: 'POST',
    body: JSON.stringify({ input: value }),
    headers: headerOpenAiRequest
  })
  const jsonData = await res.json()
  return NextResponse.json(jsonData)
}
