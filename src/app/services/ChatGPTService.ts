import { getStoryIllustrationPrompt, getStoryPrompt, headerOpenAiRequest } from '@/app/utils/promptsGenerators'

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
      headers: headerOpenAiRequest
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
 * @param adventure type of adventure, e.g. fable
 * @param place where the story take place, e.g. farm
 * @param paragraphs number of paragraphs expected
 * @returns promise
 */
export async function getAiStory (ageRange: string, character: string, adventure: string, characterName: string = '', place: string, lesson:string = '', paragraphs: number = 3) {
  const response = await fetch('/api/story', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ ageRange, character, adventure, characterName, place, lesson, paragraphs: 3 })
  })

  const jsonResponse = await response.json()
  return jsonResponse
}

/**
 * Requests a story to the AI using some parameter and
 * adds constraints to the story.
 * @param ageRange the age range, e.g. 5-7
 * @param character a character, e.g. dog
 * @param adventure type of adventure, e.g. fable
 * @param place where the story take place, e.g. farm
 * @param paragraphs number of paragraphs expected
 * @param callback a function to set the streamed response
 */
export async function getAiStoryWithStream (ageRange: string, character: string, adventure: string, characterName: string = '', place: string, lesson: string = '', callback: (result: string) => void, paragraphs: number = 3) {
  try {
    const prompt = getStoryPrompt(character, characterName, adventure, place, ageRange, lesson, paragraphs)

    const res = await fetch(`${URI_API}/chat/completions`, {
      method: 'POST',
      body: prompt,
      headers: headerOpenAiRequest,
      signal: new AbortController().signal
    })

    const stream = res?.body?.getReader()

    if (!stream) return

    let result = ''
    let jsonResult = null
    let done = false

    do {
      const { value } = await stream.read()

      const v = new TextDecoder().decode(value)
      const lastIndex = v.lastIndexOf('data: {')
      if (lastIndex >= 0) {
        const s = v.substring(lastIndex + 6)
        jsonResult = JSON.parse(s.replace('\n\ndata: [DONE]\n\n', ''))

        done = jsonResult.choices[0].finish_reason === 'stop'
        if (!done) {
          result += jsonResult.choices[0].delta.content
          callback(result)
        }
      }
    } while (!done)
  } catch (err) {
    console.error('catch', err)
  }
}

export async function getAiStoryWithStreamBE (ageRange: string, character: string, adventure: string, characterName: string = '', place: string, lesson: string = '', callback: (result: string) => void, paragraphs: number = 3, streamed:boolean = false) {
  const response = await fetch('/api/story/stream', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      ageRange,
      character,
      adventure,
      characterName,
      place,
      lesson,
      paragraphs,
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
