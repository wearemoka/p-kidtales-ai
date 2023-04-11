import { OpenAIStream, OpenAIStreamPayload } from '@/app/utils/openAIStream'
import { getStoryPrompt } from '@/app/utils/promptsGenerators'
import { NextApiResponse } from 'next'

export const config = {
  runtime: 'edge'
}

export async function POST (req: Request, res: NextApiResponse): Promise<Response> {
  const { ageRange, character, adventure, characterName, place, lesson, paragraphs, streamed } = await req.json()

  const prompt = getStoryPrompt(character, characterName, adventure, place, ageRange, lesson, paragraphs, streamed)

  const payload: OpenAIStreamPayload = {
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.7,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    max_tokens: 1000,
    stream: true,
    n: 1
  }

  const stream = await OpenAIStream(payload)
  return new Response(stream)
}
