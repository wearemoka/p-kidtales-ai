
// Some declarations

import { OpenAIStream, OpenAIStreamPayload } from '@/app/utils/openAIStream'

export const config = {
  runtime: 'edge'
}

export async function POST (req: Request): Promise<Response> {
//   const { prompt } = (await req.json()) as {
//         prompt?: string;
//     }

  //   if (!prompt) {
  //     return new Response('No prompt in the request', { status: 400 })
  //   }

  const prompt = 'contame una historia de un perro llamado Fox'

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
