import { OpenAIStream } from '@/app/utils/openAIStream'
import { getStoryPayload } from '@/app/utils/promptsGenerators'
import { NextApiResponse } from 'next'

export const config = {
  runtime: 'edge'
}

export async function POST (req: Request, res: NextApiResponse): Promise<Response> {
  const { ageRange, character, adventure, characterName, place, lesson, paragraphs, streamed } = await req.json()

  const prompt = getStoryPayload(character, characterName, adventure, place, ageRange, lesson, paragraphs, streamed)

  const stream = await OpenAIStream(prompt)
  return new Response(stream)
}
