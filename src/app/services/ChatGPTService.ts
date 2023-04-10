
// Some declarations
const URI_API = 'https://api.openai.com/v1'
const API_KEY = process.env.NEXT_PUBLIC_OPENAI_API_KEY
const MODEL_COMPLETIONS = process.env.NEXT_PUBLIC_MODEL_COMPLETIONS || 'gpt-3.5-turbo'
const MODEL_IMAGE_GENERATION = process.env.NEXT_PUBLIC_MODEL_IMAGE_GENERATION || 'image-alpha-001'

const headerOpenAiRequest = {
  'Content-Type': 'application/json',
  Authorization: `Bearer ${API_KEY}`
}

/**
 * General prompt for the API Requests
 * Return a string
 */
const getPrompt = (character:string, characterName:string, adventure:string, place:string, ageRange:string, lesson:string, paragraphs:number) => {
  return `Generate a story about a ${character} whose name should be ${characterName} who embarks on a ${adventure} adventure in ${place}. The story should be appropriate for children ${ageRange} years old. Add a lesson of ${lesson}. The story should have ${paragraphs} paragraphs. Be creative and feel free to add any other details or plot twists that you think would make the story more interesting. Return the story title, content and lesson learnt from the story in 50 words as different parameters`
}

/**
 * Requests a img from the AI using the about parameter
 * @param about string, what the illustration is about
 * @returns promise
 */
export async function getAiIllustration (about: string) {
  try {
    const prompt = JSON.stringify({
      model: MODEL_IMAGE_GENERATION,
      prompt: `Give me an illustration for a 5 year olds of this story about ${about}`,
      n: 1,
      response_format: 'b64_json',
      size: '512x512'
    })

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
 * Requests a story to the AI using some parameter and
 * adds constraints to the story.
 * @param ageRange the age range, e.g. 5-7
 * @param character a character, e.g. dog
 * @param adventure type of adventure, e.g. fable
 * @param place where the story take place, e.g. farm
 * @param paragraphs number of paragraphs expected
 * @returns promise
 */
export async function getAiStory (ageRange: string, character: string, adventure: string, characterName: string = '', place: string, lesson:string = '', paragraphs: number = 3) {
  try {
    const prompt = JSON.stringify({
      model: MODEL_COMPLETIONS,
      messages: [
        {
          role: 'user',
          content: getPrompt(character, characterName, adventure, place, ageRange, lesson, paragraphs)
        }
      ]
    })

    const res = await fetch(`${URI_API}/chat/completions`, {
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
    const prompt = JSON.stringify({
      model: MODEL_COMPLETIONS,
      stream: true,
      messages: [
        {
          role: 'user',
          content: getPrompt(character, characterName, adventure, place, ageRange, lesson, paragraphs)
        }
      ]
    })

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
