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
    body: JSON.stringify({ ageRange, character, characterName, place, lesson })
  })

  const jsonResponse = await response.json()
  return jsonResponse
}

/**
 * Requests a story to the AI using some parameter and
 * adds constraints to the story.
 * @param ageRange the age range, e.g. 5-7
 * @param character a character, e.g. dog
 * @param characterName the name of character
 * @param place where the story take place, e.g. farm
 * @param lesson a lesson for the story, e.g. friendship
 * @param callback a function to set the streamed response
 * @param streamed use a stream on response
 */
export async function getAiStoryWithStreamBE (ageRange: string, character: string, characterName: string = '', place: string, lesson: string = '', callback: (result: string) => void, streamed:boolean = true) {
  const response = await fetch('/api/story/stream', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      ageRange,
      character,
      characterName,
      place,
      lesson,
      streamed
    })
  })

  let streamedResponse = ''

  const data = response.body

  if (!data) {
    return
  }

  const reader = data.getReader()
  const decoder = new TextDecoder()
  let done = false

  while (!done) {
    const { value, done: doneReading } = await reader.read()
    done = doneReading
    const chunkValue = decoder.decode(value)
    streamedResponse += chunkValue
    callback(streamedResponse)
  }
}
