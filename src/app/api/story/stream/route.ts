import { OpenAIStream } from '@/app/utils/openAIStream'
import { getStoryPayload } from '@/app/utils/promptsGenerators'
import { NextApiResponse } from 'next'

export const config = {
  runtime: 'edge'
}

export async function POST (req: Request, res: NextApiResponse): Promise<Response> {
  const { ageRange, character, characterName, place, lesson, streamed } = await req.json()

  const prompt = getStoryPayload(character, characterName, place, ageRange, lesson, streamed)

  const stream = await OpenAIStream(prompt)
  return new Response(stream)
}
