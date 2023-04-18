import { OpenAIStreamPayload } from '@/app/utils/openAIStream'

const API_KEY = process.env.NEXT_PUBLIC_OPENAI_API_KEY
const MODEL_COMPLETIONS = process.env.NEXT_PUBLIC_MODEL_COMPLETIONS || 'gpt-3.5-turbo'
const MODEL_IMAGE_GENERATION = process.env.NEXT_PUBLIC_MODEL_IMAGE_GENERATION || 'image-alpha-001'

export const headerOpenAiRequest = {
  'Content-Type': 'application/json',
  Authorization: `Bearer ${API_KEY}`
}

export const getStoryPrompt = (character: string, characterName: string, adventure: string, place: string, ageRange: string, lesson: string, paragraphs: number, promptExtended:string) => {
  return `Generate a story about a ${character} whose name is ${characterName} who embarks on a ${adventure} adventure in a ${place}. The story must be appropriate for children between ${ageRange} years old. The story must have ${paragraphs} paragraphs. Add a lesson of ${lesson} using 50 - 70 words in a new paragraph. Add a title in the beginning with this format Title: . ${promptExtended}`
}

export function getStoryPayload (character: string, characterName: string, adventure: string, place: string, ageRange: string, lesson: string, paragraphs: number = 3, streamed: boolean = false, promptExtended: string = '') {
  let payload: OpenAIStreamPayload = {
    model: MODEL_COMPLETIONS,
    stream: streamed,
    messages: [
      {
        role: 'user',
        content: getStoryPrompt(character, characterName, adventure, place, ageRange, lesson, paragraphs, promptExtended)
      }
    ]
  }

  if (streamed) {
    payload = {
      ...payload,
      temperature: 0.7,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
      max_tokens: 1000,
      n: 1,
      stream: streamed
    }
  }

  return payload
}

export function getStoryIllustrationPrompt (about:string) {
  const prompt = JSON.stringify({
    model: MODEL_IMAGE_GENERATION,
    prompt: `Give me an illustration for a 5 year olds of this story about ${about}`,
    n: 1,
    response_format: 'b64_json',
    size: '512x512'
  })

  return prompt
}
