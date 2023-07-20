import { getStoryIllustrationPrompt, headerOpenAiRequest } from '@/app/utils/promptsGenerators'

// Some declarations
const URI_API = process.env.NEXT_PUBLIC_OPENAI_API_URL

/**
 * Requests a img from the AI using the about parameter
 * @param about string, what the illustration is about
 * @returns promise
 */
export async function getAiIllustration (about: string) {
  try {
    const prompt = getStoryIllustrationPrompt(about)

    const res = await fetch(`${URI_API}/images/generations`, {
      method: 'POST',
      body: prompt,
      headers: headerOpenAiRequest,
      cache: 'no-store'
    })

    const data = res.json()
    return data
  } catch (err) {
    console.error('catch', err)
  }
}

/**
 * Requests a story to the AI using internal API
 * @param ageRange the age range, e.g. 5-7
 * @param character a character, e.g. dog
 * @param characterName the name of character
 * @param place where the story take place, e.g. farm
 * @param lesson a lesson for the story, e.g. friendship
 * @returns promise
 */
export async function getAiStory (ageRange: string, character: string, characterName: string = '', place: string, lesson: string = '') {
  const response = await fetch('/api/story', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    cache: 'no-store',
    body: JSON.stringify({ ageRange, character, characterName, place, lesson })
  })

  const jsonResponse = await response.json()
  return jsonResponse
}

/**
 * This function requests a IA to moderate a string
 * @param value string to moderate
 */
export async function moderateStringWithAI (value: string) {
  const response = await fetch('/api/moderate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    cache: 'no-store',
    body: JSON.stringify({ value })
  })
  const jsonResponse = await response.json()
  return jsonResponse
}
