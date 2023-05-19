import { OpenAIStreamPayload } from '@/app/utils/openAIStream'
import { ages } from '@/app/services/constants/StoryParams'

const API_KEY = process.env.NEXT_PUBLIC_OPENAI_API_KEY
const MODEL_COMPLETIONS = process.env.NEXT_PUBLIC_MODEL_COMPLETIONS || 'gpt-3.5-turbo'
const MODEL_IMAGE_GENERATION = process.env.NEXT_PUBLIC_MODEL_IMAGE_GENERATION || 'image-alpha-001'

const OPENAI_TEMPERATURE = process.env.OPENAI_TEMPERATURE ? parseFloat(process.env.OPENAI_TEMPERATURE) : 0.5
const OPENAI_TOP_P = process.env.OPENAI_TOP_P ? parseInt(process.env.OPENAI_TOP_P) : 1
const OPENAI_FREQUENCY_PENALTY = process.env.OPENAI_FREQUENCY_PENALTY ? parseInt(process.env.OPENAI_FREQUENCY_PENALTY) : 0
const OPENAI_PRESENCE_PENALTY = process.env.OPENAI_PRESENCE_PENALTY ? parseInt(process.env.OPENAI_PRESENCE_PENALTY) : 0
const OPENAI_MAX_TOKENS = process.env.OPENAI_MAX_TOKENS ? parseInt(process.env.OPENAI_MAX_TOKENS) : 100
const OPENAI_N = process.env.OPENAI_N ? parseInt(process.env.OPENAI_N) : 1

const PROMPT_TEMPLATE_UNDER_2 = process.env.PROMPT_TEMPLATE_UNDER_2 || ''
const PROMPT_TEMPLATE_BETWEEN_2_5 = process.env.PROMPT_TEMPLATE_BETWEEN_2_5 || ''
const PROMPT_TEMPLATE_BETWEEN_6_9 = process.env.PROMPT_TEMPLATE_BETWEEN_6_9 || ''

export const headerOpenAiRequest = {
  'Content-Type': 'application/json',
  Authorization: `Bearer ${API_KEY}`
}

export const getStoryPrompt = (character: string, characterName: string, place: string, ageRange: string, lesson: string) => {
  let templateStory = ''

  switch (ageRange) {
    case ages[0]:
      templateStory = PROMPT_TEMPLATE_UNDER_2
      break
    case ages[1]:
      templateStory = PROMPT_TEMPLATE_BETWEEN_2_5
      break
    case ages[2]:
      templateStory = PROMPT_TEMPLATE_BETWEEN_6_9
      break
  }

  templateStory = templateStory
    .replace('{CHARACTER}', character)
    .replace('{CHARACTERNAME}', characterName)
    .replace('{PLACE}', place)
    .replace('{LESSON}', lesson)

  return templateStory
}

export function getStoryPayload (character: string, characterName: string, place: string, ageRange: string, lesson: string, streamed: boolean = false) {
  let payload: OpenAIStreamPayload = {
    model: MODEL_COMPLETIONS,
    stream: streamed,
    messages: [
      {
        role: 'user',
        content: getStoryPrompt(character, characterName, place, ageRange, lesson)
      }
    ],
    temperature: OPENAI_TEMPERATURE,
    top_p: OPENAI_TOP_P,
    frequency_penalty: OPENAI_FREQUENCY_PENALTY,
    presence_penalty: OPENAI_PRESENCE_PENALTY,
    max_tokens: OPENAI_MAX_TOKENS,
    n: OPENAI_N
  }

  if (streamed) {
    payload = {
      ...payload,
      stream: streamed
    }
  }

  return payload
}

export function getStoryIllustrationPrompt (about:string) {
  const prompt = JSON.stringify({
    model: MODEL_IMAGE_GENERATION,
    prompt: `Give me an illustration for a 5 year olds of this story about ${about}`,
    n: OPENAI_N,
    response_format: 'b64_json',
    size: '512x512'
  })

  return prompt
}
