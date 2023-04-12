import { headerOpenAiRequest } from '@/app/utils/promptsGenerators'
import { createParser, ParsedEvent, ReconnectInterval } from 'eventsource-parser'

export type ChatGPTAgent = 'user' | 'system';
const URI_API = process.env.NEXT_PUBLIC_OPENAI_API_URL

export interface ChatGPTMessage {
    role: ChatGPTAgent;
    content: string;
}

export interface OpenAIStreamPayload {
    model: string;
    messages: ChatGPTMessage[];
    temperature?: number;
    top_p?: number;
    frequency_penalty?: number;
    presence_penalty?: number;
    max_tokens?: number;
    stream?: boolean;
    n?: number;
}

export async function OpenAIStream (payload: OpenAIStreamPayload) {
  const encoder = new TextEncoder()
  const decoder = new TextDecoder()

  const res = await fetch(`${URI_API}/chat/completions`, {
    headers: headerOpenAiRequest,
    method: 'POST',
    body: JSON.stringify(payload)
  })

  const stream = new ReadableStream({
    async start (controller) {
      // callback
      function onParse (event: ParsedEvent | ReconnectInterval) {
        if (event.type === 'event') {
          const data = event.data

          if (data === '[DONE]') {
            controller.close()
            return
          }
          try {
            const json = JSON.parse(data)
            const text = json.choices[0].delta?.content || ''
            const queue = encoder.encode(text)
            controller.enqueue(queue)
          } catch (e) {
            // maybe parse error
            controller.error(e)
          }
        }
      }

      const parser = createParser(onParse)

      for await (const chunk of res.body as any) {
        parser.feed(decoder.decode(chunk))
      }
    }
  })

  return stream
}
